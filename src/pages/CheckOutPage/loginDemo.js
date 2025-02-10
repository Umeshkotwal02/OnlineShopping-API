import React, { useEffect, useState } from 'react';
import { Offcanvas, Form } from 'react-bootstrap';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import "../../styles/LoginCanva.css";
import toast from "react-hot-toast";
import { STORAGE } from '../../config/config';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp, googleLogin, clearError, resetOtpState } from '../../redux/auth/authThunk';

const LoginOffcanvas = ({ show, handleClose, setUser }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCanvas, setOtpCanvas] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(59);
  const [isCounting, setIsCounting] = useState(false);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const referralCode = searchParams.get("code");
  const dispatch = useDispatch();
  const { loading, error, otpSent, otpVerified } = useSelector((state) => state.auth);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        dispatch(googleLogin(user));
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
    }
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (!mobileNumber || !/^[0-9]{10}$/.test(mobileNumber)) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }
    dispatch(sendOtp(mobileNumber));
  };

  const handleVerifyOtp = async () => {
    if (isOtpExpired) {
      toast.error("OTP has expired. Please request a new OTP.");
      return;
    }
    const enteredOtp = otp.join('');
    dispatch(verifyOtp({ otp: enteredOtp, mobileNumber, referralCode }));
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
    if (/^\d*$/.test(value)) { // Allow only digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input box
      if (value !== "" && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  useEffect(() => {
    if (otpSent) {
      setOtpCanvas(true);
      setResendTimer(59);
      setIsCounting(true);
      setIsOtpExpired(false);
    }
  }, [otpSent]);

  useEffect(() => {
    if (otpVerified) {
      setUser(true);
      setOtpCanvas(false);
      setOtp(['', '', '', '', '', '']);
      handleClose();
    }
  }, [otpVerified]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  return (
    <>
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
              <br />
              number to sign in
            </p>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </Form.Group>
            <button type="button" className="btn-continue w-100" onClick={handleProceed}>
              Proceed
            </button>
            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-muted">Or sign in with</span>
              <hr className="flex-grow-1" />
            </div>
            <div className="social-login-container">
              <div className="icon-bg" onClick={handleGoogleLogin}>
                <FcGoogle className="fs-3" />
              </div>
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
            <p>OTP sent to {mobileNumber}</p>
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
                onClick={() => dispatch(sendOtp(mobileNumber))}
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