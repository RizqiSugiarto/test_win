import { createSlice } from '@reduxjs/toolkit'
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getByIdProduct,
} from './productApi'

// Definisikan state awal untuk slice produk
const initialState = {
    list: {
        isLoading: false, // Indikator apakah sedang memuat daftar produk
        status: '', // Status dari pengambilan daftar produk
        values: [], // Daftar produk
    },
    save: {
        isSaving: false, // Indikator apakah sedang menyimpan produk baru
        isDeleting: false, // Indikator apakah sedang menghapus produk
        success: false, // Indikator apakah operasi penyimpanan berhasil
    },
}

// Membuat slice produk menggunakan createSlice
export const productSlice = createSlice({
    name: 'product', // Nama slice
    initialState, // State awal
    reducers: {
        clearSuccessMessage: (state, action) => {
            // Aksi untuk membersihkan pesan keberhasilan
            state.save.success = false // Mengatur success ke false untuk menghilangkan pesan
        },
    },
    extraReducers: (builder) => {
        // Menambahkan penanganan tambahan berdasarkan aksi async
        builder
            .addCase(getAllProduct.pending, (state) => {
                // Menangani permintaan pengambilan daftar produk yang sedang berlangsung
                state.list.isLoading = true // Set isLoading ke true
                state.list.status = '' // Bersihkan status
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                // Menangani permintaan pengambilan daftar produk berhasil
                state.list.isLoading = false // Set isLoading ke false karena pengambilan selesai
                state.list.status = 'success' // Set status ke success
                state.list.values = action.payload // Set daftar produk dengan data yang diterima dari respons
            })
            .addCase(getAllProduct.rejected, (state) => {
                // Menangani permintaan pengambilan daftar produk gagal
                state.list.isLoading = false // Set isLoading ke false karena pengambilan gagal
                state.list.status = 'failed' // Set status ke failed
            })
            .addCase(createProduct.pending, (state) => {
                // Menangani permintaan pembuatan produk baru yang sedang berlangsung
                state.save.isSaving = true // Set isSaving ke true
            })
            .addCase(createProduct.fulfilled, (state) => {
                // Menangani permintaan pembuatan produk baru berhasil
                state.save.isSaving = false // Set isSaving ke false karena penyimpanan selesai
                state.save.success = true // Set success ke true karena penyimpanan berhasil
            })
            .addCase(createProduct.rejected, (state) => {
                // Menangani permintaan pembuatan produk baru gagal
                state.save.isSaving = false // Set isSaving ke false karena penyimpanan gagal
            })
            .addCase(updateProduct.pending, (state) => {
                // Menangani permintaan pembaruan produk yang sedang berlangsung
                state.save.isSaving = true // Set isSaving ke true
            })
            .addCase(updateProduct.fulfilled, (state) => {
                // Menangani permintaan pembaruan produk berhasil
                state.save.isSaving = false // Set isSaving ke false karena pembaruan selesai
                state.save.success = true // Set success ke true karena pembaruan berhasil
            })
            .addCase(updateProduct.rejected, (state) => {
                // Menangani permintaan pembaruan produk gagal
                state.save.isSaving = false // Set isSaving ke false karena pembaruan gagal
            })
            .addCase(deleteProduct.pending, (state) => {
                // Menangani permintaan penghapusan produk yang sedang berlangsung
                state.save.isDeleting = true // Set isDeleting ke true
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                // Menangani permintaan penghapusan produk berhasil
                state.save.isDeleting = false // Set isDeleting ke false karena penghapusan selesai
                state.save.success = true // Set success ke true karena penghapusan berhasil
            })
            .addCase(deleteProduct.rejected, (state) => {
                // Menangani permintaan penghapusan produk gagal
                state.save.isDeleting = false // Set isDeleting ke false karena penghapusan gagal
            })
    },
})

// Ekspor reducer dari slice produk
export default productSlice.reducer
