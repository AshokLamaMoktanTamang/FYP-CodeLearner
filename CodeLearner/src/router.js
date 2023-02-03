// importing the required dependencies
import { Navigate, useRoutes } from 'react-router-dom'

// layouts
import DashboardLayout from './layout/dashboard'
import RegistrationLayout from './layout/registration'
import ErrorLayout from './layout/error'
import TeacherLayout from './layout/teacherDashboard'
import ExtraLayout from './layout/extra'

// page contents
import Home from './Pages/student/Home'
import CourseDetail from './Pages/student/CourseDetail'
import Login from './Pages/registration/Login'
import SignUp from './Pages/registration/Signup'
import MyCourse from './Pages/student/MyCourse'
import Page404 from './Pages/static/Page404'
import Article from './Pages/student/Articles'
import Search from './Pages/student/Search'
import Profile from './Pages/student/Profile'
import TeacherDashboard from './Pages/teacher/TeacherDashboard'
import Contact from './Pages/utils/Contact'
import About from './Pages/static/About'
import PrivacyPoliicy from './Pages/static/PrivacyPoliicy'
import TermsAndCondition from './Pages/static/TermsAndCondition'
import Faq from './Pages/utils/Faq'
import Career from './Pages/utils/Career'
import DetailCareer from './Pages/utils/DetailCareer'
import TopRatedCourse from './Pages/student/TopRatedCourse'
import BestSellerCourse from './Pages/student/BestSellerCourse'
import LatestCourse from './Pages/student/LatestCourse'
import PopularArticle from './Pages/student/PopularArticle'
import LatestArticle from './Pages/student/LatestArticle'
import TeachonCodeLearner from './Pages/utils/TeachonCodeLearner'
import TeacherInformation from './Pages/utils/TeacherInformation'

export default function Router() {
  return useRoutes([
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'top-rated', element: <TopRatedCourse /> },
        { path: 'best-seller', element: <BestSellerCourse /> },
        { path: 'latest', element: <LatestCourse /> },
        { path: 'search/:query', element: <Search /> },
        { path: 'article', element: <Article /> },
        { path: 'article/popular', element: <PopularArticle /> },
        { path: 'article/latest', element: <LatestArticle /> },
        { path: 'course/:courseId', element: <CourseDetail /> },
        { path: 'course/:courseId/similar', element: <CourseDetail /> },
        { path: 'course/:courseId/:userId', element: <CourseDetail /> },
        { path: 'myCourse', element: <MyCourse /> },
        { path: 'setting', element: <MyCourse /> },
        { path: 'profile', element: <Profile /> },
        { path: 'report', element: <MyCourse /> },
        { path: 'teachOnCodeLearner', element: <TeachonCodeLearner /> },
        { path: 'teacherInformation', element: <TeacherInformation /> },
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
        { path: 'privacy-policy', element: <PrivacyPoliicy /> },
        { path: 'terms-and-conditions', element: <TermsAndCondition /> },
        { path: 'faq', element: <Faq /> },
        { path: 'career', element: <Career /> },
        { path: 'career/:jobId', element: <DetailCareer /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
  ])
}
