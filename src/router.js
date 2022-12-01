// importing the required dependencies
import { Navigate, useRoutes } from 'react-router-dom'

// layouts
import DashboardLayout from './layout/dashboard'
import RegistrationLayout from './layout/registration'
import ErrorLayout from './layout/error'
import TeacherLayout from './layout/teacherDashboard'
import ExtraLayout from './layout/extra'

// page contents
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/Signup'
import MyCourse from './Pages/MyCourse'
import Page404 from './Pages/Page404'
import Article from './Pages/Articles'
import Search from './Pages/Search'
import CourseDetail from './Pages/CourseDetail'
import Profile from './Pages/Profile'
import TeacherDashboard from './Pages/TeacherDashboard'
import Contact from './Pages/Contact'
import About from './Pages/About'

export default function Router() {
  return useRoutes([
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'search/:query', element: <Search /> },
        { path: 'article', element: <Article /> },
        { path: 'course/:courseId', element: <CourseDetail /> },
        { path: 'myCourse', element: <MyCourse /> },
        { path: 'setting', element: <MyCourse /> },
        { path: 'profile', element: <Profile /> },
        { path: 'report', element: <MyCourse /> },
      ],
    },
    {
      path: '/app/teacher',
      element: <TeacherLayout />,
      children: [
        { path: '', element: <TeacherDashboard /> },
        { path: 'myCourse', element: <TeacherDashboard /> },
        { path: 'setting', element: <TeacherDashboard /> },
        { path: 'tests', element: <TeacherDashboard /> },
        { path: 'profile', element: <TeacherDashboard /> },
      ],
    },
    {
      path: '/registration',
      element: <RegistrationLayout />,
      children: [
        { path: '', element: <Login /> },
        { path: 'signUp', element: <SignUp /> },
      ],
    },
    {
      path: '/',
      element: <ErrorLayout />,
      children: [
        { path: '/', element: <Navigate to="/app" /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/',
      element: <ExtraLayout />,
      children: [
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
        { path: 'privacy-policy', element: <MyCourse /> },
        { path: 'terms-and-conditions', element: <MyCourse /> },
        { path: 'career', element: <MyCourse /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
  ])
}
