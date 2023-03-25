import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../services/httpService'

const initialState = {
  courses: [],
  course: null,
  tenCourse: [],
}

export const addCourse = createAsyncThunk('add/course', async (courseData) => {
  const { data } = await httpService.post('/course/v1', courseData)

  return data
})

export const fetchCoursesByToken = createAsyncThunk('fetch/course', async () => {
  const { data } = await httpService.get('/course/v1')

  return data
})

export const fetchCoursesByUser = createAsyncThunk('fetch/course/user', async ({ id }) => {
  const { data } = await httpService.get(`/course/v1/user/${id}`)

  return data
})

export const fetchApprovedCourseByUser = createAsyncThunk('fetch/course/approved/user', async ({ id }) => {
  const { data } = await httpService.get(`/course/v1/user/approved/${id}`)

  return data
})

export const fetchCourseById = createAsyncThunk('fetch/course/id', async (courseId) => {
  const { data } = await httpService.get(`/course/v1/${courseId}`)

  return data
})

export const updateCourseById = createAsyncThunk('update/course', async ({ courseId, courseData }) => {
  const { data } = await httpService.put(`/course/v1/${courseId}`, courseData)

  return data
})

export const DeleteCourse = createAsyncThunk('delete/:courseId', async (courseId) => {
  const { data } = await httpService.delete(`/course/v1/${courseId}`)

  return data
})

export const fetchTenCourse = createAsyncThunk('fetch/10', async () => {
  const { data } = await httpService.get(`/course/v1/latest/10`)

  return data
})

export const searchCourse = createAsyncThunk('search', async (query) => {
  const { data } = await httpService.get(`/course/v1/search/${query}`)

  return data
})

export const fetchPendingCourse = createAsyncThunk('course/pending', async (query) => {
  const { data } = await httpService.get(`/course/v1/pending/all`)

  return data
})

export const approveCourse = createAsyncThunk('/course/approved', async (courseId) => {
  const { data } = await httpService.post(`/course/v1/approve/${courseId}`)

  return data
})

export const rejectCourse = createAsyncThunk('/course/reject', async ({ courseId, message }) => {
  const { data } = await httpService.post(`/course/v1/reject/${courseId}`, {
    message
  })

  return data
})

export const purchaseCourse = createAsyncThunk('/course/purchase', async ({ courseId }) => {
  const { data } = await httpService.post(`/course/v1/purchase/${courseId}`)

  return data
})

export const checkPurchased = createAsyncThunk('/check/purchase', async ({ courseId }) => {
  const { data } = await httpService.post(`course/v1/checkPurchase/${courseId}`)

  return data
})

export const fetchMyCourse = createAsyncThunk('/course/fetch/purchase', async () => {
  const { data } = await httpService.get(`course/v1/get/purchase`)

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
    builder.addCase(fetchCoursesByUser.fulfilled, (state, action) => {
      state.courses = action.payload
    })
    builder.addCase(fetchApprovedCourseByUser.fulfilled, (state, action) => {
      state.courses = action.payload
    })
    builder.addCase(fetchTenCourse.fulfilled, (state, action) => {
      state.tenCourse = action.payload.courses
    })
    builder.addCase(searchCourse.fulfilled, (state, action) => {
      state.courses = action.payload.course
    })
    builder.addCase(fetchPendingCourse.fulfilled, (state, action) => {
      state.courses = action.payload.course
    })
    builder.addCase(fetchMyCourse.fulfilled, (state, action) => {
      state.courses = action.payload.courses
    })
  },
})

export default courseSlice.reducer
