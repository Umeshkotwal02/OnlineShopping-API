import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    fetchHomeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchHomeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchHomeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchHomeStart, fetchHomeSuccess, fetchHomeFailure } = homeSlice.actions;
export default homeSlice.reducer;
