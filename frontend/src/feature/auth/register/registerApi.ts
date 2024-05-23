import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../../API';
import { NewUSer } from '../../../models/users'; // Correct the import if necessary

export const createUser = createAsyncThunk<NewUSer, NewUSer, { rejectValue: string }>(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.post('users', userData);
      return response.data;
    } catch (err) {
      let errorMessage = 'Failed to create user';
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || err.response.data || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
