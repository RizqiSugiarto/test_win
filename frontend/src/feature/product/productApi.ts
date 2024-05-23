import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API'; // Import modul API yang digunakan untuk berkomunikasi dengan backend
import { IProduct, NewProduct } from '../../models/product'; // Import tipe data produk
import Cookies from 'js-cookie'; // Import modul Cookies untuk mengelola cookie

// Fungsi asynchronous untuk membuat produk baru
export const createProduct = createAsyncThunk(
    'product/create',
    async (product: NewProduct) => {
        try {
            const response = await API.post('products', product); // Mengirim permintaan POST ke endpoint 'products' dengan data produk
            return response.data; // Mengembalikan data produk yang dibuat dari respons server
        } catch (error) {
            console.log(error); // Menangani kesalahan jika ada
        }
    },
);

// Fungsi asynchronous untuk memperbarui produk
export const updateProduct = createAsyncThunk(
    'product/update',
    async (product: IProduct) => {
        try {
            const response = await API.put(`products/${product.id}`, product); // Mengirim permintaan PUT ke endpoint 'products/{id}' dengan data produk yang diperbarui
            return response.data; // Mengembalikan data produk yang diperbarui dari respons server
        } catch (error) {
            console.log(error); // Menangani kesalahan jika ada
        }
    },
);

// Fungsi asynchronous untuk mendapatkan semua produk
export const getAllProduct = createAsyncThunk(
    'product/getAll',
    async () => {
        try {
            const token = Cookies.get("accessToken"); // Mengambil token dari cookie
            const response = await API.get('products', {headers: {"Authorization": `Bearer ${token}`}}); // Mengirim permintaan GET ke endpoint 'products' dengan token otentikasi di header
            return response.data; // Mengembalikan daftar semua produk dari respons server
        } catch (error) {
            console.log(error); // Menangani kesalahan jika ada
        }
    },
);


// Fungsi asynchronous untuk menghapus produk berdasarkan ID
export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (productId: string) => {
        try {
            const response = await API.delete(`products/${productId}`); // Mengirim permintaan DELETE ke endpoint 'products/{id}' untuk menghapus produk berdasarkan ID
            return response.data; // Mengembalikan data produk yang dihapus dari respons server
        } catch (error) {
            console.log(error); // Menangani kesalahan jika ada
        }
    },
);
