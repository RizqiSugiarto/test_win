import { createSlice } from '@reduxjs/toolkit'
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getByIdProduct,
} from './productApi'

const initialState = {
    list: {
        isLoading: false,
        status: '',
        values: [],
    },
    save: {
        isSaving: false,
        isDeleting: false,
        success: false,
    },
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearSuccessMessage: (state, action) => {
            state.save.success = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.list.isLoading = true
                state.list.status = ''
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.list.isLoading = false
                state.list.status = 'success'
                state.list.values = action.payload
            })
            .addCase(getAllProduct.rejected, (state) => {
                state.list.isLoading = false
                state.list.status = 'failed'
            })
            .addCase(createProduct.pending, (state) => {
                state.save.isSaving = true
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.save.isSaving = false
            })
            .addCase(createProduct.rejected, (state) => {
                state.save.isSaving = false
            })
            .addCase(updateProduct.pending, (state) => {
                state.save.isSaving = true
            })
            .addCase(updateProduct.fulfilled, (state) => {
                state.save.isSaving = false
            })
            .addCase(updateProduct.rejected, (state) => {
                state.save.isSaving = false
            })
            .addCase(deleteProduct.pending, (state) => {
                state.save.isDeleting = true
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.save.isDeleting = false
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.save.isDeleting = false
            })
    },
})

export default productSlice.reducer
