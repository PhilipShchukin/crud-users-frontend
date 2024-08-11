
import { configureStore } from '@reduxjs/toolkit'

import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";


import user from './slices/usersSlice'


const store = configureStore({
  reducer: {
    user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),
  
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store 
