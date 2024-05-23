import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createUser, updateUser, getByIdUser, deleteUser } from './userApi'
import { IUser } from '../../models/users'

interface UserState {
    users: IUser[]
    selectedUser: IUser | null
    isLoading: boolean
    error: string | null
}

const initialState: UserState = {
    users: [],
    selectedUser: null,
    isLoading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearSelectedUser(state) {
            state.selectedUser = null
        },
    },
    extraReducers: (builder) => {
        // Handle createUser
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(
            createUser.fulfilled,
            (state, action: PayloadAction<IUser>) => {
                state.isLoading = false
                state.users.push(action.payload)
            },
        )
        builder.addCase(createUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || 'Failed to create user'
        })

        // Handle updateUser
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(
            updateUser.fulfilled,
            (state, action: PayloadAction<IUser>) => {
                state.isLoading = false
                const index = state.users.findIndex(
                    (user) => user.id === action.payload.id,
                )
                if (index !== -1) {
                    state.users[index] = action.payload
                }
            },
        )
        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || 'Failed to update user'
        })

        // Handle getByIdUser
        builder.addCase(getByIdUser.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(
            getByIdUser.fulfilled,
            (state, action: PayloadAction<IUser>) => {
                state.isLoading = false
                state.selectedUser = action.payload
            },
        )
        builder.addCase(getByIdUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || 'Failed to fetch user'
        })

        // Handle deleteUser
        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(
            deleteUser.fulfilled,
            (state, action: PayloadAction<string>) => {
                state.isLoading = false
                state.users = state.users.filter(
                    (user) => user.id !== action.payload,
                )
            },
        )
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || 'Failed to delete user'
        })
    },
})

export const { clearSelectedUser } = userSlice.actions

export default userSlice.reducer
