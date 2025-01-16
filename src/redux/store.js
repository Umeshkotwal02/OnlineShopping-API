import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homepage/homeSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export default store;
