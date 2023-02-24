import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import teacherReducer from './slice/teacherSlice'
import courseReducer from './slice/courseSlice'
import testPaperReducer from './slice/testPaperSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    teacher: teacherReducer,
    course: courseReducer,
    testPaper: testPaperReducer,
  },
})
