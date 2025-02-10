import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homepage/homeSlice';
import wishlistReducer from './wishlist/wishlistSlice';
import cartReducer from "./cart/cartSlice";
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;