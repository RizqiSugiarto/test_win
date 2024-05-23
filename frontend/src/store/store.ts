import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import productSlice from '../feature/product/productSlice';
import userSlice from '../feature/user/userSlice';

// Konfigurasi toko Redux
export const store = configureStore({
    reducer: {
        product: productSlice,
        users: userSlice
    },
});

// Jenis dispatch aplikasi
export type AppDispatch = typeof store.dispatch;

// Hook untuk menggunakan dispatch aplikasi
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Jenis state root aplikasi
export type RootState = ReturnType<typeof store.getState>;
