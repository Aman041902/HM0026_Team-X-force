import { useState } from "react";
import LandingPage from "./components/LandingPage";
import StudentDashboard from "./components/StudentDashboard";
import CoursePlaylistPage from "./components/CoursePlaylistPage";
import ProfileProgressPage from "./components/ProfileProgressPage";
import LeaderboardBadgeShowcase from "./components/LeaderboardBadgeShowcase";
import TeacherDashboard from "./components/TeacherDashboard";
import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "./Redux/reducer";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import { About } from "./components/About";
import Error from "./components/Error"
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const token = useSelector((state) => state.auth.token);


  let role = null;

  if(token)
  {
    const decodedToken = jwtDecode(token);
    role = decodedToken.role;
  }
  
  console.log(token,role);
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {
              token && role==='student' && 
              <Route path="/dashboard/student" element={<StudentDashboard />} />
            }

            {
              token && role==='instructor' && 
              <Route path="/dashboard/instructor" element={<TeacherDashboard />} />
            }

            {
              token && role==='admin' && 
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            }

            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
