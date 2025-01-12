import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import AdminDash from './pages/AdminDash'
import SignIn from './pages/SignIn'
import Signup from './pages/Signup'
import AdminLogin from './pages/AdminLogin.jsx'
import Shop from './pages/Shop'
import Profile from './pages/Profile.jsx'
import LoadingPage from './pages/LoadingPage.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <LoadingPage/>
  },
  
  {
    path: '/home',
    element: <Home/>,
  },
  {
    path: '/profile',
    element: <Profile/>
  }
  ,
  {
    path: '/admin',
    element: <AdminDash/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/signin',
    element: <SignIn/>
  },
  {
    path: '*',
    element: <h1>404</h1>
  },
  {
    path:'/adminlogin',
    element: <AdminLogin/>
  },
  {
    path:"/shop",
    element: <Shop/>
  },
  {
    path:"/admindash",
    element: <AdminDash/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)