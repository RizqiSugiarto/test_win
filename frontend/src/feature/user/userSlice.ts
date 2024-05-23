import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUser, updateUser, getByIdUser} from './userApi';
import { IUser } from '../../models/users';

interface UserState {
    users: IUser[];
    selectedUser: IUser | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    selectedUser: null,
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearSelectedUser(state) {
            // Menghapus pengguna yang dipilih
            state.selectedUser = null;
        },
    },
    extraReducers: (builder) => {
        // Penanganan createUser
        builder.addCase(createUser.pending, (state) => {
            // Menandai sedang memuat saat membuat pengguna baru
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(createUser.fulfilled, (state, action: PayloadAction<IUser>) => {
            // Penanganan berhasil membuat pengguna baru
            state.isLoading = false;
            state.users.push(action.payload);
        });
        builder.addCase(createUser.rejected, (state, action) => {
            // Penanganan gagal membuat pengguna baru
            state.isLoading = false;
            state.error = action.error.message || 'Gagal membuat pengguna';
        });

        // Penanganan updateUser
        builder.addCase(updateUser.pending, (state) => {
            // Menandai sedang memuat saat memperbarui pengguna
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
            // Penanganan berhasil memperbarui pengguna
            state.isLoading = false;
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            // Penanganan gagal memperbarui pengguna
            state.isLoading = false;
            state.error = action.error.message || 'Gagal memperbarui pengguna';
        });

        // Penanganan getByIdUser
        builder.addCase(getByIdUser.pending, (state) => {
            // Menandai sedang memuat saat mengambil pengguna berdasarkan ID
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getByIdUser.fulfilled, (state, action: PayloadAction<IUser>) => {
            // Penanganan berhasil mendapatkan pengguna berdasarkan ID
            state.isLoading = false;
            state.selectedUser = action.payload;
        });
        builder.addCase(getByIdUser.rejected, (state, action) => {
            // Penanganan gagal mendapatkan pengguna berdasarkan ID
            state.isLoading = false;
            state.error = action.error.message || 'Gagal mengambil pengguna';
        });
    },
});

export const { clearSelectedUser } = userSlice.actions;

export default userSlice.reducer;
