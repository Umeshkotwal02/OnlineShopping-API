import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Constant/constApi';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,
  user: null,
  otpSent: false,
  otpVerified: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.otpSent = false;
      state.otpVerified = false;
      localStorage.removeItem('ISLOGIN');
      localStorage.removeItem('USERDETAIL');
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOtpSent: (state, action) => {
      state.otpSent = action.payload;
    },
    setOtpVerified: (state, action) => {
      state.otpVerified = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  logout,
  setLoading,
  setOtpSent,
  setOtpVerified,
  setError,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
