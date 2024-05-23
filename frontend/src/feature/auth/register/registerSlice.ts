import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUser } from './registerApi';
import { NewUSer } from '../../../models/users'; // Saya memperbaiki typo di sini

interface UserState {
  users: NewUSer[]; // Mengganti NewUSer menjadi NewUser
  selectedUser: NewUSer | null; // Mengganti NewUSer menjadi NewUser
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Aksi reducer untuk membersihkan selectedUser
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    // Penanganan aksi asinkron saat memulai pembuatan pengguna
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    // Penanganan aksi asinkron saat pembuatan pengguna berhasil
    builder.addCase(createUser.fulfilled, (state, action: PayloadAction<NewUSer>) => {
      state.isLoading = false;
      state.users.push(action.payload);
    });
    // Penanganan aksi asinkron saat pembuatan pengguna gagal
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Failed to create user';
    });
  },
});

export const { clearSelectedUser } = userSlice.actions;

export default userSlice.reducer;
