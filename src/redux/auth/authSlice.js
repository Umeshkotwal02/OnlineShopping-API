import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
  otpSent: false,
  otpVerified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    otpSent(state) {
      state.otpSent = true;
    },
    otpVerified(state) {
      state.otpVerified = true;
    },
    logout(state) {
      state.user = null;
      state.otpSent = false;
      state.otpVerified = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, otpSent, otpVerified, logout } = authSlice.actions;

export default authSlice.reducer;