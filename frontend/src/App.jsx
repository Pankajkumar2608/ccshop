import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import Signup from "./pages/Signup"
import Shop from "./pages/Shop"
import Profile from "./pages/Profile"
import AdminLogin from "./pages/AdminLogin";
import AdminDash from "./pages/AdminDash";

function App() {
 

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/admindash" element={<AdminDash />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
