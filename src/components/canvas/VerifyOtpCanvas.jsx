import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap';

const VerifyOtpCanvas = ({ show, handleClose, setUser }) => {
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


    const handleVerifyOtp = async (data) => {
        if (isOtpExpired) {
            toast.error("OTP has expired. Please request a new OTP.");
            return;
        }

        const loadingId = toast.loading("Verifying OTP...");
        try {
            const enteredOtp = otp.join('');
            const { data } = await axios.post(`${API_URL}verifyotp`, {
                device_id: localStorage.getItem(STORAGE?.DEVICEID),
                otp: enteredOtp,
                is_mobile: "0",
                user_mobile: mobileNumber,
                user_otp: enteredOtp,
                code: referralCode || "",
            });
            console.log("login from b2c", data.DATA);
            if (data && data.STATUS === 200) {
                console.log("OTP Verifyed");
                toast.success(data?.MESSAGE || "OTP verified.");
                localStorage.setItem(STORAGE?.ISLOGIN, 1);
                localStorage.setItem(STORAGE?.USERDETAIL, JSON.stringify(data?.DATA));
                localStorage.setItem("loginTimestamp", Date.now());
                window.location.reload();
                setSuccess(true);
                toast.success('OTP Verified Successfully!');
                setOtpCanvas(false);
                handleClose(true);
                setOtp(['', '', '', '', '', '']);
                setUser(true);
                handleClose();
            } else {
                console.error(error);
                setError(data.data.message);
            }
        } catch (err) {
            setError(data.message);
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
            <Offcanvas show={show} onHide={() => handleOffcanvasClose} placement="end" style={{ maxWidth: '450px' }}>
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

                                <span className="font-medium text-[#666464] underline">
                                    {isOtpExpired ? "Resend OTP" : "Resend OTP"}
                                </span>
                                <span className="font-medium">
                                    {resendTimer > 0 && ` in ${resendTimer}s`}
                                </span>
                            </button>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
export default VerifyOtpCanvas;