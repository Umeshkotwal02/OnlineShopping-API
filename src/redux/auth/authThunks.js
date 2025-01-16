import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Constant/constApi';

// Send OTP
export const sendOtpThunk = createAsyncThunk(
  'auth/sendOtp',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}userlogin`, payload);
      if (response.data.STATUS !== 200) {
        throw new Error(response.data.MESSAGE || 'Failed to send OTP.');
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Verify OTP
export const verifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}verifyotp`, payload);
      if (response.data.STATUS !== 200) {
        throw new Error(response.data.MESSAGE || 'OTP verification failed.');
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Google Login
export const googleLoginThunk = createAsyncThunk(
  'auth/googleLogin',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}sendotp`, payload);
      if (response.data.STATUS !== 200) {
        throw new Error(response.data.MESSAGE || 'Google login failed.');
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
