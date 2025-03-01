import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Redux/reducer"; 

import LandingPage from "./components/LandingPage";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import { About } from "./components/About";
import Error from "./components/Error";

const store = configureStore({
  reducer: rootReducer,
});

function AppRoutes() {
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {token && role === "student" && (
        <Route path="/dashboard/student" element={<StudentDashboard />} />
      )}
      {token && role === "instructor" && (
        <Route path="/dashboard/instructor" element={<TeacherDashboard />} />
      )}
      {token && role === "admin" && (
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      )}

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
