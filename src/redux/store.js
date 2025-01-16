import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homepage/homeSlice';
import wishlistReducer from './wishlist/wishlistSlice';
import cartReducer from "./cart/cartSlice";
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

export default store;