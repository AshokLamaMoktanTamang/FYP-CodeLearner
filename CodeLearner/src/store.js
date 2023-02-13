import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import teacherReducer from './slice/teacherSlice'
import courseReducer from './slice/courseSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    teacher: teacherReducer,
    course: courseReducer,
  },
})
