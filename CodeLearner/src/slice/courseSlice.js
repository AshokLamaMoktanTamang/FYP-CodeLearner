import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../services/httpService'
import adminhttpService from '../services/adminHttpService'

const initialState = {
  courses: [],
  purchasedCourses: [],
  bestSellerCourse: [],
  topRatedCourse: [],
  course: null,
  tenCourse: [],
  courseChartData: []
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
  const { data } = await adminhttpService.get(`/course/v1/pending/all`)

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

export const rateCourse = createAsyncThunk('/course/rate', async ({ courseId, rating }) => {
  const { data } = await httpService.post(`course/v1/rate/${courseId}`, {
    rating
  })

  return data
})

export const fetchBestSellerCourse = createAsyncThunk('/course/bestseller', async () => {
  const { data } = await httpService.get(`course/v1/course/bestseller`)

  return data
})

export const fetchTopRatedCourse = createAsyncThunk('/course/topRated', async () => {
  const { data } = await httpService.get(`course/v1/course/topRated`)

  return data
})

export const fetchCourseBarData = createAsyncThunk('/course/graph', async () => {
  const { data } = await httpService.get(`course/v1//course/graph`)

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
      state.purchasedCourses = action.payload.courses
    })
    builder.addCase(fetchBestSellerCourse.fulfilled, (state, action) => {
      state.bestSellerCourse = action.payload.courses
    })
    builder.addCase(fetchTopRatedCourse.fulfilled, (state, action) => {
      state.topRatedCourse = action.payload.courses
    })
    builder.addCase(fetchCourseBarData.fulfilled, (state, action) => {
      state.courseChartData = action.payload.courseDatas
    })
  },
})

export default courseSlice.reducer
