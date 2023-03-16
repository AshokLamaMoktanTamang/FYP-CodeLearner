import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../services/httpService'

const initialState = {
  teacher: null,
  teacherInfo: null,
  teacherInfos: [],
}

export const addTeacherInfo = createAsyncThunk('teacher/info', async (teacherData) => {
  const { data } = await httpService.post('/teacher/v1/info', teacherData)

  return data
})

export const fetchTeacherInfo = createAsyncThunk('teacher/info', async () => {
  const { data } = await httpService.get('/teacher/v1/info')

  return data
})

export const fetchTeacherInfoById = createAsyncThunk('teacher/info/id', async (id) => {
  const { data } = await httpService.get(`/teacher/v1/info/user/${id}`)

  return data
})

export const fetchAllTeacherInfo = createAsyncThunk('teacher/info/all', async () => {
  const { data } = await httpService.get('/teacher/v1/info/all')

  return data
})

export const rejectApplication = createAsyncThunk('teacher/info/reject', async ({ id, message }) => {
  const { data } = await httpService.post(`/teacher/v1/info/reject/${id}`, {
    message,
  })

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
    builder.addCase(fetchTeacherInfoById.fulfilled, (state, action) => {
      state.teacherInfo = action.payload
    })
    builder.addCase(fetchAllTeacherInfo.fulfilled, (state, action) => {
      state.teacherInfos = action.payload
    })
  },
})

export default teacherSlice.reducer
