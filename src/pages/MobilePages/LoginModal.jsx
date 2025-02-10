import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import "../../styles/LoginCanva.css";
import toast from "react-hot-toast";
import { auth } from '../../components/firebase';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, sendOtp, verifyOtp } from '../../redux/auth/authThunk';
import { STORAGE } from '../../config/config';
import { fetchCartItems } from '../../redux/cart/cartThunk';
import { fetchWishlistItem } from '../../redux/wishlist/wishlistThunk';

const LoginModal = ({ show, handleClose, setIsLoggedIn }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    // const [otpCanvas, setOtpCanvas] = useState(false);
    const [otpModal, setOtpModal] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(59);
    const [isCounting, setIsCounting] = useState(false);
    const [isOtpExpired, setIsOtpExpired] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    const { user, loading, otpSent, otpVerified } = useSelector((state) => state.auth);

    const referralCode = searchParams.get("code");

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account",
        });
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (user) {
                setIsLoggedIn(true);
                handleClose(true);
                const userData = {
                    device_id: localStorage.getItem("deviceId"),
                    user_email: user.email,
                    user_name: user.displayName,
                    type: STORAGE?.GOOGLE,
                    is_admin: "0",
                    user_type: STORAGE?.B2C,
                };

                const googleloginSuccessfully = await dispatch(googleLogin(userData));

                // If OTP was sent successfully, update state and close the canvas
                if (googleloginSuccessfully) {
                    setIsLoggedIn(true);
                    handleClose(true);
                }
            }
        } catch (error) {
            toast.error("An error occurred during login. Please try again.");
        }
    };

    const handleProceed = async (e) => {
        e.preventDefault();
        setTouched({ mobileNumber: true });
        setError("");
        // Validate mobile number
        if (!mobileNumber) {
            setError('Please enter your mobile number.');
            return;
        }
        if (!/^[0-9]{10}$/.test(mobileNumber)) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }
        // Send OTP
        const { success, error } = await dispatch(sendOtp(mobileNumber));
        // If OTP was sent successfully, update state and close the canvas
        if (success) {
            setResendTimer(29);
            setIsCounting(true);
            setIsOtpExpired(false);
            setOtpModal(true); // Open OTP canvas
            handleClose(true); // Close login canvas
        } else {
            setError(error); // Set the error message in the state
        }
    };

    const handleVerifyOtp = async () => {
        if (isOtpExpired) {
            toast.error("OTP has expired. Please request a new OTP.");
            return;
        }

        const enteredOtp = otp.join('');
        // Send OTP
        const { success, error } = await dispatch(verifyOtp(enteredOtp, mobileNumber, referralCode));

        // If OTP was sent successfully, update state and close the canvas
        if (success) {
            clearAll();
            setIsLoggedIn(true);
            setOtpModal(false);
            setOtp(['', '', '', '', '', '']);
            handleClose();
            setMobileNumber("");
            dispatch(fetchCartItems());
            dispatch(fetchWishlistItem());
        } else {
            setError(error); // Set the error message in the state
        }
    };

    const [touched, setTouched] = useState({
        mobileNumber: false,
        password: false
    });

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const validateInput = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        return emailRegex.test(input) || phoneRegex.test(input);
    };

    // Function to clear all inputs and states
    const clearAll = () => {
        setMobileNumber('');
        setOtpModal(false);
        setOtp(['', '', '', '', '', '']);
        setError('');
        setResendTimer(30);
        setTouched({ mobileNumber: false, password: false });
    };

    const handleOffcanvasClose = () => {
        clearAll();
        handleClose();
    };

    const handleVerifyOffcanvasClose = () => {
        setOtpModal(false); // Close OTP canvas
        setMobileNumber(''); // Clear mobile number
        clearOtp(); // Clear OTP
        setError(''); // Clear error
        handleClose(false); // Ensure login canvas remains open
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

    const resendOtp = () => {
        sendOtp({
            user_mobile: mobileNumber,
        });
    };

    const handleOtpPaste = (e) => {
        e.preventDefault(); // Prevent the default paste action
        const pastedData = e.clipboardData.getData("text").trim(); // Get the pasted text

        if (pastedData.length === otp.length) {
            // Distribute the pasted string into the OTP state
            const otpArray = pastedData.split("").slice(0, otp.length);
            setOtp(otpArray); // Update the OTP state
        }
    };

    // Inside the LoginOffcanvas component
    useEffect(() => {
        let interval;
        if (isCounting && resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else if (resendTimer === 0) {
            setIsCounting(false);
            setIsOtpExpired(true);
        }
        return () => clearInterval(interval); // Cleanup on unmount
    }, [isCounting, resendTimer]);

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
                        {error && <div className="text-danger mt-2">{error}</div>}
                        <button type="button" className="btn-continue w-100" onClick={handleProceed}>
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
                <div className=" d-flex justify-content-center text-sm sm:text-lg fw-medium !leading-none mb-4 font-color-global py-lg-3 py-xl-3 py-xxl-3 fs-5 py-3">
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
                        <p>OTP sent to {maskMobileNumber(mobileNumber)}
                            <button
                                className="btn-link text-danger resend-btn px-2"
                                onClick={() => {
                                    setOtpModal(false); // Close OTP canvas
                                    setMobileNumber(''); // Clear mobile number
                                    clearOtp(); // Clear OTP
                                    setError(''); // Clear error
                                    handleClose(false); // Ensure login canvas remains open
                                }}
                            >
                                Change
                            </button>
                        </p>
                        <div className="otp-input-container mb-4 gap-3 ">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onPaste={(e) => handleOtpPaste(e)}
                                    className="otp-input-box web-bg-color"
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
                                disabled={resendTimer > 0} // Disable button when timer is active
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
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoginModal;
