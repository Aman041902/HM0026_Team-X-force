import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { setToken } from "../Redux/slices/authslice";
import { setRole } from "../Redux/slices/authslice";
import { setEmail } from "../Redux/slices/authslice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const tokendecryption = (token) => {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    dispatch(setRole(decodedToken.role));
    dispatch(setEmail(decodedToken.email));
    return decodedToken.role;
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid";

    if (!formData.password) tempErrors.password = "Password is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit login credentials to server
      console.log("Login submitted:", formData);
      axios
        .post("http://localhost:3000/user/login", formData)
        .then((res) => {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          dispatch(setToken(res.data.token));
          const role = tokendecryption(res.data.token);
          

          if(role === "student")
          {
            navigate("/dashboard/student");
          }
          else if(role==="instructor")
          {
            navigate("/dashboard/instructor");
          }
          else {
            navigate("/dashboard/admin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // After successful login, you would typically redirect the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Log In
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                Forgot Password?
              </a>
            </div>
            <input
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
