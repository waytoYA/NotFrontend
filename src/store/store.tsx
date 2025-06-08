import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '@/store/slices/basketSlice';
import userReducer from '@/store/slices/userSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    user: userReducer
  },
});
