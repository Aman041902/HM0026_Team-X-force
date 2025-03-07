import { useState } from "react";
import LandingPage from "./components/LandingPage";
import StudentDashboard from "./components/StudentDashboard";
import CoursePlaylistPage from "./components/CoursePlaylistPage";
import ProfileProgressPage from "./components/ProfileProgressPage";
import LeaderboardBadgeShowcase from "./components/LeaderboardBadgeShowcase";
import TeacherDashboard from "./components/TeacherDashboard";

import TranslateSummary from "./components/TranslateSummary.jsx";

import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact.jsx";
import { About } from "./components/About.jsx";
import Error from "./components/Error";
import AdminDashboard from "./components/AdminDashboard";
import TeachersPlaylistManagement from "./components/TeachersPlaylistManagement";
import VideoUploadApprovalPage from "./components/VideoUploadApprovalPage";
import EduStreamFeed from "./components/EduStreamFeed.jsx";
// import VideoToTextConverter from "./components/VideoToTextConverter";
import VideoPlayer from "./components/VideoPlayer.jsx";

function App() {
  const token = useSelector((state) => state.auth.token);
  console.log("image===", import.meta.env.VITE_OPENAI_API_KEY);

  let role = null;

  if (token) {
    const decodedToken = jwtDecode(token);
    role = decodedToken.role;
  }

  console.log(token, role);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {token && role === "student" && (
            <Route path="/" element={<EduStreamFeed />} />
          )}

          {token && role === "student" && (
            <Route path="/dashboard/student" element={<StudentDashboard />} />
          )}
          {token && role === "student" && (
            <Route path="/feed" element={<EduStreamFeed />} />
          )}

          {token && role === "student" && (
            <Route path="/feed/:id" element={<VideoPlayer />} />
          )}

          {token && role === "instructor" && (
            <Route
              path="/dashboard/instructor"
              element={<TeacherDashboard />}
            />
          )}

          {token && role === "admin" && (
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
          )}

          {token && role === "instructor" && (
            <Route
              path="/dashboard/instructor/playlist"
              element={<TeachersPlaylistManagement />}
            />
          )}

          {token && role === "admin" && (
            <Route
              path="/dashboard/admin/approval"
              element={<VideoUploadApprovalPage />}
            />
          )}

          {token && role === "student" && (
            <Route
              path="/dashboard/student/progress"
              element={<ProfileProgressPage />}
            />
          )}

          {token && role === "student" && (
            <Route
              path="/dashboard/student/progress"
              element={<ProfileProgressPage />}
            />
          )}

          {token && role === "student" && (
            <Route
              path="/dashboard/student/leaderboard"
              element={<LeaderboardBadgeShowcase />}
            />
          )}

          {token && role === "student" && (
            <Route
              path="/dashboard/student/playlist"
              element={<CoursePlaylistPage />}
            />
          )}

          {token && role === "instructor" && (
            <Route
              path="/dashboard/student/videos"
              element={<CoursePlaylistPage />}
            />
          )}

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
