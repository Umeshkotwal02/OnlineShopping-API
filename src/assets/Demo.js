import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  AccountIcon,
  CartIcon,
  CashOnDelIcon,
  CouponIcon,
  ExchangeIcon,
  ShippingIcon,
  StitchingIcon,
  WishlistIcon,
  ReturnIcon,
  ProfileIcon,
  NotificationIcon,
  MyOrderIcon,
  LogoutIcon,
} from "../assets/SvgIcons";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import {
  Box,
  Drawer,
  Popover,
  Step,
  StepLabel,
  Stepper,
  Typography,
  emphasize,
} from "@mui/material";
import { InputBase, Button } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { IoIosClose, IoMdContact } from "react-icons/io";
import { FaAngleRight, FaArrowRightLong, FaAngleLeft } from "react-icons/fa6";
import BagCard from "./bag/BagCard";
import { IoMenu } from "react-icons/io5";
import { MdClose, MdDelete, MdOutlineClose } from "react-icons/md";
import Modal from "@mui/material/Modal";
import {
  Link,
  json,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Notification from "./Notification";
import OTPInput from "./OtpVerification";
import MegaMenuButton from "./HeaderComponents/MegaMenuButton";
import MegaMenuContent from "./HeaderComponents/MegaMenuContent";
import axios from "axios";
import toast from "react-hot-toast";
import CartButton from "./HeaderComponents/CartButton";
import { Controller, useForm } from "react-hook-form";
import { LoginDrawerContext } from "../context/LoginDrawerContext";
import { jwtDecode } from "jwt-decode";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";
import img from "../assets/images/Group 1000002419.png";
import b2bhomeloginImg from "../assets/images/Group.png";
import { STORAGE } from "../config/config";
import uploadedFilesImg from "../assets/images/cloud-upload.png";
import documentImg from "../assets/images/image-file (1) 1.png";
import * as Yup from "yup";
import { debounce } from "lodash";
import { WishlistContext } from "../context/WishlistContext";
import { useUser } from "../context/UserContext ";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import googleImg from "../assets/images/google.png";
import facebookImg from "../assets/images/facebook.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Header = () => {
  const [authMode, setAuthMode] = useState("signin");
  const navigate = useNavigate();
  const { showLogin, setShowLogin } = useContext(LoginDrawerContext);
  const { wishlistCount, fetchWishlistItem } = useContext(WishlistContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [loginShowotp, setLoginShowotp] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const handleWithdrawClose = () => setOpenWithdraw(false);
  const [headerButtons, setHeaderButtons] = useState([]);
  const [otpValue, setOtpValue] = useState();
  const [imageSrc, setImageSrc] = useState("/images/account-avatar.png");
  const [showB2BLogin, setShowB2BLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));

  const handleNavigateToWishlist = () => {
    navigate("/wishlist");
    fetchWishlistItem();
  };

  useEffect(() => {
    fetchWishlistItem();
  }, [fetchWishlistItem]);

  const toggleMobileMenu = (newOpen) => {
    setShowMobileMenu(newOpen);
  };

  const toggleLoginDrawer = (newOpen) => () => {
    if (!newOpen) {
      setShowOtp(false);
      setLoginShowotp(false);
      reset();
    }
    setShowLogin(newOpen);
    setShowB2BLogin();
    setShowCreateAccount();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const bottomHeaderOptions = [
    { name: "sale", link: "/product-page" },
    { name: "new arrival", link: "/new-arrival" },
    { name: "half saree", link: "/half-saree" },
    { name: "fashion saree", link: "/fashion-saree" },
    { name: "lehenga", link: "/lehenga" },
    { name: "gown", link: "/gown" },
    { name: "wedding", link: "/wedding" },
    { name: "celebrity outfits", link: "/celebrity-outfits" },
    { name: "occasions", link: "/occasions" },
    { name: "engagement", link: "/engagement" },
    { name: "reception", link: "/reception" },
    { name: "others", link: "/others" },
  ];

  const login = () => {
    const currentTime = new Date().getTime();
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("loginTime", currentTime);
  };

  const [fontSize, setFontSize] = useState("small");

  useEffect(() => {
    const handleResize = () => {
      const newFontSize =
        window.innerWidth < 1024
          ? "5px"
          : window.innerWidth < 1200
          ? "8px"
          : "8px";
      setFontSize(newFontSize);
    };

    window.addEventListener("resize", handleResize);

    // Set initial font size
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //---------------------------------------- login-part-start ----------------------------------- //
  const {
    control,
    handleSubmit,
    getFieldState,
    watch,
    reset,
    formState: { errors },
  } = useForm({});

  const [signinData, setSigninData] = useState({ mobile: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const referralCode = searchParams.get("code");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [timer, setTimer] = useState(59);
  const [isCounting, setIsCounting] = useState(false);
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  // ----------------- sign-up-start------------ //

  const handleSendOtp = async (payload) => {
    // console.log("payload-----", payload);
    const loadingId = toast.success("Sending OTP...");
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));

    try {
      const { data, config } = await axios.post("/sendotp", {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        is_mobile: "0",
        ...payload,
        type: STORAGE?.MOBILE,
        is_admin: "0",
        user_type: STORAGE?.B2C,
        code: referralCode || "",
      });
      // console.log("dataanjjj:::", data, config);
      if (data && data?.STATUS === 200) {
        toast.success(data?.MESSAGE || "OTP send.");
        console.log(data?.OTP);
        setShowOtp(true);
        setOtpValue(data?.OTP);
        setUserName(payload.user_name);
        setUserEmail(payload.user_email);
        setMobileNumber(payload.user_mobile);
        setTimer(59);
        setIsCounting(true);
        setIsOtpExpired(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      toast.dismiss(loadingId);
    }
  };

  const handleSubmitOtp = async (payload) => {
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid OTP.");
      return;
    }

    if (isOtpExpired) {
      toast.error("OTP has expired. Please request a new OTP.");
      return;
    }
    const loadingId = toast.loading("Verifying OTP...");

    try {
      const { data } = await axios.post("/verifyotp", {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        is_mobile: "0",
        user_mobile: watch("user_mobile"),
        user_otp: otpValue,
        code: referralCode || "",
      });
      if (data && data?.STATUS === 200) {
        toast.success(data?.MESSAGE || "OTP verified.");
        localStorage.setItem(STORAGE?.ISLOGIN, 1);
        localStorage.setItem(STORAGE?.USERDETAIL, JSON.stringify(data?.DATA));
        localStorage.setItem("loginTimestamp", Date.now());
        window.location.reload();
        reset();
        // setLoginMobileNumber(false);
        setShowLogin(false);
        setShowOtp(false);
      } else {
        toast.error(data?.MESSAGE || "OTP not verified.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      toast.dismiss(loadingId);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    handleSendOtp(data);
  };

  const resendOtp = () => {
    handleSendOtp({
      user_mobile: mobileNumber,
      user_email: userEmail,
      user_name: userName,
    });
  };

  // ----------------- sign-up-end------------ //

  // ----------------- sign-in-start------------ //

  const handleLoginSendOtp = async (payload) => {
    const loadingId = toast.success("Sending OTP...");
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    try {
      const { data } = await axios.post("userlogin", {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        is_mobile: "0",
        ...payload,
        type: STORAGE?.MOBILE,
        is_admin: "0",
        user_type: STORAGE?.B2C,
      });
      // console.log("dataanjjj:::", payload);
      if (data && data?.STATUS === 200) {
        toast.success(data?.MESSAGE || "OTP send.");
        // console.log(data?.OTP);
        setLoginShowotp(true);
        setOtpValue(data?.OTP);
        setMobileNumber(payload.user_mobile);
        setTimer(59);
        setIsCounting(true);
        setIsOtpExpired(false);
      }
      if (data && data?.STATUS === 400) {
        toast.error(data?.MESSAGE || "OTP send.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      toast.dismiss(loadingId);
    }
  };

  const handleLoginSubmitOtp = async (payload) => {
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid OTP.");
      return;
    }

    if (isOtpExpired) {
      toast.error("OTP has expired. Please request a new OTP.");
      return;
    }
    const loadingId = toast.loading("Verifying OTP...");

    try {
      const { data } = await axios.post("verifyotp", {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        is_mobile: "0",
        user_mobile: watch("user_mobile"),
        user_otp: otpValue,
      });
      if (data && data?.STATUS === 200) {
        toast.success(data?.MESSAGE || "OTP verified.");
        localStorage.setItem(STORAGE?.ISLOGIN, 1);
        localStorage.setItem(STORAGE?.USERDETAIL, JSON.stringify(data?.DATA));
        localStorage.setItem("loginTimestamp", Date.now());
        window.location.reload();
        reset();
        setShowLogin(false);
        setShowOtp(false);
        console.log("login from b2c", data.DATA);
      } else {
        toast.error(data?.MESSAGE || "OTP not verified.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      toast.dismiss(loadingId);
    }
  };

  const onSubmit1 = (data) => {
    handleLoginSendOtp(data);
  };

  const resendOtp1 = () => {
    handleLoginSendOtp({ user_mobile: mobileNumber });
  };

  useEffect(() => {
    let countdown;
    if (isCounting && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsCounting(false);
      setIsOtpExpired(true);
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [isCounting, timer]);

  const checkLoginValidity = () => {
    const loginTimestamp = localStorage.getItem("loginTimestamp");
    const currentTime = Date.now();
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    if (loginTimestamp && currentTime - loginTimestamp > ONE_DAY_MS) {
      localStorage.clear();
      window.location.reload();
    }
  };

  checkLoginValidity();

  // ----------------- sign-in-end------------ //

  //---------------------------------------- login-part-end ----------------------------------- //

  // ---------------------------------- header-api-start --------------------------------- //

  const fetchHeaderButtons = async () => {
    try {
      const response = await axios.get("header_api");
      const { data } = response;

      if (data && data.STATUS === 200 && Array.isArray(data.DATA)) {
        setHeaderButtons(data.DATA);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching header buttons:", err);
      toast.error(
        err?.response?.data?.MESSAGE ||
          err?.message ||
          "Failed to fetch header buttons."
      );
    }
  };

  // ---------------------------------- header-api-end --------------------------------- //

  //-------------------------------------- user-profile-start ---------------------------------- //

  const { userDetails, setUserDetails } = useUser();
  const { setValue } = useForm();

  const fetchUserDetails = async () => {
    const userProfile = JSON.parse(localStorage?.getItem(STORAGE?.USERDETAIL));
    const deviceId = localStorage.getItem(STORAGE?.DEVICEID);
    try {
      const { data } = await axios.post("/userdetail", {
        user_id: userProfile?.id,
        device_id: deviceId,
        user_type: userProfile?.user_type ?? STORAGE?.B2C,
      });

      if (data && data?.STATUS === 200) {
        const {
          user_name,
          user_last_name,
          user_email,
          user_mobile,
          user_profile,
        } = data?.DATA;
        setUserDetails({
          user_first_name: user_name,
          user_last_name: user_last_name,
          user_email: user_email,
          user_mobile: user_mobile,
          user_profile: user_profile,
        });
        setValue("user_first_name", user_name);
        setValue("user_last_name", user_last_name);
        setValue("user_email", user_email);
        setValue("user_mobile", user_mobile);
        // console.log("Fetched user details:", data?.DATA);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchHeaderButtons();
    // fetchWishlistProducts();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
    // console.log("Updated field:", name, value);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const deviceId = localStorage.getItem(STORAGE?.DEVICEID);
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));

    try {
      const { data } = await axios.post("/updateprofile", {
        device_id: deviceId,
        id: userProfile?.id,
        is_admin: "0",
        user_type: userProfile?.user_type ?? STORAGE?.B2C,
        user_first_name: userProfile.user_first_name,
        user_last_name: userProfile.user_last_name,
        user_email: userProfile.user_email,
        user_mobile: userProfile.user_mobile,
        user_profile: userProfile.user_profile,
      });

      if (data && data.STATUS === 200) {
        // console.log("User updated successfully", data.DATA);
        alert("User updated successfully");
      } else {
        // console.error("Update failed:", data);
        alert("Failed to update user");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update user");
    }
  };

  //-------------------------------------- user-profile-end ---------------------------------- //

  //------------------------------------ google-login-start --------------------------------- //

  function GoogleLogin() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // console.log(result);
        try {
          const userData = {
            device_id: localStorage.getItem("deviceId"),
            user_email: result.user.email,
            user_name: result.user.displayName,
            type: STORAGE?.GOOGLE,
            is_admin: "0",
            user_type: STORAGE?.B2C,
          };

          // console.log("senData :: ", userData);

          const { data } = await axios.post("/sendotp", userData);

          if (data && data?.STATUS === 200) {
            toast.success(data?.MESSAGE);
            // console.log(data);
            setShowLogin(false);
            localStorage.setItem(STORAGE?.ISLOGIN, 1);
            localStorage.setItem(
              STORAGE?.USERDETAIL,
              JSON.stringify(data?.DATA)
            );
          }
        } catch (err) {
          console.error(err);
        }
      })
      .catch((error) => {
        console.error("Error during sign-in with Google: ", error);
      });
  }

  //------------------------------------ google-login-end --------------------------------- //

  // ------------------------------- facebook-login-start ------------------------------- //

  const handleLogin = async (payload) => {
    // console.log(payload);
    // console.log("facebook", {
    //   device_id: localStorage.getItem("deviceId"),
    //   is_mobile: "0",
    //   user_email: payload.data.email,
    //   user_name: payload.data.name,
    //   type: STORAGE?.FACEBOOK,
    //   is_admin: "0",
    //   user_type: STORAGE?.B2C,
    // });

    try {
      const { data } = await axios.post("/sendotp", {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        // device_id: localStorage.getItem("deviceId"),
        is_mobile: "0",
        user_name: payload.data.name,
        user_email: payload.data.email,
        type: STORAGE?.FACEBOOK,
        is_admin: "0",
        user_type: STORAGE?.B2C,
      });
      if (data && data?.STATUS === 200) {
        toast.success(data?.MESSAGE);
        console.log(data);
        setShowLogin(false);
        localStorage.setItem(STORAGE?.ISLOGIN, 1);
        localStorage.setItem(STORAGE?.USERDETAIL, JSON.stringify(data?.DATA));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE?.ISLOGIN);
    localStorage.removeItem(STORAGE?.USERDETAIL);
    localStorage.removeItem("deviceId");
    isLoggedIn(true);
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileWithMeta = {
        name: file.name,
        size: (file.size / 1024).toFixed(2),
        date: new Date().toLocaleDateString(),
        file: file,
      };
      setUploadedFiles([...uploadedFiles, fileWithMeta]);
    }
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  // ------------------------------- facebook-login-end ------------------------------- //

  /*--------------------- For B2b account section start --------------------*/

  // -------------------------for b2b login---------------------
  const [formData, setFormData] = useState({
    b2b_username: "",
    b2b_password: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    b2b_username: Yup.string()
      .email("Invalid email format")
      .required("The user email field is required."),
    b2b_password: Yup.string()
      .min(7, "Password must be at least 6 characters long")
      .required("The user password field is required."),
  });

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrorMessage({});
      return true;
    } catch (validationErrors) {
      const formattedErrors = validationErrors.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrorMessage(formattedErrors);
      return false;
    }
  };

  const handleb2bInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateForm();
  };

  // const handleb2bLogin = async (e) => {
  //   e.preventDefault();

  //   const isValid = await validateForm();
  //   if (!isValid) return;
  //   try {
  //     const response = await axios.post("b2blogin", {
  //       user_email: formData.b2b_username,
  //       user_password: formData.b2b_password,
  //     });
  //     console.log("b2blogin", response.data);
  //     if (response.status === 200) {
  //       toast.success(response.data.MESSAGE);
  //       localStorage.setItem(STORAGE?.ISLOGIN, 1);
  //       localStorage.setItem(
  //         STORAGE?.USERDETAIL,
  //         JSON.stringify(response?.data.data)
  //       );
  //       navigate("/");
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     setErrorMessage(
  //       error?.response?.data || "Login failed, please try again."
  //     );
  //   }
  // };

  const handleb2bLogin = async (e) => {
    e.preventDefault();
  
    const isValid = await validateForm();
    if (!isValid) return;
  
    try {
      const response = await axios.post("b2blogin", {
        user_email: formData.b2b_username,
        user_password: formData.b2b_password,
      });
  
      if (response.status === 200) {
        // Assuming that the user details are in response.data.data
        const userDetails = response?.data?.data;
        
        if (userDetails) {
          toast.success(response.data.MESSAGE);
          localStorage.setItem(STORAGE?.ISLOGIN, 1);
          localStorage.setItem(STORAGE?.USERDETAIL, JSON.stringify(userDetails));
          navigate("/");
          window.location.reload();
        } else {
          throw new Error("User details not available");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
  
      // Handle error based on server response or provide a default error message
      const errorMessage = error?.response?.data?.MESSAGE || "Login failed, please try again.";
      setErrorMessage({ general: errorMessage });
  
      // Optionally display a toast for the error
      toast.error(errorMessage);
    }
  };
  

  // -------------------------for b2b login---------------------

  // ----------------------------- for b2b register start --------------------

  const steps = ["Owner Details", "Business Details", "Documents"];

  const [error, setError] = useState({});
  const [activeStep, setActiveStep] = useState(1);

  const [formDataB2BRegister, setFormDataB2BRegister] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    homeNumber: "",
    landMark: "",
    pinCode: "",
    city: "",
    state: "",
    shopName: "",
    productName: "",
    gstNo: "",
    panNo: "",
    contactNumber: "",
    area: "",
    country: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactNumberRegex = /^[0-9]{10}$/;
  const userPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  const handleb2bRegisterInputChange = (event) => {
    const { name, value } = event.target;
    const newFormData = { ...formDataB2BRegister, [name]: value };
    const newErrors = { ...errors };

    if (name === "userEmail") {
      if (!emailRegex.test(value)) {
        newErrors.userEmail = "Invalid email format";
      } else {
        delete newErrors.userEmail;
      }
    }

    // if (name === "contactNumber") {
    //   if (!contactNumberRegex.test(value)) {
    //     newErrors.contactNumber = "Contact number must be 10 digits";
    //   } else {
    //     delete newErrors.contactNumber;
    //   }
    // }

    if (name === "contactNumber") {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      newFormData.contactNumber = numericValue;
  
      if (numericValue.length !== 10) {
        newErrors.contactNumber = "Contact number must be exactly 10 digits";
      } else {
        delete newErrors.contactNumber;
      }
    }

    if (name === "userPassword") {
      if (!userPasswordRegex.test(value)) {
        newErrors.userPassword = "Password must be 6 characters long, contain at least one number and one special character";
      } else {
        delete newErrors.userPassword;
      }
    }

    if (name === "landMark") {
      const alphabeticValue = value.replace(/[^a-zA-Z\s]/g, '');
      newFormData.landMark = alphabeticValue;
  
      if (!alphabeticValue) {
        newErrors.landMark = "Landmark cannot be empty and must only contain letters";
      } else {
        delete newErrors.landMark;
      }
    }

    setFormDataB2BRegister(newFormData);
    setError(newErrors);
  };

  const parseErrorMessage = (message) => {
    const errorMap = {};
    const messageLines = message.split("\n");
    messageLines.forEach((line) => {
      if (line.includes("contact number"))
        errorMap.contactNumber = "The contact number field is required.";
      if (line.includes("email"))
        errorMap.userEmail = "The email field is required.";
      if (line.includes("user password"))
        errorMap.userPassword = "The user password field is required.";
      if (line.includes("name"))
        errorMap.userName = "The name field is required.";
      if (line.includes("address flate house company"))
        errorMap.homeNumber =
          "The address flate house company field is required.";
      if (line.includes("address area street village"))
        errorMap.area = "The address area street village field is required.";
      if (line.includes("address landmark"))
        errorMap.landMark = "The address landmark field is required.";
      if (line.includes("address pincode"))
        errorMap.pinCode = "The address pincode field is required.";
      if (line.includes("address city"))
        errorMap.city = "The address city field is required.";
      if (line.includes("address state"))
        errorMap.state = "The address state field is required.";
      if (line.includes("address country"))
        errorMap.country = "The country field is required.";
      if (line.includes("shop name"))
        errorMap.shopName = "The shop name field is required.";
      if (line.includes("product"))
        errorMap.productName = "The product name field is required.";
      if (line.includes("gst no"))
        errorMap.gstNo = "The GST number field is required.";
      if (line.includes("pan no"))
        errorMap.panNo = "The PAN number field is required.";
    });
    return errorMap;
  };

  const handleNext = async () => {
    let proceedToNextStep = true;
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));

    try {
      let response = {};
      if (activeStep === 1) {
        response = await axios.post("b2bregister", {
          device_id: localStorage.getItem(STORAGE?.DEVICEID),
          user_type: userProfile?.user_type ?? STORAGE?.B2B,
          is_admin: "0",
          user_id: userProfile?.id,
          name: formDataB2BRegister.userName,
          email: formDataB2BRegister.userEmail,
          user_password: formDataB2BRegister.userPassword,
          address_flate_house_company: formDataB2BRegister.homeNumber,
          address_landmark: formDataB2BRegister.landMark,
          address_pincode: formDataB2BRegister.pinCode,
          address_city: formDataB2BRegister.city,
          address_state: formDataB2BRegister.state,
          shop_name: formDataB2BRegister.shopName,
          product: formDataB2BRegister.productName,
          gst_no: formDataB2BRegister.gstNo,
          pan_no: formDataB2BRegister.panNo,
          documents: uploadedFiles,
          tab: activeStep,
          contact_number: formDataB2BRegister.contactNumber,
          address_area_street_village: formDataB2BRegister.area,
          address_country: formDataB2BRegister.country,
        });
      } else if (activeStep === 2) {
        response = await axios.post("b2bregister", {
          device_id: localStorage.getItem(STORAGE?.DEVICEID),
          user_type: userProfile?.user_type ?? STORAGE?.B2B,
          is_admin: "0",
          user_id: userProfile?.id,
          name: formDataB2BRegister.userName,
          email: formDataB2BRegister.userEmail,
          user_password: formDataB2BRegister.userPassword,
          address_flate_house_company: formDataB2BRegister.homeNumber,
          address_landmark: formDataB2BRegister.landMark,
          address_pincode: formDataB2BRegister.pinCode,
          address_city: formDataB2BRegister.city,
          address_state: formDataB2BRegister.state,
          shop_name: formDataB2BRegister.shopName,
          product: formDataB2BRegister.productName,
          gst_no: formDataB2BRegister.gstNo,
          pan_no: formDataB2BRegister.panNo,
          documents: uploadedFiles,
          tab: activeStep,
          contact_number: formDataB2BRegister.contactNumber,
          address_area_street_village: formDataB2BRegister.area,
          address_country: formDataB2BRegister.country,
        });
      } else if (activeStep === 3) {
        response = await axios.post("b2bregister", {
          device_id: localStorage.getItem(STORAGE?.DEVICEID),
          user_type: userProfile?.user_type ?? STORAGE?.B2B,
          is_admin: "0",
          user_id: userProfile?.id,
          name: formDataB2BRegister.userName,
          email: formDataB2BRegister.userEmail,
          user_password: formDataB2BRegister.userPassword,
          address_flate_house_company: formDataB2BRegister.homeNumber,
          address_landmark: formDataB2BRegister.landMark,
          address_pincode: formDataB2BRegister.pinCode,
          address_city: formDataB2BRegister.city,
          address_state: formDataB2BRegister.state,
          shop_name: formDataB2BRegister.shopName,
          product: formDataB2BRegister.productName,
          gst_no: formDataB2BRegister.gstNo,
          pan_no: formDataB2BRegister.panNo,
          documents: uploadedFiles,
          tab: activeStep,
          contact_number: formDataB2BRegister.contactNumber,
          address_area_street_village: formDataB2BRegister.area,
          address_country: formDataB2BRegister.country,
        });
      }

      const { data } = response;
      if (data) {
        if (data.STATUS === 200) {
          toast.success(data.MESSAGE);
          // console.log(data);
          if (activeStep === 3) {
            localStorage.setItem(STORAGE?.ISLOGIN, 1);
            localStorage.setItem(
              STORAGE?.USERDETAIL,
              JSON.stringify(data?.DATA)
            );
            setShowLogin(false);
          }
        } else if (data.STATUS === 400) {
          // toast.error(data.MESSAGE);
          const newErrors = parseErrorMessage(data.MESSAGE);
          setError(newErrors);
          proceedToNextStep = false;
          // console.log(data.MESSAGE);
          // toast.error(data.MESSAGE);
        }
      }
    } catch (err) {
      console.error(err);
      proceedToNextStep = false;
    }

    if (proceedToNextStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <form>
            <div className="w-full mb-6 md:mb-10 xl:mb-[30px]">
              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="userName"
                  placeholder="Full Name"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.userName}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.userName && (
                  <p className="text-red-500 text-start">{error.userName}</p>
                )}
              </>
              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="userEmail"
                  placeholder="Email Id"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.userEmail}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.userEmail && (
                  <p className="text-red-500 text-start">{error.userEmail}</p>
                )}
              </>
              {/* <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="userPassword"
                  placeholder="Password"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.userPassword}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.userPassword && (
                  <p className="text-red-500 text-start">
                    {error.userPassword}
                  </p>
                )}
              </> */}

              <div className="relative">
                <InputBase
                  classes={{ input: "py-0" }}
                  type={showPassword ? "text" : "password"}
                  name="userPassword"
                  placeholder="Password"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.userPassword}
                  onChange={handleb2bRegisterInputChange}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {error.userPassword && (
                <p className="text-red-500 text-start">{error.userPassword}</p>
              )}

              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="contactNumber"
                  placeholder="Mobile Number"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.contactNumber}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.contactNumber && (
                  <p className="text-red-500 text-start">
                    {error.contactNumber}
                  </p>
                )}
              </>

              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="homeNumber"
                  placeholder="Flat,House no, Building"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  required
                  value={formDataB2BRegister.homeNumber}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.homeNumber && (
                  <p className="text-red-500 text-start">{error.homeNumber}</p>
                )}
              </>

              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="area"
                  placeholder="Area,street,Building"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.area}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.area && (
                  <p className="text-red-500 text-start">{error.area}</p>
                )}
              </>

              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="landMark"
                  placeholder="Landmark"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.landMark}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.landMark && (
                  <p className="text-red-500 text-start">{error.landMark}</p>
                )}
              </>

              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="pinCode"
                  placeholder="Pincode"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.pinCode}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.pinCode && (
                  <p className="text-red-500 text-start">{error.pinCode}</p>
                )}
              </>

              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="city"
                  placeholder="Town/City"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.city}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.city && (
                  <p className="text-red-500 text-start">{error.city}</p>
                )}
              </>

              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="state"
                  placeholder="State"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.state}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.state && (
                  <p className="text-red-500 text-start">{error.state}</p>
                )}
              </>

              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.country}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.country && (
                  <p className="text-red-500 text-start">{error.country}</p>
                )}
              </>
            </div>
          </form>
        );
      case 2:
        return (
          <form>
            <div className="w-full mb-6 md:mb-10 xl:mb-[30px]">
              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="shopName"
                  placeholder="Shop Name"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.shopName}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.shopName && (
                  <p className="text-red-500 text-start">{error.shopName}</p>
                )}
              </>

              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="productName"
                  placeholder="Product"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.productName}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.productName && (
                  <p className="text-red-500 text-start">{error.productName}</p>
                )}
              </>

              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="gstNo"
                  placeholder="GST No."
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.gstNo}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.gstNo && (
                  <p className="text-red-500 text-start">{error.gstNo}</p>
                )}
              </>

              <>
                <InputBase
                  classes={{ input: "py-0" }}
                  type="text"
                  name="panNo"
                  placeholder="Pan No"
                  className="h-12 sm:h-15 xl:h-15 2xl:h-18 w-full border border-[#CDCDCD] sm:!text-xl xl:!text-xl 3xl:!text-[22px] !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-6 text-black mb-2"
                  value={formDataB2BRegister.panNo}
                  onChange={handleb2bRegisterInputChange}
                />
                {error.panNo && (
                  <p className="text-red-500 text-start">{error.panNo}</p>
                )}
              </>
            </div>
          </form>
        );
      case 3:
        return (
          <>
            <div className="flex flex-col items-center justify-center">
              <div className="w-[420px] bg-white p-8 rounded-2xl flex flex-col gap-12">
                <div
                  className="w-full p-12 border-2 rounded-2xl group flex flex-col items-center justify-center border-dashed border-gray-400 cursor-pointer bg-[#F4F4F4]"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <img
                    src={uploadedFilesImg}
                    className="w-14 aspect-square group-hover:scale-105 cursor-pointer"
                  />
                  <p className="text-gray-400 text-[20px]">Select Documents</p>
                  <p className="text-gray-200 ">Maximum File Size 200KB</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mb-10">
              <div className="w-full rounded-2xl flex flex-col gap-2">
                <p className="text-balck-700 font-bold text-xl text-start">
                  Uploaded Documents
                </p>
                <div id="uploadedFiles" className="flex flex-col gap-3">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 border-2 p-2 bg-[#F4F4F4]"
                    >
                      <img className="w-10" src={documentImg} />
                      <div className="w-full space-y-1">
                        <div className="flex justify-between align-item-center">
                          <div>
                            <div className="flex justify-between">
                              <span>{file.name}</span>
                            </div>
                            <div className="flex gap-4 text-gray-500 text-sm text-start">
                              <div> {file.date} </div>
                              <div>{file.size} KB</div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <MdDelete style={{ color: "red" }} size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
    }
  };
  // ------------------------------------ for b2b register end -------------------
  /*--------------------- For B2b account section end--------------------*/

  /*------------------------------- search-product-code-start -------------------------------*/

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query) {
        setShowSuggestions(true);
        console.log("Searching for:", query);
      } else {
        setShowSuggestions(false);
        setSuggestions([]);
      }
    }, 1000),
    []
  );

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && searchTerm) {
      localStorage.setItem("searchTerm", searchTerm);

      navigate("/product-page", {
        state: { search: searchTerm },
      });

      setSuggestions([]);
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value ?? "";
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSuggestionClick = (item) => {
    setSearchTerm(item.suggestion);
    setSuggestions([]);
    navigate(`/product-page/${item.id}`);
  };

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm");
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
      localStorage.removeItem("searchTerm");
    }
  }, [location.state]);

  useEffect(() => {
    // console.log("Suggestions:", suggestions);
  }, [suggestions]);

  /*------------------------------- search-product-code-end -------------------------------*/

  return (
    <>
      <header className="bg-[#E9B159] sticky -top-[1px] left-0 w-full z-[99] shadow-[0px_4px_4px_0px_#00000040]">
        <div className="w-full max-w-[1804px] mx-auto pt-[15px] pb-4 xl:pb-[6px] px-3">
          <div className="flex items-center flex-wrap gap-y-3 lg:gap-8 justify-center lg:justify-between -mx-3">
            <div className="w-1/2 lg:w-auto flex items-center gap-3 px-3">
              {/* <button
                onClick={() => toggleMobileMenu(true)}
                className="xl:hidden block"
              >
                <IoMenu size={26} color="white" />
              </button> */}
              <Link to="/">
                <div className="max-w-[200px] xl:max-w-[200px] 2xl:max-w-[295px]">
                  <img
                    src="/images/header-logo.png"
                    alt="header-logo"
                    className="object-contain"
                    width={640}
                    height={360}
                    loading="lazy"
                  />
                </div>
              </Link>
            </div>
            <div className="w-full flex-1 lg:w-auto 2xl:max-w-[689px] px-3 lg:px-[100px] 2xl:px-[0px] relative order-1 lg:order-none">
              <div className="w-full flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20  bg-white/10">
                <div className="flex items-center justify-center">
                  <IoSearch size={22} className="text-white" />
                </div>
                <input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full outline-none bg-transparent text-base font-normal font-Inter text-[#FFFEFE] placeholder:text-[#FFFEFE] leading-5"
                  onKeyDown={handleKeyUp}
                  onChange={handleChange}
                  value={searchTerm ?? ""}
                  onBlur={() => setShowSuggestions(false)}
                  onFocus={() => searchTerm && setShowSuggestions(true)}
                />
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div
                  className="absolute top-full left-0 w-full bg-white z-10 shadow-lg mt-3"
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSuggestionClick(item)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {item.suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-1/2 lg:w-auto flex items-center justify-end gap-3 lg:gap-4 2xl:gap-6 px-3">
              <button
                className="flex items-center gap-1 text-white outline-0"
                onClick={handleClick}
              >
                {isLoggedIn ? (
                  <>
                    <img
                      className="rounded-full"
                      src={userDetails?.user_profile || img}
                      style={{
                        width: "20px",
                        height: "20px",
                        objectFit: "cover",
                      }}
                      alt=""
                      loading="lazy"
                    />

                    {userProfile?.user_type === "btoc" ? (
                      <>
                        <span className="hidden xl:inline-block text-lg font-medium capitalize leading-4 font-jost">
                          Account
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="hidden xl:inline-block text-lg font-medium capitalize leading-4 font-jost">
                          Whole sale Account
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <AccountIcon />
                    <span className="hidden xl:inline-block text-lg font-medium capitalize leading-4 font-jost">
                      Login
                    </span>
                  </>
                )}
              </button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                sx={{
                  marginTop: 1,
                  Top: 2.5,
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.25)",
                  borderRadius: 0,
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div className="flex flex-col px-3.5">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to={"/account"}
                        className="py-3.5 border-b border-[#D6D6D6] flex items-center gap-2.5 last:border-none text-base font-medium text-[#252525]"
                        onClick={() => {
                          handleClose(false);
                        }}
                      >
                        <ProfileIcon color={"#000"} />
                        My Profile
                      </Link>
                      {/* <button
                        className="py-3.5 border-b border-[#D6D6D6] flex items-center gap-2.5 last:border-none text-base font-medium text-[#252525]"
                        onClick={() => {
                          setOpenWithdraw(true);
                          handleClose(false);
                        }}
                      >
                        <NotificationIcon color={"#000"} />
                        Notification
                      </button> */}
                      <Link
                        to={"/my-order"}
                        className="py-3.5 border-b border-[#D6D6D6] flex items-center gap-2.5 last:border-none text-base font-medium text-[#252525]"
                        onClick={() => {
                          handleClose(false);
                        }}
                      >
                        <MyOrderIcon color={"#000"} />
                        My Order
                      </Link>
                      {/* <Link
                        to={"/returnpage"}
                        className="py-3.5 border-b border-[#D6D6D6] flex items-center gap-2.5 last:border-none text-base font-medium text-[#252525]"
                        onClick={() => {
                          // setOpenWithdraw(true);
                          handleClose(false);
                        }}
                      >
                        <ReturnIcon color={"#000"} />
                        Return Product
                      </Link> */}

                      <button
                        className="py-3.5 border-b border-[#D6D6D6] flex items-center gap-2.5 last:border-none text-base font-medium text-[#252525]"
                        onClick={() => {
                          localStorage.clear();

                          navigate("/home");
                          window.location.reload();

                          auth.signOut();
                          handleLogout();
                        }}
                      >
                        <LogoutIcon color={"#000"} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      className="py-3.5 border-b border-[#D6D6D6] flex items-center gap-3.5 last:border-none text-base font-medium text-[#252525]"
                      onClick={() => {
                        setShowLogin(true);
                        handleClose(false);
                      }}
                    >
                      <LogoutIcon color={"#000"} />
                      Signup/Signin
                    </button>
                  )}
                </div>
              </Popover>

              <button
                className="flex items-center gap-1 text-white outline-0"
                onClick={handleNavigateToWishlist}
              >
                <span className="relative inline-block w-[26px] h-[26px]">
                  <WishlistIcon />
                  {wishlistCount > 0 && (
                    <span className="cart-num absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full bg-[#FF344B] grid place-content-center text-xs font-normal font-Roboto">
                      {wishlistCount}
                    </span>
                  )}
                </span>
                <span className="hidden xl:inline-block text-lg font-medium capitalize leading-4 font-jost">
                  Wishlist
                </span>
              </button>

              <CartButton />
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1200px] mx-auto px-6 hidden xl:block py-0">
          <div className="flex items-center justify-center relative">
            {headerButtons?.map((item, index) => {
              const variation = { ...item.subcategories };
              const category_image = { category_image: item.category_image };
              return (
                <MegaMenuButton
                  categoryId={item.id}
                  buttonLabel={item.category_name}
                  key={item.category_name + index}
                  variation={variation}
                  category_image={category_image}
                ></MegaMenuButton>
              );
            })}
          </div>
        </div>
      </header>
      <Drawer
        open={showMobileMenu}
        onClose={() => toggleMobileMenu(false)}
        anchor="left"
      >
        <Box role="presentation" className="w-screen max-w-[400px]">
          <div className="w-screen max-w-[400px] bg-white h-screen p-6 pt-16 overflow-y-auto">
            <div className="flex items-center justify-end absolute w-full p-2 bg-white top-0 left-0 ">
              <button onClick={() => toggleMobileMenu(false)}>
                <IoIosClose size={40} />
              </button>
            </div>
            <ul>
              {bottomHeaderOptions.map((item) => {
                return (
                  <li
                    key={item.name}
                    className=" rounded-md background hover:bg-black/10"
                  >
                    <Link
                      to={item.link}
                      className="text-black p-4 block text-base xl:text-sm 2xl:text-lg font-medium !leading-none  uppercase"
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Box>
      </Drawer>
      <Drawer
        open={showLogin}
        onClose={toggleLoginDrawer(false)}
        anchor="right"
      >
        <Box
          role="presentation"
          className="max-w-[300px] lg:!max-w-[450px] w-screen"
        >
          {!showOtp && !loginShowotp && !showB2BLogin && !showCreateAccount && (
            <div className="w-screen max-w-[300px] lg:max-w-[450px] h-full bg-white absolute top-0 right-0 p-3 lg:p-5 xl:px-11 xl:pb-14">
              <div className="bag-header text-center h-full grid justify-center items-center">
                <button
                  className="absolute top-5 left-5 xl:left-[34px] xl:top-[34px]"
                  onClick={() => {
                    reset();
                    setShowLogin(false);
                  }}
                >
                  <FaAngleLeft className="w-8 h-8 md:h-10 md:w-10 bg-[#9B9B9B] rounded-full text-white text-base p-1.5 md:p-2.5" />
                </button>

                <div className="">
                  {authMode === "signin" ? (
                    <form onSubmit={handleSubmit(onSubmit1)}>
                      <div className="mb-8">
                        <img
                          src="/images/login-logo.png"
                          className="w-[200px] xl:h-auto mx-auto"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <p className="text-sm xs:text-lg md:text-xl !leading-none rounded text-[#c18b32] bg-white px-3 md:px-[19px] py-3.5 border border-[#c18b32] mb-4">
                        Fashion at Your Fingertips: Explore, Shop, and Slay!
                      </p>
                      <div className="text-xl sm:text-2xl  font-medium !leading-none mb-4">
                        Signin
                      </div>
                      <p className="sm:text-md !leading-[1.2] text-[#666464] mb-4">
                        {authMode === "signin"
                          ? "Sign in to access your account, track orders, and more."
                          : "Sign in so you can save items to your wishlists, track your orders, and checkout faster!"}
                      </p>
                      <Controller
                        name="user_mobile"
                        control={control}
                        rules={{
                          required: "Mobile Number is required.",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Mobile Number must be 10 digits.",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <InputBase
                              classes={{ input: "py-0" }}
                              type="number"
                              placeholder="Enter Mobile Number"
                              className="h-10 sm:h-10 xl:h-10 2xl:h-15 w-full border border-[#CDCDCD] sm:!text-sm !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-2 text-black mb-2"
                              inputProps={{ maxLength: 10 }}
                              {...field}
                              onInput={(e) => {
                                if (e.target.value.length > 10) {
                                  e.target.value = e.target.value.slice(0, 10);
                                }
                                field.onChange(e);
                                setMobileNumber(e.target.value);
                                setSigninData({
                                  ...signinData,
                                  mobile: e.target.value,
                                });
                              }}
                            />
                            {errors.user_mobile && (
                              <p className="text-red-500 text-start mb-2">
                                {errors.user_mobile.message}
                              </p>
                            )}
                          </>
                        )}
                      />

                      <button
                        type="submit"
                        className="w-full bg-[#E9B159] p-2 sm:text-lg lg:text-2xl font-medium !leading-tight text-center text-white mb-4"
                      >
                        CONTINUE
                      </button>
                      {authMode === "signin" ? (
                        <div className="text-sm sm:text-lg  font-medium !leading-none mb-4">
                          You have not a account?
                          <span
                            className="text-[#E9B159] cursor-pointer"
                            onClick={() => setAuthMode("signup")}
                          >
                            Sign up
                          </span>
                        </div>
                      ) : (
                        <div className="text-sm sm:text-lg  font-medium !leading-none mb-4">
                          You have an account?
                          <span
                            className="text-[#E9B159] cursor-pointer"
                            onClick={() => setAuthMode("signin")}
                          >
                            Sign in
                          </span>
                        </div>
                      )}
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-8">
                        <img
                          src="/images/login-logo.png"
                          className="w-[200px] xl:h-auto mx-auto"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <p className="text-sm xs:text-lg md:text-xl !leading-none rounded text-[#c18b32] bg-white px-3 md:px-[19px] py-3.5 border border-[#c18b32] mb-4">
                        Fashion at Your Fingertips: Explore, Shop, and Slay!
                      </p>
                      <div className="text-xl sm:text-2xl  font-medium !leading-none mb-4">
                        Signup
                      </div>
                      <p className="sm:text-md !leading-[1.2] text-[#666464] mb-4">
                        {authMode === "signin"
                          ? "Sign in to access your account, track orders, and more."
                          : "Sign in so you can save items to your wishlists, track your orders, and checkout faster!"}
                      </p>
                      <Controller
                        name="user_name"
                        control={control}
                        rules={{
                          required: "Username is required.",
                          pattern: {
                            value: /^[a-zA-Z ]{0,30}$/,
                            message: "Only characters are allowed.",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <InputBase
                              classes={{ input: "py-0" }}
                              type="text"
                              placeholder="Full Name"
                              className="h-10 sm:h-10 xl:h-10 2xl:h-15 w-full border border-[#CDCDCD] sm:!text-sm !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-2 text-black mb-2"
                              {...field}
                              value={signupData.name}
                              onChange={(e) => {
                                setSignupData({
                                  ...signupData,
                                  name: e.target.value,
                                });
                                field.onChange(e);
                                setUserName(e.target.value);
                              }}
                            />
                            {errors.user_name && (
                              <p className="text-red-500 text-start mb-2">
                                {errors.user_name.message}
                              </p>
                            )}
                          </>
                        )}
                      />

                      <Controller
                        name="user_email"
                        control={control}
                        rules={{
                          required: "Email is required.",
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Please enter a valid email",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <InputBase
                              classes={{ input: "py-0" }}
                              type="text"
                              placeholder="Enter Email ID"
                              className="h-10 sm:h-10 xl:h-10 2xl:h-15 w-full border border-[#CDCDCD] sm:!text-sm !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-2 text-black mb-2"
                              {...field}
                              value={signupData.email}
                              onChange={(e) => {
                                setSignupData({
                                  ...signupData,
                                  email: e.target.value,
                                });
                                field.onChange(e);
                                setUserEmail(e.target.value);
                              }}
                            />
                            {errors.user_email && (
                              <p className="text-red-500 text-start mb-2">
                                {errors.user_email.message}
                              </p>
                            )}
                          </>
                        )}
                      />

                      <Controller
                        name="user_mobile"
                        control={control}
                        rules={{
                          required: "Mobile Number is required.",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Mobile Number must be 10 digits.",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <InputBase
                              classes={{ input: "py-0" }}
                              type="number"
                              placeholder="Enter Mobile Number"
                              className="h-10 sm:h-10 xl:h-10 2xl:h-15 w-full border border-[#CDCDCD] sm:!text-sm !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-2 text-black mb-2"
                              inputProps={{ maxLength: 10 }}
                              {...field}
                              value={signupData.mobile}
                              onChange={(e) => {
                                if (e.target.value.length > 10) {
                                  e.target.value = e.target.value.slice(0, 10);
                                }
                                setSignupData({
                                  ...signupData,
                                  mobile: e.target.value,
                                });
                                field.onChange(e);
                                setMobileNumber(e.target.value);
                              }}
                            />
                            {errors.user_mobile && (
                              <p className="text-red-500 text-start mb-2">
                                {errors.user_mobile.message}
                              </p>
                            )}
                          </>
                        )}
                      />

                      <button
                        type="submit"
                        className="w-full bg-[#E9B159] p-2 sm:text-lg lg:text-2xl font-medium !leading-tight text-center text-white mb-4"
                      >
                        CONTINUE
                      </button>
                      {authMode === "signin" ? (
                        <div className="text-sm sm:text-lg  font-medium !leading-none mb-4">
                          You have not a account?
                          <span
                            className="text-[#E9B159] cursor-pointer"
                            onClick={() => setAuthMode("signup")}
                          >
                            Sign up
                          </span>
                        </div>
                      ) : (
                        <div className="text-sm sm:text-lg  font-medium !leading-none mb-4">
                          You have an account?
                          <span
                            className="text-[#E9B159] cursor-pointer"
                            onClick={() => setAuthMode("signin")}
                          >
                            Sign in
                          </span>
                        </div>
                      )}
                    </form>
                  )}
                  <button
                    className="flex items-center gap-3 mx-auto text-lg lg:text-xl font-medium leading-10 text-center text-black mb-4"
                    onClick={() => setShowB2BLogin(true)}
                  >
                    Login With B2B <FaArrowRightLong />
                  </button>
                  <div className="flex justify-center items-center gap-4">
                    <div
                      onClick={GoogleLogin}
                      className="p-5 bg-[white] rounded cursor-pointer"
                    >
                      <img className="w-[30px]" src={googleImg} />
                    </div>
                    <LoginSocialFacebook
                      // appId="304411859147341"
                      appId="1005711131285989"
                      onResolve={handleLogin}
                      onReject={(error) => {
                        console.log(error);
                      }}
                    >
                      <CustomFacebookButton />
                    </LoginSocialFacebook>
                  </div>

                  <p className="sm:text-md !leading-tight text-start text-black md:pt-[0px] md:px-[20px] pb-5 xl:pb-10 mt-3">
                    By signing up you agree to our
                    <Link
                      to="/term-and-condition"
                      className="text-[#E9B159] ms-1"
                      onClick={() => {
                        reset();
                        setShowLogin(false);
                      }}
                    >
                      Terms of Service
                    </Link>
                    <span> & </span>
                    <Link
                      to="/privancypolicy"
                      className="text-[#E9B159]"
                      onClick={() => {
                        reset();
                        setShowLogin(false);
                      }}
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}

          {showOtp && (
            <div className="w-screen max-w-[300px] lg:max-w-[450px] h-full bg-white absolute top-0 right-0 p-3 lg:p-5 xl:px-11 xl:pb-14">
              <div className="relative text-center px-3 lg:px-5 xl:px-11 xl:pb-14 pt-14 2xl:pt-20">
                <button
                  className="absolute top-5 left-5 xl:left-[34px] xl:top-[34px]"
                  onClick={() => {
                    reset();
                    setShowOtp(false);
                  }}
                >
                  <FaAngleLeft className="w-8 h-8 md:h-10 md:w-10 bg-[#9B9B9B] rounded-full text-white text-base p-1.5 md:p-2.5" />
                </button>
                <div className="mb-6 sm:mb-10 lg:mb-10 2xl:mb-10">
                  <img
                    src="/images/login-logo.png"
                    className="w-[200px] xl:h-auto mx-auto"
                    alt=""
                    loading="lazy"
                  />
                </div>
                <h4 className="text-xl lg:text-2xl font-medium !leading-none mb-3.5">
                  Verify OTP
                </h4>
                <p className="text-lg md:text-xl !leading-[1.2] text-[#666464] mb-6 sm:mb-10 lg:mb-10">
                  Enter the 6-digit OTP sent to{" "}
                  <span>+91-******{mobileNumber.slice(-4)}</span>
                </p>
                <div className="mb-5">
                  <div className="w-full mb-6 md:mb-10 xl:mb-[40px]">
                    <OTPInput
                      otpValue={otpValue}
                      onChange={(otp) => setOtpValue(otp)}
                      onEnter={handleSubmitOtp}
                    />
                  </div>
                  <button
                    className="w-full bg-[#E9B159] p-2 lg:p-2 sm:text-lg lg:text-2xl font-medium !leading-tight text-center text-white mb-5"
                    onClick={() => handleSubmitOtp()}
                  >
                    SUBMIT
                  </button>
                  <button
                    className="sm:text-sm lg:text-xl !leading-none text-[3666464]"
                    onClick={resendOtp}
                    disabled={timer > 0}
                  >
                    <span className="font-medium text-[#666464] underline">
                      {isOtpExpired ? "Resend OTP" : "Resend OTP"}
                    </span>
                    <span className="font-medium">
                      {timer > 0 && ` in ${timer}s`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {loginShowotp && (
            <div className="w-screen max-w-[300px] lg:max-w-[450px] h-full bg-white absolute top-0 right-0">
              <div className="relative text-center px-3 lg:px-5 xl:px-11 xl:pb-14 pt-14 2xl:pt-20">
                <button
                  className="absolute top-5 left-5 xl:left-[34px] xl:top-[34px]"
                  onClick={() => {
                    reset();
                    setLoginShowotp(false);
                  }}
                >
                  <FaAngleLeft className="w-8 h-8 md:h-10 md:w-10 bg-[#9B9B9B] rounded-full text-white text-base p-1.5 md:p-2.5" />
                </button>
                <div className="mb-6 sm:mb-10 lg:mb-10 2xl:mb-10">
                  <img
                    src="/images/login-logo.png"
                    className="w-[200px] xl:h-auto mx-auto"
                    alt=""
                    loading="lazy"
                  />
                </div>
                <h4 className="text-xl lg:text-2xl 2xl:text-3xl font-medium !leading-none mb-3.5">
                  Verify OTP
                </h4>
                <p className="text-lg md:text-xl !leading-[1.2] text-[#666464] mb-6 sm:mb-10 lg:mb-10">
                  Enter the 6-digit OTP sent to{" "}
                  <span>+91-******{mobileNumber.slice(-4)}</span>
                </p>
                <div className="mb-5">
                  <div className="w-full mb-6 md:mb-10 xl:mb-[54px]">
                    <OTPInput
                      otpValue={otpValue}
                      onChange={(otp) => setOtpValue(otp)}
                      onEnter={handleSubmitOtp}
                    />
                  </div>
                  <button
                    className="w-full bg-[#E9B159] p-2 lg:p-2 sm:text-lg lg:text-2xl font-medium !leading-tight text-center text-white mb-5"
                    onClick={() => handleLoginSubmitOtp()}
                  >
                    SUBMIT
                  </button>
                  <button
                    className="sm:text-sm lg:text-xl !leading-none text-[3666464]"
                    onClick={resendOtp1}
                    disabled={timer > 0}
                  >
                    <span className="font-medium text-[#666464] underline">
                      {isOtpExpired ? "Resend OTP" : "Resend OTP"}
                    </span>
                    <span className="font-medium">
                      {timer > 0 && ` in ${timer}s`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {showB2BLogin && (
            <div className="w-screen max-w-[300px] lg:max-w-[450px] h-full bg-white absolute top-0 right-0 p-3 lg:p-5 xl:px-11 xl:pb-14 xl:pt-14">
              <div className="bag-header text-center h-full grid justify-center items-center">
                <button
                  className="absolute top-5 left-5 xl:left-[34px] xl:top-[34px]"
                  onClick={() => setShowB2BLogin(false)}
                >
                  <FaAngleLeft className="w-8 h-8 md:h-10 md:w-10 bg-[#9B9B9B] rounded-full text-white text-base p-1.5 md:p-2.5" />
                </button>

                <div className="mb-5 md:mb-5 xl:mb-10">
                  <div className="mb-8">
                    <img src={b2bhomeloginImg} alt="" loading="lazy" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-medium !leading-none mb-3.5 lg:mb-[30px] mt-3.5">
                    Signin/Signup
                  </h4>
                  <form onSubmit={handleb2bLogin}>
                    <div className="w-full mb-2">
                      <input
                        type="text"
                        name="b2b_username"
                        value={formData.b2b_username}
                        onChange={handleb2bInputChange}
                        placeholder="Enter Email id"
                        className="h-10 sm:h-10 xl:h-10 2xl:h-15 w-full border border-[#CDCDCD] sm:!text-sm !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-2 text-black mb-2"
                      />
                      <p className="text-red-500 text-start mb-2">
                        {errorMessage.b2b_username && (
                          <p>{errorMessage.b2b_username}</p>
                        )}
                      </p>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="b2b_password"
                          value={formData.b2b_password}
                          onChange={handleb2bInputChange}
                          placeholder="Password"
                          className="h-10 sm:h-10 xl:h-10 2xl:h-15 w-full border border-[#CDCDCD] sm:!text-sm !leading-none font-jost bg-[#F5F5F5] px-4 py-3 xl:p-2 text-black mb-2"
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute bottom-5 right-3 flex items-center cursor-pointer"
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                      <p className="text-red-500 text-start">
                        {errorMessage.b2b_password && (
                          <p>{errorMessage.b2b_password}</p>
                        )}
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#E9B159] p-2 sm:text-lg lg:text-xl font-medium !leading-tight text-center text-white mb-3"
                    >
                      LOGIN
                    </button>
                    <button
                      type="button"
                      className="w-full border-2 border-black bg-[#FFFFFF] p-2 lg:p-2 sm:text-lg lg:text-xl font-medium !leading-tight text-center text-black mb-5"
                      onClick={() => setShowCreateAccount(true)}
                    >
                      Create Account
                    </button>
                  </form>
                  <button
                    className="flex items-center gap-3 mx-auto text-lg lg:text-xl font-medium leading-10 text-center text-black"
                    onClick={() => setShowB2BLogin(false)}
                  >
                    Login With B2C <FaArrowRightLong />
                  </button>

                  <p className="sm:text-md !leading-tight text-start text-black md:pt-[0px] md:px-[20px] pb-5 xl:pb-10 mt-3">
                    By signing up you agree to our
                    <Link
                      to="/term-and-condition"
                      className="text-[#E9B159] ms-1"
                      onClick={() => {
                        reset();
                        setShowLogin(false);
                      }}
                    >
                      Terms of Service
                    </Link>
                    <span> & </span>
                    <Link
                      to="/privancypolicy"
                      className="text-[#E9B159]"
                      onClick={() => {
                        reset();
                        setShowLogin(false);
                      }}
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}

          {showCreateAccount && (
            <div className="w-screen max-w-[300px] lg:max-w-[450px] h-full bg-white absolute top-0 right-0 xl:pt-5">
              <div className="bag-header text-center h-full grid items-center">
                <div>
                  <div className="flex justify-between items-center px-5">
                    <div className="text-xl xl:text-[28px] font-bold">
                      Create Account
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => setShowCreateAccount(false)}
                    >
                      <MdClose size={30} />
                    </div>
                  </div>
                  <div className="bg-[#F5F5F5] w-[100%]  p-5 mt-5">
                    <Stepper activeStep={activeStep - 1} alternativeLabel>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </div>
                </div>
                <div className="bag-header text-center p-3 lg:p-5">
                  <div sx={{ mt: 2, mb: 1 }}>
                    {renderStepContent(activeStep)}
                  </div>
                  <div sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 1}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <div sx={{ flex: "1 1 auto" }} />
                    <button
                      className="w-full bg-[#E9B159] p-2 lg:p-2 sm:text-lg lg:text-xl font-medium !leading-tight text-center text-white mb-5"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1
                        ? "CONTINUE"
                        : "CONTINUE"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Drawer>
      <Modal open={openWithdraw} onClose={handleWithdrawClose}>
        <Box>
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center p-4 xl:p-0">
            <div className="max-w-[1000px] w-full bg-white p-[20px] py-5 pl-4 sm:pl-9 lg:pl-[25px] pe-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg xs:text-xl md:text-2xl xl:text-3xl !leading-[134%] font-normal text-black mb-3 md:mb-4">
                  Notification
                </h3>
                <button
                  className="text-black text-3xl p-3"
                  onClick={handleWithdrawClose}
                >
                  <MdOutlineClose />
                </button>
              </div>
              <div className="max-h-[500px] sm:max-h-[500px] overflow-y-auto pr-3 md:pr-9">
                <Notification customClass="hidden" />
                <Notification customClass="hidden" />
                <Notification customClass="hidden" />
                <Notification />
                <Notification />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Header;

const CustomFacebookButton = ({ onClick }) => {
  return (
    <div onClick={onClick} className="p-5 bg-[white] rounded cursor-pointer">
      <img className="w-[30px]" src={facebookImg} />
    </div>
  );
};
