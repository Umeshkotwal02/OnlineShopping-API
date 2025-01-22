import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
  wishlistCount: 0,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setWishlist(state, action) {
      state.wishlist = action.payload;
      state.wishlistCount = action.payload.length;
    },
    resetWishlistCount: (state) => {
      state.wishlistCount = 0;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLoggedIn, setWishlist, setLoading, setError,resetWishlistCount } = wishlistSlice.actions;
export default wishlistSlice.reducer;
