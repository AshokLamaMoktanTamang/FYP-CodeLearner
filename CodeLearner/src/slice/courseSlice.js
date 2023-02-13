import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../services/httpService'

const initialState = {
  courses: [],
  course: null,
}

export const addCourse = createAsyncThunk('add/course', async (courseData) => {
  const { data } = await httpService.post('/course/v1', courseData)

  return data
})

export const fetchCoursesByToken = createAsyncThunk('fetch/course', async () => {
  const { data } = await httpService.get('/course/v1')

  return data
})

export const fetchCourseById = createAsyncThunk('fetch/course/id', async (courseId) => {
  const { data } = await httpService.get(`/course/v1/${courseId}`)

  return data
})

export const courseSlice = createSlice({
  name: 'Course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoursesByToken.fulfilled, (state, action) => {
      state.courses = action.payload
    })
    builder.addCase(fetchCourseById.fulfilled, (state, action) => {
      state.course = action.payload
    })
  },
})

export default courseSlice.reducer
