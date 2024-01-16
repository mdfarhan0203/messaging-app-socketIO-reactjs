import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlicer'
export const store = configureStore({
  reducer: {
    userData:userSlice
  },
})