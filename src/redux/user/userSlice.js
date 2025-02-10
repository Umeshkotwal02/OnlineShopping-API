// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: {
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    user_mobile: "",
    user_profile: "",
    is_affiliate: "",
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserDetails, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;