import React, { useEffect, useState } from 'react';
import { Offcanvas, Form, Alert } from 'react-bootstrap';
import { auth, googleProvider } from '../firebase'; // Importing auth and provider
import { signInWithPopup } from 'firebase/auth'; // Import signInWithPopup from firebase/auth
import { FcGoogle } from 'react-icons/fc';
import "../../styles/LoginCanva.css";
import toast from "react-hot-toast";

const LoginOffCanvas = ({ show, handleClose, setUser }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpcanvas, setOtpcanvas] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [success, setSuccess] = useState(false);


  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(true);
      setSuccess(true);
      toast.success("Google Login success");
      console.log('User logged in:', result.user);
      handleClose(true);
    } catch (error) {
      console.error("Error logging in with Google: ", error.message);
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

  const handleProceed = (e) => {
    e.preventDefault();
    if (validateInput(mobileNumber)) {
      setOtpcanvas(true);
      startResendTimer();
      setMobileNumber("")
      // handleClose();
      setError('');
    } else {
      setError('Please enter a valid email ID or 10-digit mobile number.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp && otp.length === 6 && otp.join('') === '123456') {
      const userData = {
        phoneNumber: mobileNumber,
      };
      setUser(userData); // Notify parent about the logged-in user
      setSuccess(true);
      toast.success("OTP Verified Successfully!");
      setOtpcanvas(false);
      setOtp(['', '', '', '', '', '']);
      handleClose();
      setMobileNumber('');
    } else {
      setError('Invalid OTP. Please try again.');
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


  const clearOtp = () => {
    setOtp(['', '', '', '', '', '']);
  };

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);
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
      <Offcanvas show={show} onHide={handleClose} placement="end" style={{ maxWidth: '450px' }}>
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
              <p>number to sign in</p>
            </p>
            {/* Mobile Number Enter */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your phone or email ID"
                maxLength=""
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                // className="form-input"
                onBlur={() => handleBlur('mobileNumber')}
                className={`form-input ${touched.mobileNumber && !validateInput(mobileNumber) ? 'is-invalid' : ''}`}
              />
              {touched.mobileNumber && !validateInput(mobileNumber) && (
                <div className="invalid-feedback">Please enter a valid email ID or phone number.</div>
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
            <div className="text-sm sm:text-lg font-medium !leading-none mb-4 font-color-global py-lg-3 py-xl-3 py-xxl-3">
              Don’t have an account?
              <span className="btn-link p-0 text-decoration-none text-dark ms-2">
                Sign Up
              </span>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* OTP Verification Offcanvas */}
      <Offcanvas show={otpcanvas} onHide={() => setOtpcanvas(false)} placement="end" style={{ maxWidth: '450px' }}>
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
              <p>phone number</p>
            </p>
            <p>OTP sent to {maskMobileNumber(mobileNumber)} <button
              className="btn-link text-danger resend-btn"
              onClick={() => {
                setOtpcanvas(false);
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
                onClick={startResendTimer}
              >
                Resend OTP{resendTimer > 0 ? ` in ${resendTimer}s` : ''}
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default LoginOffCanvas;
