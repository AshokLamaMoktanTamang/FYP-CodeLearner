// importing the required dependencies
import { Navigate, useRoutes } from 'react-router-dom'

// layouts
import DashboardLayout from './layout/dashboard'
import RegistrationLayout from './layout/registration'
import ErrorLayout from './layout/error'
import TeacherLayout from './layout/teacherDashboard'
import ExtraLayout from './layout/extra'
import AdminLayout from './layout/admin'

// page contents
// student
import Home from './Pages/student/Home'
import CourseDetail from './Pages/student/CourseDetail'
import MyCourse from './Pages/student/MyCourse'
import Article from './Pages/student/Articles'
import Search from './Pages/student/Search'
import TopRatedCourse from './Pages/student/TopRatedCourse'
import BestSellerCourse from './Pages/student/BestSellerCourse'
import LatestCourse from './Pages/student/LatestCourse'
import PopularArticle from './Pages/student/PopularArticle'
import LatestArticle from './Pages/student/LatestArticle'
import StartCourse from './Pages/student/StartCourse'
import TakeTest from './Pages/student/TakeTest'

// teacher
import TeacherDashboard from './Pages/teacher/TeacherDashboard'
import TeacherCourse from './Pages/teacher/TeacherCourse'
import DetailedCourse from './Pages/teacher/DetailedCourse'
import UpdateCourse from './Pages/teacher/UpdateCourse'
import AddCourse from './Pages/teacher/AddCourse'
import TestPaper from './Pages/teacher/TestPaper'

// admin
import AdminHome from './Pages/admin/Home'
import AdminTeacher from './Pages/admin/Teacher'
import AdminTeacherDetail from './Pages/admin/DetailedTeacher'
import AdminInterview from './Pages/admin/Interview'
import AdminCourse from './Pages/admin/Course'
import AdminLogin from './Pages/admin/Login'
import AdminUpdate from './Pages/admin/Update'
import AdminDetailCourse from './Pages/admin/AdminDetailCourse'

// registration and static pages
import Login from './Pages/registration/Login'
import SignUp from './Pages/registration/Signup'
import Page404 from './Pages/static/Page404'
import About from './Pages/static/About'
import PrivacyPoliicy from './Pages/static/PrivacyPoliicy'
import TermsAndCondition from './Pages/static/TermsAndCondition'

// utilities
import Contact from './Pages/utils/Contact'
import Faq from './Pages/utils/Faq'
import Career from './Pages/utils/Career'
import DetailCareer from './Pages/utils/DetailCareer'
import TeachonCodeLearner from './Pages/utils/TeachonCodeLearner'
import TeacherInformation from './Pages/utils/TeacherInformation'
import Setting from './Pages/utils/Setting'
import Profile from './Pages/utils/Profile'
import TestPaperDetail from './Pages/teacher/TestPaperDetail'

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
        { path: 'course/testPaper/:courseId', element: <TakeTest /> },
        { path: 'course/:courseId/:userId', element: <CourseDetail /> },
        { path: 'myCourse', element: <MyCourse /> },
        { path: 'myCourse/:courseId', element: <StartCourse /> },
        { path: 'setting', element: <Setting theme="Light" /> },
        { path: 'profile', element: <Profile theme="Light" /> },
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
        { path: 'myCourse', element: <TeacherCourse /> },
        { path: 'setting', element: <Setting /> },
        { path: 'myCourse/:courseId', element: <DetailedCourse /> },
        { path: 'profile', element: <Profile /> },
        { path: 'addCourse', element: <AddCourse /> },
        { path: 'updateCourse/:courseId', element: <UpdateCourse /> },
        { path: 'testPaper/:courseId', element: <TestPaper /> },
        { path: 'testPaper/detail/:courseId', element: <TestPaperDetail /> },
      ],
    },
    {
      path: '/app/admin',
      element: <AdminLayout />,
      children: [
        { path: '', element: <AdminHome /> },
        { path: 'teacher', element: <AdminTeacher /> },
        { path: 'teacher/:id', element: <AdminTeacherDetail /> },
        { path: 'course', element: <AdminCourse /> },
        { path: 'interview', element: <AdminInterview /> },
        { path: 'course/:courseId', element: <AdminDetailCourse /> },
      ],
    },
    {
      path: '/app/admin/login',
      element: <AdminLogin />,
    },
    {
      path: '/app/admin/update',
      element: <AdminUpdate />,
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
