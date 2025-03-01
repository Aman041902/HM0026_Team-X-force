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

import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import { About } from "./components/About";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);
  console.log(token, role)
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/about-us' element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            { token && role === "student" ? (
                <Route path="/dashboard/student" element={<StudentDashboard />} />
            ) : role === "instructor" && token !== null ? (
                <Route path="/dashboard/instructor" element={<TeacherDashboard />} />
            ) : role === "admin" && token !== null ? (
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
            ) : null}

            {/* <Route path="*" element={<Error />}/> */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
