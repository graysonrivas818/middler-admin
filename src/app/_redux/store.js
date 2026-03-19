import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/app/_redux/features/authSlice'
import navigationReducer from '@/app/_redux/features/navigationSlice'
import userReducer from '@/app/_redux/features/userSlice'

export const store = configureStore({
  reducer: {
    authReducer,
    navigationReducer,
    userReducer
  }
})