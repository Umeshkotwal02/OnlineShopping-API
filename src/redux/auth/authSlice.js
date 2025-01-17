// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { sendOtp, verifyOtp, googleLogin } from './authThunk';

const initialState = {
  mobileNumber: '',
  otp: ['', '', '', '', '', ''],
  otpCanvas: false,
  error: '',
  resendTimer: 59,
  isOtpExpired: false,
  success: false,
  isCounting: false,
  touched: {
    mobileNumber: false,
    password: false
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAll: (state) => {
      state.mobileNumber = '';
      state.otpCanvas = false;
      state.otp = ['', '', '', '', '', ''];
      state.error = '';
      state.resendTimer = 59;
      state.touched = { mobileNumber: false, password: false };
      state.success = false;
    },
    setOtpCanvas: (state, action) => {
      state.otpCanvas = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    setResendTimer: (state, action) => {
      state.resendTimer = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.otpCanvas = true;
        state.resendTimer = 59;
        state.isCounting = true;
        state.error = '';
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.success = true;
        state.otpCanvas = false;
        state.otp = ['', '', '', '', '', ''];
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.success = true;
        state.otpCanvas = false;
        state.otp = ['', '', '', '', '', ''];
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  clearAll,
  setOtpCanvas,
  setError,
  setOtp,
  setMobileNumber,
  setResendTimer,
  setSuccess
} = authSlice.actions;

export default authSlice.reducer;
