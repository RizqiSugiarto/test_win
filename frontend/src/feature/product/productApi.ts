import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';
import { IProduct, NewProduct } from '../../models/product';
import Cookies from 'js-cookie';

export const createProduct = createAsyncThunk(
    'product/create',
    async (product: NewProduct) => {
        try {
            const response = await API.post('products', product);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
);

export const updateProduct = createAsyncThunk(
    'product/update',
    async (product: IProduct) => {
        console.log(product, "KOSONG BEB")
        try {
            const response = await API.put(`products/${product.id}`, product);
            return response.data;
        } catch (error) {
            console.log("KENA DISINI")
            console.log(error);
        }
    },
);

export const getAllProduct = createAsyncThunk(
    'product/getAll',
    async () => {
        try {
            console.log("KENA BOOY")
            const token = Cookies.get("accessToken")
            const response = await API.get('products', {headers: {"Authorization": `Bearer ${token}`}})
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
);

export const getByIdProduct = createAsyncThunk(
    'product/getById',
    async (productId: string) => {
        try {
            const response = await API.get(`products/${productId}`); // Add a forward slash between 'products' and productId
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
);

export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (productId: string) => {
        try {
            const response = await API.delete(`products/${productId}`); // Add a forward slash between 'products' and productId
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
);
