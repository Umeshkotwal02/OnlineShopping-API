import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import "../../styles/LoginCanva.css";
import toast from "react-hot-toast";
import { auth, googleProvider } from '../../components/firebase';

const LoginModal = ({ show, handleClose, setUser }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otpModal, setOtpModal] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(30);
    const [success, setSuccess] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(true); // Notify parent about the logged-in user
            toast.success("Google Login success");
            console.log('User logged in:', result.user);
            handleClose();
        } catch (error) {
            console.error("Error logging in with Google: ", error.message);
        }
    };

    const validateInput = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        return emailRegex.test(input) || phoneRegex.test(input);
    };

    const handleProceed = () => {
        if (validateInput(mobileNumber)) {
            setOtpModal(true);
            startResendTimer();
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
            setOtpModal(false);
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

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        } else if (!value && index > 0) {
            const prevInput = document.getElementById(`otp-input-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
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

    const clearOtp = () => {
        setOtp(['', '', '', '', '', '']);
    };

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
        return () => clearInterval(interval);
    }, [resendTimer]);

    return (
        <>
            {/* Login Modal */}
            <Modal show={show} onHide={handleClose} fullscreen="sm-down" style={{ borderRadius: "0px" }}>
                <Modal.Header closeButton className="modal-custom-header gap-2 web-bg-color">
                    <Modal.Title className="text-start">Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img
                            src={require("../../assets/images/header-logo.png")}
                            alt="Logo"
                            style={{ maxWidth: '75%' }}
                            loading="lazy"
                            className="login-logo"
                        />
                        <h1 className="fw-bolder display-3">Login</h1>
                        <p className="signin-description font-color-global fs-2 pt-5">
                            Enter your email ID or phone number to sign in
                        </p>
                        <Form.Group className="login-modal-form">
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone or email ID"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="form-input"
                            />
                            {error && <p className="text-danger mt-2">{error}</p>}
                        </Form.Group>
                        <button type="button" className="btn-continue w-100 py-3" onClick={handleProceed}>
                            Proceed
                        </button>
                    </div>

                    {/* Horizontal line with text */}
                    <div className="d-flex align-items-center my-3">
                        <hr className="flex-grow-1" />
                        <span className="mx-2 text-muted fs-5">Or sign in with</span>
                        <hr className="flex-grow-1" />
                    </div>
                    {/* Social login buttons */}
                    <div className="social-login-container modal-social-media">
                        {/* Google Button */}
                        <div className="icon-bg" onClick={handleGoogleLogin}>
                            <FcGoogle className="google-icon" />
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
                </Modal.Body>
                <div className=" d-flex justify-content-center text-sm sm:text-lg font-medium !leading-none mb-4 font-color-global py-lg-3 py-xl-3 py-xxl-3 fs-5 py-3">
                    Don’t have an account?
                    <span className="btn-link p-0 text-decoration-none text-dark ms-2">
                        Sign Up
                    </span>
                </div>
            </Modal>

            {/* OTP Verification Modal */}
            <Modal show={otpModal} onHide={() => setOtpModal(false)} fullscreen="sm-down">
                <Modal.Header closeButton className="modal-custom-header web-bg-color">
                    <Modal.Title className="text-start">OTP Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img
                            src={require("../../assets/images/header-logo.png")}
                            alt="Logo"
                            style={{ maxWidth: '75%' }}
                            loading="lazy"
                            className="login-logo"
                        />
                        <h1 className="fw-bolder display-4">Verify with OTP</h1>
                        <p className="signin-description font-color-global fs-1 pt-5">
                            Enter the OTP sent to your phone number
                        </p>
                        <p className='fs-5'>OTP sent to {maskMobileNumber(mobileNumber)} <button
                            className="btn-link text-danger resend-btn"
                            onClick={() => {
                                setOtpModal(false);
                                setMobileNumber('');
                                clearOtp();
                                setError('');
                            }}
                        >
                            Change
                        </button></p>
                        <div className="otp-input-container mb-4 gap-3 ">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    className="otp-input-box web-bg-color px-4 rounded rounded-3"
                                />
                            ))}
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button type="button" className="btn-continue w-100 mt-4" onClick={handleVerifyOtp}>
                            Verify OTP
                        </button>

                        <div className="mt-3 ">
                            <span className='font-color-global fs-5'>
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
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoginModal;
