import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import teacherReducer from './slice/teacherSlice'
import courseReducer from './slice/courseSlice'
import testPaperReducer from './slice/testPaperSlice'
import adminReducer from './slice/adminSlice'
import interviewReducer from './slice/interviewSlice'
import commentReducer from './slice/commentSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    teacher: teacherReducer,
    course: courseReducer,
    testPaper: testPaperReducer,
    admin: adminReducer,
    interview: interviewReducer,
    comment: commentReducer
  },
})
