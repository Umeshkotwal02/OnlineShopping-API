import axios from 'axios';
import { API_URL } from '../../constants/constApi';
import { STORAGE } from '../../config/config';
import toast from 'react-hot-toast';
import { loginStart, loginSuccess, loginFailure, otpSent, otpVerified } from './authSlice';
import { fetchCartItems } from '../cart/cartThunk';
import { fetchWishlistItem } from '../wishlist/wishlistThunk';
import { fetchUserDetails } from '../user/userThunk.js';

const googleLogin = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${API_URL}sendotp`, userData);
    const data = response.data;
    if (data && data.STATUS === 200) {
      toast.success(data.MESSAGE);
      dispatch(loginSuccess(data.DATA));
      dispatch(fetchCartItems());
      dispatch(fetchWishlistItem());
      dispatch(fetchUserDetails());
      localStorage.setItem(STORAGE?.ISLOGIN, 1);
      localStorage.setItem(STORAGE?.USERDETAIL, JSON.stringify(data.DATA));
      console.log("Google login success", data);
      console.log("userData", data);
    } else {
      dispatch(loginFailure(data.MESSAGE));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
    if (error.response) {
      // Errors from the API
      console.error("Error response from API: ", error.response.data);
    } else if (error.request) {
      // No response received
      toast.error(error.request);
      console.error("No response from API: ", error.request);
    } else {
      // Other errors
      toast.error(error.request);
      console.error("Error during sign-in with Google: ", error.request);
    }
    toast.error("An error occurred during login. Please try again.");
  }
};

const sendOtp = (mobileNumber) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${API_URL}userlogin`, {
      device_id: localStorage.getItem(STORAGE?.DEVICEID),
      user_mobile: mobileNumber,
      is_mobile: '0',
      type: STORAGE?.MOBILE,
      is_admin: "0",
      user_type: STORAGE?.B2C,
    });
    const data = response.data;
    if (data && data.STATUS === 200) {
      dispatch(otpSent());
      localStorage.setItem(STORAGE?.ISLOGIN, 1);
      localStorage.setItem(STORAGE?.USERDETAIL, JSON.stringify(data.DATA));
      console.log("Login Otp is", data?.OTP);
      toast.success(data?.MESSAGE || "OTP send.");
      return { success: true, error: data.MESSAGE };// Indicate success
    } else {
      dispatch(loginFailure(data.MESSAGE));
      return { success: false, error: data.MESSAGE }; // Indicate failure
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { success: false, error: error.message }; // Indicate failure
  }
};

const verifyOtp = (otp, mobileNumber, referralCode) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${API_URL}loginotpvarify`, {
      device_id: localStorage.getItem(STORAGE?.DEVICEID),
      otp: otp,
      is_mobile: "0",
      user_mobile: mobileNumber,
      user_otp: otp,
      code: referralCode || "",
    });
    const data = response.data;
    if (data && data.STATUS === 200) {
      toast.success(data?.MESSAGE || "OTP verified.");
      dispatch(otpVerified());
      // dispatch(fetchCartItems());
      // dispatch(fetchWishlistItem());
      dispatch(fetchUserDetails());
      dispatch(loginSuccess(data.DATA));
      localStorage.setItem(STORAGE?.ISLOGIN, 1);
      localStorage.setItem(STORAGE?.USERDETAIL, JSON.stringify(data.DATA));
      return { success: true, error: data.MESSAGE };// Indicate success
    } else {
      dispatch(loginFailure(data.MESSAGE));
      return { success: false, error: data.MESSAGE }; // Indicate success
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export { googleLogin, sendOtp, verifyOtp }