import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import { IUser } from '../../models/users';
import Cookies from 'js-cookie';

// Tindakan asinkron untuk membuat pengguna baru
export const createUser = createAsyncThunk('users/create', async (userData: IUser) => {
    try {
        // Kirim permintaan POST untuk membuat pengguna baru
        const response = await API.post('users', userData);
        return response.data; // Kembalikan data respons dari server
    } catch (error) {
        console.log(error); // Tangani kesalahan jika ada
    }
});

// Tindakan asinkron untuk memperbarui pengguna
export const updateUser = createAsyncThunk('users/update', async (userData: IUser) => {
    try {
        const token = Cookies.get("accessToken"); // Dapatkan token akses dari kuki
        // Kirim permintaan PUT untuk memperbarui pengguna dengan token otorisasi di header
        const response = await API.put(`users/${userData.id}`, userData, { headers: { Authorization: `Bearer ${token}` } });
        return response.data; // Kembalikan data respons dari server
    } catch (error) {
        console.log(error); // Tangani kesalahan jika ada
    }
});

// Tindakan asinkron untuk mendapatkan pengguna berdasarkan ID
export const getByIdUser = createAsyncThunk('users/getById', async (userId: string) => {
    try {
        const token = Cookies.get("accessToken"); // Dapatkan token akses dari kuki
        // Kirim permintaan GET untuk mendapatkan pengguna berdasarkan ID dengan token otorisasi di header
        const response = await API.get(`users/${userId}`, { headers: { "Authorization": `Bearer ${token}` } });
        return response.data; // Kembalikan data respons dari server
    } catch (error) {
        console.log(error); // Tangani kesalahan jika ada
    }
});

// Tindakan asinkron untuk menghapus pengguna berdasarkan ID
export const deleteUser = createAsyncThunk('users/delete', async (userId: string) => {
    try {
        // Kirim permintaan DELETE untuk menghapus pengguna berdasarkan ID
        const response = await API.delete(`users/${userId}`);
        return response.data; // Kembalikan data respons dari server
    } catch (error) {
        console.log(error); // Tangani kesalahan jika ada
    }
});
