import { createSlice } from '@reduxjs/toolkit';
import { sendOtpThunk, verifyOtpThunk, googleLoginThunk } from './authThunks';

const initialState = {
  mobileNumber: '',
  otp: ['', '', '', '', '', ''],
  isOtpVerified: false,
  otpCanvasVisible: false,
  error: null,
  resendTimer: 59,
  isCounting: false,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMobileNumber(state, action) {
      state.mobileNumber = action.payload;
    },
    setOtp(state, action) {
      state.otp = action.payload;
    },
    toggleOtpCanvas(state, action) {
      state.otpCanvasVisible = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetAuthState(state) {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(sendOtpThunk.fulfilled, (state, action) => {
        state.otpCanvasVisible = true;
        state.error = null;
        state.isCounting = true;
      })
      .addCase(sendOtpThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Verify OTP
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.isOtpVerified = true;
        state.success = true;
        state.otpCanvasVisible = false;
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Google Login
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setMobileNumber, setOtp, toggleOtpCanvas, setError, resetAuthState } =
  authSlice.actions;

export default authSlice.reducer;
