import React, { useEffect, useState } from 'react';
import { Offcanvas, Form } from 'react-bootstrap';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import signInWithPopup from firebase/auth
import { FcGoogle } from 'react-icons/fc';
import "../../styles/LoginCanva.css";
import toast from "react-hot-toast";
import { STORAGE } from '../../config/config';
import axios from 'axios';
import { API_URL } from '../../Constant/constApi';
import { useSearchParams } from 'react-router-dom';


const LoginOffcanvas = ({ show, handleClose, setUser }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCanvas, setOtpCanvas] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(59);
  const [success, setSuccess] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const referralCode = searchParams.get("code");
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      // Initiating Google Sign-In
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const userData = {
          device_id: localStorage.getItem("deviceId"),
          user_email: user.email,
          user_name: user.displayName,
          type: STORAGE?.GOOGLE,
          is_admin: "0",
          user_type: STORAGE?.B2C,
        };

        // Sending data to your API
        const response = await axios.post(`${API_URL}sendotp`, userData);
        const data = response.data;

        if (data && data.STATUS === 200) {
          toast.success(data.MESSAGE);
          console.log("Google login success", data);
          console.log("userData", data);
          setUser(true);
          setSuccess(true);
          handleClose(true);
          localStorage.setItem(STORAGE?.ISLOGIN, 1);
          localStorage.setItem(
            STORAGE?.USERDETAIL,
            JSON.stringify(data.DATA)
          );
        } else {
          console.error("Unexpected response from /sendotp:", data);
        }
      }
    } catch (error) {
      if (error.response) {
        // Errors from the API
        console.error("Error response from API: ", error.response.data);
      } else if (error.request) {
        // No response received
        console.error("No response from API: ", error.request);
      } else {
        // Other errors
        console.error("Error during sign-in with Google: ", error.message);
      }

      toast.error("An error occurred during login. Please try again.");
    }
  };


  const [touched, setTouched] = useState({
    mobileNumber: false,
    password: false
  });

  const validateInput = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const sendOtp = async (payload) => {
    const loadingId = toast.success("Sending OTP...");
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    try {
      const { data } = await axios.post(`${API_URL}userlogin`, {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        user_mobile: mobileNumber,
        is_mobile: '0',
        ...payload,
        type: STORAGE?.MOBILE,
        is_admin: "0",
        user_type: STORAGE?.B2C,
      });

      if (data && data?.STATUS === 200) {
        console.log("Login Otp is", data?.OTP);
        toast.success(data?.MESSAGE || "OTP send.");
        setMobileNumber(mobileNumber);
        // setOtp(data?.OTP)
        setOtpCanvas(true);
        setError('');
        setResendTimer(59);
        setIsCounting(true);
        setIsOtpExpired(false);
      } else {
        setError(data.MESSAGE || 'Failed to send OTP. Please try again.');
        console.error("otp send Error ::", error);

      }

      if (data && data?.STATUS === 400) {
        toast.error(data?.MESSAGE || "OTP send.");
        console.log("Erorr got :: 400");
      }
    } catch (err) {
      setError('An error occurred while sending OTP.');
      console.error(err);
    } finally {
      toast.dismiss(loadingId);
    }
  };

  const handleProceed = (e) => {
    e.preventDefault();
    setTouched({ mobileNumber: true });
    if (!mobileNumber) {
      setError('Please enter your mobile number.');
      return;
    }
    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    // send otp
    sendOtp();
    handleClose(true)
  };


  const handleVerifyOtp = async () => {
    if (isOtpExpired) {
      toast.error("OTP has expired. Please request a new OTP.");
      return;
    }

    const loadingId = toast.loading("Verifying OTP...");
    try {
      const enteredOtp = otp.join('');
      const { data } = await axios.post(`${API_URL}loginotpvarify`, {
        // const { data } = await axios.post(`${API_URL}verifyotp`, {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        otp: enteredOtp,
        is_mobile: "0",
        user_mobile: mobileNumber,
        user_otp: enteredOtp,
        code: referralCode || "",
      });

      if (data && data.STATUS === 200) {
        toast.success(data?.MESSAGE || "OTP verified.");
        // Store login details
        localStorage.setItem(STORAGE?.ISLOGIN, 1);
        localStorage.setItem(STORAGE?.USERDETAIL, JSON.stringify(data?.DATA));
        localStorage.setItem("loginTimestamp", Date.now());
        console.log("OTp Login", data);


        // Update the user state
        setUser(true);

        // Clear OTP canvas and inputs
        setOtpCanvas(false);
        setOtp(['', '', '', '', '', '']);
        setSuccess(true);

        // Close the canvas
        handleClose();
      } else {
        setError(data.MESSAGE || "OTP verification failed.");
      }
    } catch (err) {
      setError("An error occurred during OTP verification.");
      console.error(err);
    } finally {
      toast.dismiss(loadingId);
    }
  };


  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus the next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    } else if (!value && index > 0) {
      // Move back on backspace
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };


  // Function to clear all inputs and states
  const clearAll = () => {
    setMobileNumber('');
    setOtpCanvas(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    setResendTimer(30);
    setTouched({ mobileNumber: false, password: false });
    setSuccess(false);
  };

  const handleOffcanvasClose = () => {
    clearAll();
    handleClose();
  };
  const clearOtp = () => {
    setOtp(['', '', '', '', '', '']);
  };


  const maskMobileNumber = (number) => {
    if (number.length >= 4) {
      const firstTwo = number.slice(0, 2); // First 2 digits
      const lastTwo = number.slice(-2);  // Last 2 digits
      const maskedSection = 'X'.repeat(number.length - 4); // Mask middle digits
      return `${firstTwo}${maskedSection}${lastTwo}`;
    }
    return number; // Return as-is if length is less than 4
  };

  // Handle input focus loss (blur)
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const resendOtp = () => {
    sendOtp({
      user_mobile: mobileNumber,
    });
  };

  // Timer logic in useEffect
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [resendTimer]);


  return (
    <>
      {/* Login Offcanvas */}
      <Offcanvas show={show} onHide={handleOffcanvasClose} placement="end" style={{ maxWidth: '450px' }}>
        <Offcanvas.Header closeButton className="custom-header web-bg-color">
          <Offcanvas.Title className="text-start">Login</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center">
            <img
              src={require("../../assets/images/header-logo.png")}
              alt="Logo"
              style={{ maxWidth: '200px' }}
              loading="lazy"
              className="login-logo"
            />
            <h3 className="signin-heading">Login</h3>
            <p className="signin-description font-color-global">
              Enter your email ID or phone
              <br />
              number to sign in
            </p>
            {/* Mobile Number Enter */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                onBlur={() => handleBlur('mobileNumber')}
                className={`form-input ${touched.mobileNumber && !validateInput(mobileNumber) ? 'is-invalid' : ''}`}
                required
              />
              {touched.mobileNumber && !mobileNumber && (
                <div className="invalid-feedback">Mobile Number is required.</div>
              )}
              {touched.mobileNumber && mobileNumber && !validateInput(mobileNumber) && (
                <div className="invalid-feedback">Please enter a valid 10-digit phone number.</div>
              )}
            </Form.Group>

            <button type="button" className="btn-continue w-100" onClick={handleProceed}>
              Proceed
            </button>
            {/* Horizontal line with text */}
            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-muted">Or sign in with</span>
              <hr className="flex-grow-1" />
            </div>
            {/* Social login buttons */}
            <div className="social-login-container">
              {/* Google Button */}
              <div className="icon-bg" onClick={handleGoogleLogin}>
                <FcGoogle className="fs-3" />
              </div>
              {/* Facebook Button */}
              <div className="icon-bg">
                <img
                  src={require("../../assets/images/facebook.png")}
                  alt="Facebook"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-sm sm:text-lg fw-medium !leading-none mb-4 font-color-global py-lg-3 py-xl-3 py-xxl-3">
              Don’t have an account?
              <span className="btn-link p-0 text-decoration-none text-dark ms-2">
                Sign Up
              </span>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* OTP Verification Offcanvas */}
      <Offcanvas show={otpCanvas} onHide={() => setOtpCanvas(false)} placement="end" style={{ maxWidth: '450px' }}>
        <Offcanvas.Header closeButton className="custom-header web-bg-color">
          <Offcanvas.Title className="text-start">OTP Verification </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center">
            <img
              src={require("../../assets/images/header-logo.png")}
              alt="Logo"
              style={{ maxWidth: '200px' }}
              loading="lazy"
              className="login-logo"
            />
            <h3 className="signin-heading">Verify with OTP</h3>
            <p className="signin-description font-color-global">
              Enter the OTP sent to your
              <br />
              phone number
            </p>
            <p>OTP sent to {maskMobileNumber(mobileNumber)}
              <button
                className="btn-link text-danger resend-btn px-2"
                onClick={() => {
                  setOtpCanvas(false);
                  setMobileNumber('');
                  clearOtp();
                  setError('');
                }}
              >
                Change
              </button></p>
            {/* OTP Input */}
            <div className="otp-input-container mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="otp-input-box web-bg-color"
                />
              ))}
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="button" className="btn-continue w-100" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
            <div className="mt-3 ">
              <span className='font-color-global' style={{ fontSize: "13px" }}>
                Didn’t receive an SMS?
              </span>
              <button
                className="btn-link p-0 text-decoration-none resend-btn ps-1 text-dark"
                disabled={resendTimer > 0}
                onClick={resendOtp}
              >

                <span className="fw-medium text-[#666464] underline">
                  {isOtpExpired ? "Resend OTP" : "Resend OTP"}
                </span>
                <span className="fw-medium">
                  {resendTimer > 0 && ` in ${resendTimer}s`}
                </span>
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default LoginOffcanvas;
