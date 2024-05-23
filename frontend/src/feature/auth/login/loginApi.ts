import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../API';
import { IAuth } from '../../../models/auth';

export const login = createAsyncThunk('users/login', async (auth: IAuth) => {
    try {
        const response = await API.post('users/login', auth, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
});
