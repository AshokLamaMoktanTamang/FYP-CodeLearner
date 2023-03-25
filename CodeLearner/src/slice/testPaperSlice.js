import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../services/httpService'

const initialState = {
  testPaper: null,
}

export const addTestPaper = createAsyncThunk(
  'add/testPaper',
  async ({ courseId, formLabel, description, questions }) => {
    const { data } = await httpService.post(`/testPaper/v1/${courseId}`, {
      formLabel,
      description,
      questions,
    })

    return data
  },
)

export const fetchTestPaper = createAsyncThunk('fetch/testPaper', async (courseId) => {
  const { data } = await httpService.get(`/testPaper/v1/${courseId}`)

  return data
})

export const fetchTestPaperForStudent = createAsyncThunk('fetch/testPaper/student', async (courseId) => {
  const { data } = await httpService.get(`/testPaper/v1/student/${courseId}`)

  return data
})

export const deleteTestPaper = createAsyncThunk('delete/testPaper', async (courseId) => {
  const { data } = await httpService.delete(`/testPaper/v1/${courseId}`)

  return data
})

export const testPaperExistence = createAsyncThunk('exist/testpaper', async (courseId) => {
  const { data } = await httpService.get(`/testPaper/v1/exist/${courseId}`)
  
  return data
})

export const testPaperSlice = createSlice({
  name: 'TestPaper',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTestPaper.fulfilled, (state, action) => {
      state.testPaper = action.payload
    })
    builder.addCase(fetchTestPaperForStudent.fulfilled, (state, action) => {
      state.testPaper = action.payload
    })
  },
})

export default testPaperSlice.reducer
