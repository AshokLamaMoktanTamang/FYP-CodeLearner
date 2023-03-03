import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../services/adminHttpService'

const initialState = {
  admin: {},
}

export const fetchAdmin = createAsyncThunk('fetch/admin', async () => {
  const { data } = await httpService.get('/admin/v1')

  return data
})

export const updatePassword = createAsyncThunk('update/admin', async ({ currentPassword, password }) => {
  const { data } = await httpService.put('/admin/v1', { currentPassword, password })

  return data
})

export const adminSlice = createSlice({
  name: 'Admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdmin.fulfilled, (state, action) => {
      state.admin = action.payload
    })
  },
})

export default adminSlice.reducer
