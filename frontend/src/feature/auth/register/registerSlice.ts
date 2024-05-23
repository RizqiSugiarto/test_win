import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUser } from './registerApi';
import { NewUSer } from '../../../models/users'; // Corrected the typo here

interface UserState {
  users: NewUSer[];
  selectedUser: NewUSer | null;
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
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action: PayloadAction<NewUSer>) => {
      state.isLoading = false;
      state.users.push(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Failed to create user';
    });
  },
});

export const { clearSelectedUser } = userSlice.actions;

export default userSlice.reducer;
