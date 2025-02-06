import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../constants/constApi';
import { STORAGE } from '../../config/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../components/firebase';
import toast from 'react-hot-toast';

export const loginWithGoogle = () => async (dispatch) => {
  dispatch({ type: 'auth/loginWithGoogle/pending' });

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const payload = {
      device_id: localStorage.getItem('deviceId') || 'default',
      user_email: user.email,
      user_name: user.displayName,
      type: STORAGE.GOOGLE,
      is_admin: '0',
      user_type: STORAGE.B2C,
    };

    console.log('Payload for Google login:', payload); // Debugging log

    const response = await axios.post(`${API_URL}sendotp`, payload);

    if (response.data.STATUS === 200) {
      localStorage.setItem(STORAGE.ISLOGIN, 1);
      localStorage.setItem(STORAGE.USERDETAIL, JSON.stringify(response.data.DATA));
      dispatch({ type: 'auth/loginWithGoogle/fulfilled', payload: response.data.DATA });
    } else {
      console.error('Error in Google login:', response.data.MESSAGE); // Debugging log
      dispatch({ type: 'auth/loginWithGoogle/rejected', error: response.data.MESSAGE });
    }
  } catch (error) {
    console.error('Error in Google login:', error.message); // Debugging log
    dispatch({ type: 'auth/loginWithGoogle/rejected', error: error.message });
  }
};



export const sendOtp = (mobileNumber) => async (dispatch) => {
  dispatch({ type: 'auth/sendOtp/pending' });

  try {
    const payload = {
      device_id: localStorage.getItem(STORAGE.DEVICEID),
      user_mobile: mobileNumber,
      is_mobile: '0',
      type: STORAGE.MOBILE,
      is_admin: '0',
      user_type: STORAGE.B2C,
    };

    console.log('Payload for sending OTP:', payload); // Debugging log

    const response = await axios.post(`${API_URL}userlogin`, payload);

    if (response.data.STATUS === 200) {
      dispatch({ type: 'auth/sendOtp/fulfilled', payload: response.data.OTP });
      console.log("Login Otp is", response.data?.OTP);
      toast.success(response?.data?.MESSAGE || "OTP send.");
    } else {
      console.error('Error in sending OTP:', response.data.MESSAGE); // Debugging log
      dispatch({ type: 'auth/sendOtp/rejected', error: response.data.MESSAGE });
    }
  } catch (error) {
    console.error('Error in sending OTP:', error.message); // Debugging log
    dispatch({ type: 'auth/sendOtp/rejected', error: error.message });
  }
};


export const verifyOtp = (mobileNumber, otp) => async (dispatch) => {
  dispatch({ type: 'auth/verifyOtp/pending' });

  try {
    const payload = {
      device_id: localStorage.getItem(STORAGE.DEVICEID),
      user_mobile: mobileNumber,
      user_otp: otp,
    };

    console.log('Payload for verifying OTP:', payload); // Debugging log

    const response = await axios.post(`${API_URL}verifyotp`, payload);

    if (response.data.STATUS === 200) {
      localStorage.setItem(STORAGE.ISLOGIN, 1);
      localStorage.setItem(STORAGE.USERDETAIL, JSON.stringify(response.data.DATA));
      dispatch({ type: 'auth/verifyOtp/fulfilled', payload: response.data.DATA });
    } else {
      console.error('Error in verifying OTP:', response.data.MESSAGE); // Debugging log
      dispatch({ type: 'auth/verifyOtp/rejected', error: response.data.MESSAGE });
    }
  } catch (error) {
    console.error('Error in verifying OTP:', error.message); // Debugging log
    dispatch({ type: 'auth/verifyOtp/rejected', error: error.message });
  }
};


