import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../services/httpService'

const initialState = {
  comments: [],
}

export const fetchComments = createAsyncThunk('fetch/comment', async ({courseId}) => {
  const { data } = await httpService.get(`/comment/v1/${courseId}`)

  return data
})

export const addComments = createAsyncThunk('add/comment', async ({courseId, comment}) => {
  const { data } = await httpService.post(`/comment/v1/${courseId}`, {
    comment
  })

  return data
})

export const commentSlice = createSlice({
  name: 'Comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload.userComments
    })
    builder.addCase(addComments.fulfilled, (state, action) => {
      state.comments.unshift(action.payload.userComment)
    })
  },
})

export default commentSlice.reducer
