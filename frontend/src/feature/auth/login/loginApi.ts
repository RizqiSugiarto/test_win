import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../../API'
import { IAuth } from '../../../models/auth'

export const login = createAsyncThunk('users/login', async (auth: IAuth) => {
    try {
        console.log("KEHIT KOKKK")
        const response = await API.post('users/login', auth, {withCredentials: true})
        console.log(response, "LOGINAPI")
        return response.data
    } catch (error) {
        console.log(error)
    }
})
