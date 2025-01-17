// src/redux/authThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '../../Constant/constApi';
import { STORAGE } from '../../config/config';

// Send OTP Thunk
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}userlogin`, {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        user_mobile: payload.mobileNumber,
        is_mobile: '0',
        ...payload,
        type: STORAGE?.MOBILE,
        is_admin: "0",
        user_type: STORAGE?.B2C,
      });

      if (data && data?.STATUS === 200) {
        toast.success(data?.MESSAGE || "OTP sent.");
        return data;
      } else {
        return rejectWithValue(data?.MESSAGE || 'Failed to send OTP.');
      }
    } catch (error) {
      return rejectWithValue('An error occurred while sending OTP.');
    }
  }
);

// Verify OTP Thunk
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ otp, mobileNumber, referralCode }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}verifyotp`, {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        otp,
        is_mobile: "0",
        user_mobile: mobileNumber,
        user_otp: otp,
        code: referralCode || "",
      });

      if (data && data.STATUS === 200) {
        toast.success(data?.MESSAGE || "OTP verified.");
        localStorage.setItem(STORAGE?.ISLOGIN, 1);
        localStorage.setItem(STORAGE?.USERDETAIL, JSON.stringify(data?.DATA));
        return data;
      } else {
        return rejectWithValue(data.MESSAGE || "OTP verification failed.");
      }
    } catch (error) {
      return rejectWithValue("An error occurred during OTP verification.");
    }
  }
);

// Google Login Thunk
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}sendotp`, userData);
      const data = response.data;

      if (data && data.STATUS === 200) {
        toast.success(data.MESSAGE);
        localStorage.setItem(STORAGE?.ISLOGIN, 1);
        localStorage.setItem(STORAGE?.USERDETAIL, JSON.stringify(data.DATA));
        return data;
      } else {
        return rejectWithValue(data.MESSAGE || "Google login failed.");
      }
    } catch (error) {
      return rejectWithValue("An error occurred during Google login.");
    }
  }
);
