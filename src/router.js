// importing the required dependencies
import { Navigate, useRoutes } from 'react-router-dom'

// layouts
import DashboardLayout from './layout/dashboard'
import RegistrationLayout from './layout/registration/index.js'
import ErrorLayout from './layout/error'

// page contents
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/Signup'
import MyCourse from './Pages/MyCourse'
import Page404 from './Pages/Page404'
import Article from './Pages/Articles'
import Search from './Pages/Search'

export default function Router() {
  return useRoutes([
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'search/:query', element: <Search /> },
        { path: 'article', element: <Article /> },
        { path: 'myCourse', element: <MyCourse /> },
        { path: 'setting', element: <MyCourse /> },
        { path: 'profile', element: <MyCourse /> },
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
      path: '*',
      element: <Navigate to="/404" />,
    },
  ])
}
