import React, { useState } from "react";
import { useEffect } from "react";
import profileImg from "../assets/profile-img.jpg";
import mlImg from "../assets/ml-app.png";
import reactImg from "../assets/react-logo.svg";
import jsimg from "../assets/js-img.jpeg";
import axios from 'axios';
import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

import {toast} from 'react-hot-toast'
import { ResponsiveContainer,BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Bar} from "recharts";
import {
  User,
  Bell,
  BookOpen,
  Award,
  BarChart2,
  Clock,
  ChevronRight,
  Play,
  Film,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  LogOut,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Studentheader from "./studentheader";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const token = useSelector((state)=>state.auth.token);

  const [userData,setUserData] = useState([]);
  const [ongoingCourses,setOnGoingCourses] = useState([]);
  const [recommendedCourses,setRecommendedCourses] = useState([]);

  const learningData = [
    { month: "Sep", hours: 0 },
    { month: "Oct", hours: 0 },
    { month: "Nov", hours: 0 },
    { month: "Dec", hours: 0 },
    { month: "Jan", hours: 0 },
    { month: "Feb", hours: Math.random()*2 },
  ];

  // State for showing/hiding full leaderboard modal
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Max hours for scaling the graph
  const maxHours = Math.max(...learningData.map((d) => d.hours));

  // Handle logout function
  const handleLogout = () => {
    alert("Logging out...");
    // In a real app, you would handle authentication logout here
  };
  function signouthandler() {
    localStorage.removeItem("token");
    navigate("/");
  }
  const handleleaderboard = () => {
    navigate("/dashboard/student/leaderboard");
  };

  useEffect(()=>{

      async function getData()
      {
        const response = await fetch('http://localhost:3000/user/getuserdata/student',{
          method : "POST",
          headers : 
          {
              'Content-Type' : 'application/json'
          },
          body : JSON.stringify({token : token})
      })

        const value = await response.json();
        setUserData(value.data)
      }

      async function getWatchHistory()
      {
        const response = await fetch('http://localhost:3000/user/watchhistory',{
          method : "POST",
          headers : 
          {
              'Content-Type' : 'application/json'
          },
          body : JSON.stringify({token : token})
      })

        const value = await response.json();
        setOnGoingCourses(value.data.history)
      }

      async function getRecommendVideo()
    {
       try 
       {
        const response = await fetch('http://localhost:3000/user/getvideos',{
          method : 'POST',
          headers :
          {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({token : token})
        })

        const value = await response.json();
        const video = value.data;
        const arrayOfObjects = Object.entries(video).map(([key, value]) => ({ key, value }));
        const newVideo = arrayOfObjects.slice(0, 3);
        
        // console.log(newVideo);
        setRecommendedCourses(newVideo);
       }
       catch(error)
       {
        console.log(error.message);
       }
    }

      getData();
      getWatchHistory();
      getRecommendVideo();
  },[])

  async function continuelearningclickhandler(videoId)
  {
    try 
    {
      const response = await fetch('http://localhost:3000/user/videoisclicked',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token,videoId : videoId })
      })
    }
    catch(error)
    {
      console.log(error.message);
    }

    navigate(`/feed/${videoId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Studentheader userData={userData} 
        signouthandler={signouthandler} 
        handleleaderboard={handleleaderboard} />

      <main className="pt-14 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Progress */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="bg-indigo-600 h-24 flex items-center justify-center">
                <h2 className="text-white text-xl font-bold">
                  Student Dashboard
                </h2>
              </div>
              <div className="p-6 flex flex-col items-center -mt-10">
                <img
                  src={profileImg}
                  alt="User profile"
                  className="h-20 w-20 rounded-full border-4 border-white shadow-md"
                />
                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  {userData.name}
                </h3>
                <p className="text-indigo-600">{userData.level}</p>
                <div className="mt-4 flex space-x-6">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-5 w-5" />
                      <span className="ml-1 font-bold text-lg text-gray-800">
                        {userData.points}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">Points</span>
                  </div>
                 
                </div>

                {/* Quick Access Buttons */}
                <div className="mt-6 grid grid-cols-2 gap-3 w-full">
                  <button
                    onClick={() => setShowLeaderboard(true)}
                    className="flex items-center justify-center py-2 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-colors"
                  >
                    <Trophy className="h-4 w-4 mr-1.5" />
                    <span
                      className="text-sm font-medium"
                      onClick={handleleaderboard}
                    >
                      Leaderboard
                    </span>
                  </button>
                  <button
                    onClick={signouthandler}
                    className="flex items-center justify-center py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-1.5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Learning Journey Graph */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Your Learning Journey
                </h3>
                <TrendingUp className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                You've watched {userData.hoursWatched} hours of content
              </p>

              {/* Simple bar chart showing learning progress */}
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%" className="-left-12">
                  <BarChart data={learningData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="category" dataKey="month" />
                    <YAxis type="number" />
                    <Tooltip />
                    <Bar
                      dataKey="hours"
                      fill="#6366f1"
                      barSize={20}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Middle Column - Current Learning & Recommended */}
          <div className="space-y-6 lg:col-span-2">
            {/* My Learning Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">My Learning</h3>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {ongoingCourses.map((course,index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <img src={course.thumbnail} className="h-10 w-10 rounded-full object-cover"/>
                      <span className="flex-1">{course.title}</span>
                    </h4>
                    <div className="w-full mb-2">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2"> 
                        {course.description}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <button 
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1" 
                        onClick={() => continuelearningclickhandler(course._id)}
                      >
                        <Play className="h-4 w-4" />
                        Continue Learning
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended For You */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recommended For You</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedCourses.map((course,index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <motion.img
                        src={course.value.thumbnail}
                        alt={course.value.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>

                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 line-clamp-1">{course.value.title}</h4>
                      <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                        {course.value.instructor.firstname} {course.value.instructor.lastname}
                      </p>
                      <button 
                        onClick={() => continuelearningclickhandler(course.value._id)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        View
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Full Leaderboard Modal */}
      
      
    </div>
  );
};

export default StudentDashboard;