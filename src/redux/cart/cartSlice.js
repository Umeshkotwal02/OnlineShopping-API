import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartInfo: [],
  cartIcons: [],
  cartItems: [],
  cartCount: 0,
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
      state.cartItems = Array.isArray(action.payload) ? action.payload : [];
      state.cartCount = state.cartItems.length;
    },    
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    updateCartItem: (state, action) => {
      const { cartChildId, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item.cart_child_id === cartChildId);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = quantity;
      }
    },
    removeCartItem: (state, action) => {
      const cartChildId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.cart_child_id !== cartChildId);
    }
  },
});

export const {
  setCartInfo,
  setCartIcons,
  setCartItems,
  setLoading,
  setError,
  updateCartItem,
  removeCartItem
} = cartSlice.actions;

export default cartSlice.reducer;
