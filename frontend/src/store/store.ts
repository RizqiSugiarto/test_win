import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import productSlice from '../feature/product/productSlice'
import userSlice from '../feature/user/userSlice'

export const store = configureStore({
    reducer: {
        product: productSlice,
        users: userSlice
    },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>
