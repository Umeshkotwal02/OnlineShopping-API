import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartInfo: [],
  cartIcons: [],
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartInfo(state, action) {
      state.cartInfo = action.payload;
    },
    setCartIcons(state, action) {
      state.cartIcons = action.payload;
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setCartInfo,
  setCartIcons,
  setCartItems,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;