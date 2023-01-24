import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../services/httpService'

const initialState = {
  user: null,
}

export const fetchUser = createAsyncThunk('user', async () => {
  const { data } = await httpService.get('/user/v1')

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
