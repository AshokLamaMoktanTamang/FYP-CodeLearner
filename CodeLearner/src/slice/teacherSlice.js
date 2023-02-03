import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../services/httpService'

const initialState = {
  teacher: null,
  teacherInfo: null,
}

export const addTeacherInfo = createAsyncThunk('teacher/info', async (teacherData) => {
  const { data } = await httpService.post('/teacher/v1/info', teacherData)

  return data
})

export const fetchTeacherInfo = createAsyncThunk('teacher/info', async () => {
  const { data } = await httpService.get('/teacher/v1/info')

  return data
})

export const teacherSlice = createSlice({
  name: 'Teacher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeacherInfo.fulfilled, (state, action) => {
      state.teacherInfo = action.payload
    })
  },
})

export default teacherSlice.reducer
