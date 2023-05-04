import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../services/adminHttpService'
import userHttpService from '../services/httpService'

const initialState = {
  interview: {},
  interviews: [],
}

export const fetchInterviews = createAsyncThunk('fetch/all', async () => {
  const { data } = await httpService.get('/interview/v1/all')

  return data
})

export const fetchInterview = createAsyncThunk('fetch', async () => {
  const { data } = await userHttpService.get('/interview/v1')

  return data
})

export const interviewSlice = createSlice({
  name: 'Interview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInterviews.fulfilled, (state, action) => {
      state.interviews = action.payload
    })
    builder.addCase(fetchInterview.fulfilled, (state, action) => {
      state.interview = action.payload
    })
  },
})

export default interviewSlice.reducer
