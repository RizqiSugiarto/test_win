import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../API'
import { IUser } from '../../models/users'
import Cookies from 'js-cookie'

export const createUser = createAsyncThunk('users/create', async (users: IUser) => {
    try {
        const response = await API.post('users', users)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateUser = createAsyncThunk('users/update', async (users: IUser) => {
    try {
        const token = Cookies.get("accessToken")
        const response = await API.put(`users/${users.id}`, users, {headers: {Authorization: `Bearer ${token}`}})
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getByIdUser = createAsyncThunk('users/getById', async (userId: string) => {
    try {
        const token = Cookies.get("accessToken")
        const response = await API.get(`users/${userId}`, {headers: {"Authorization": `Bearer ${token}`}})
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const deleteUser = createAsyncThunk('users/delete', async (userId: string) => {
    try {
        const response = await API.delete(`users${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})
