import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../services/httpService'

const initialState = {
  user: null,
}

export const fetchUser = createAsyncThunk('user', async () => {
  const { data } = await httpService.get('/user/v1')

  return data
})

export const updateUserProfile = createAsyncThunk('user/update/profile', async (userData) => {
  const { data } = await httpService.put('/user/v1/profile', userData)

  return data
})

export const updateUserPassword = createAsyncThunk('user/update/password', async ({ currentPassword, password }) => {
  const { data } = await httpService.put('/user/v1/password', {
    currentPassword,
    password,
  })

  return data
})

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export default userSlice.reducer
