import React, { useState } from "react";
import { useEffect } from "react";
import profileImg from "../assets/profile-img.jpg";
import mlImg from "../assets/ml-app.png";
import reactImg from "../assets/react-logo.svg";
import jsimg from "../assets/js-img.jpeg";
import axios from 'axios';
import { motion } from "framer-motion";
<img src={profileImg} alt="User avatar" className="h-10 w-10 rounded-full" />;
import VideoPlayer from "./VideoPlayer";

import {toast} from 'react-hot-toast'
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
  // Mock data
  const userData = {
    name: "Aman Jain",
    avatar: "../assets/profile-img.jpg",
    points: 2840,
    badges: 12,
    level: "Advanced Learner",
    completedCourses: 8,
    hoursWatched: 124,
  };

  const ongoingCourses = [
    {
      id: 1,
      title: "Data Science Fundamentals",
      progress: 68,
      lastWatched: "Introduction to Neural Networks",
      totalVideos: 24,
      completedVideos: 16,
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      progress: 42,
      lastWatched: "CSS Grid Layouts",
      totalVideos: 36,
      completedVideos: 15,
    },
  ];

  const recommendedCourses = [
    {
      id: 1,
      title: "Machine Learning Applications",
      instructor: "Dr. Sarah Chen",
      rating: 4.8,
      students: 3420,
      thumbnail: mlImg,
    },
    {
      id: 2,
      title: "Advanced JavaScript ",
      instructor: "Mark Williams",
      rating: 4.7,
      students: 2840,
      thumbnail: jsimg,
    },
    {
      id: 3,
      title: "React Bootcamp",
      instructor: "Priya Sharma",
      rating: 4.9,
      students: 1950,
      thumbnail: reactImg,
    },
  ];

  const leaderboardData = [
    {
      id: 1,
      name: "Aman Jain",
      points: 2840,
      badges: 12,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "Onkar Jondhale",
      points: 2715,
      badges: 10,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "Brijmohan Gour",
      points: 2690,
      badges: 11,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 4,
      name: "Ratul Kulkarni",
      points: 2580,
      badges: 9,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 5,
      name: "Ansh Gaigawali",
      points: 2510,
      badges: 8,
      avatar: "/api/placeholder/40/40",
    },
  ];

  const upcomingQuizzes = [
    {
      id: 1,
      title: "Data Structures Quiz",
      course: "Computer Science 101",
      dueDate: "Mar 5",
    },
  ];

  const earnedBadges = [
    { id: 1, name: "Fast Learner", icon: "🚀", earnedDate: "Feb 10" },
    { id: 2, name: "Quiz Master", icon: "🧠", earnedDate: "Feb 18" },
    { id: 3, name: "Consistent Viewer", icon: "👁️", earnedDate: "Feb 25" },
  ];

  const nextBadges = [
    {
      id: 1,
      name: "Course Completer",
      icon: "🏁",
      requirement: "Complete 10 courses (2 more to go)",
    },
    {
      id: 2,
      name: "Discussion Leader",
      icon: "💬",
      requirement: "Participate in 15 forum discussions (8 more to go)",
    },
  ];

  const learningData = [
    { month: "Sep", hours: 14 },
    { month: "Oct", hours: 18 },
    { month: "Nov", hours: 12 },
    { month: "Dec", hours: 8 },
    { month: "Jan", hours: 22 },
    { month: "Feb", hours: 28 },
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
        console.log("fetching data...",token)
        const toastId = toast.loading("Loading")
        const response = await fetch('http://localhost:3000/user/getuserdata',{
          method : "POST",
          headers : 
          {
              'Content-Type' : 'application/json'
          },
          body : JSON.stringify(token)
      })
         toast.success("Success")
        toast.dismiss(toastId);
      }

      getData();
  },[])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      
      <Studentheader userData={userData} 
        profileImg={profileImg} 
        signouthandler={signouthandler} 
        handleleaderboard={handleleaderboard} />

      <main className="mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Progress */}
          <div className="space-y-8">
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
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-indigo-500">
                      <Award className="h-5 w-5" />
                      <span className="ml-1 font-bold text-lg text-gray-800">
                        {userData.badges}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">Badges</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="h-5 w-5" />
                      <span className="ml-1 font-bold text-lg text-gray-800">
                        {userData.completedCourses}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">Courses</span>
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
              <div className="mt-4 flex items-end justify-between h-48 space-x-2">
                {learningData.map((data, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-indigo-500 rounded-t-md transition-all duration-300 hover:bg-indigo-600"
                      style={{ height: `${(data.hours / maxHours) * 100}%` }}
                    />
                    <div className="text-xs text-gray-600 mt-1">
                      {data.month}
                    </div>
                    <div className="text-xs font-medium">{data.hours}h</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Quizzes/Challenges */}
            
          </div>

          {/* Middle Column - Current Learning & Recommended */}
          <div className="space-y-8 lg:col-span-2">
            {/* My Learning Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">My Learning</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {ongoingCourses.map((course) => (
                  <div
                    key={course.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-gray-900 mb-2">
                      {course.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Last watched: {course.lastWatched}</span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                        <span>
                          {course.completedVideos}/{course.totalVideos} videos
                          complete
                        </span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                        <Play className="h-4 w-4 mr-1" />
                        Continue Learning
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center">
                        Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended For You */}
            <div className="bg-white shadow rounded-lg p-6">
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-lg font-bold text-gray-900">Recommended For You</h3>
    <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200">
      View All
    </button>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {recommendedCourses.map((course) => (
      <motion.div
        key={course.id}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <motion.img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-32 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="p-4">
          <h4 className="font-medium text-gray-900 mb-1">{course.title}</h4>
          <p className="text-sm text-gray-500 mb-2">{course.instructor}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{course.rating}</span>
              <span className="mx-1 text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                {course.students.toLocaleString()} students
              </span>
            </div>
            <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium transition-colors duration-200">
              View
            </button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</div>

            {/* Badges & Achievement Section */}
            
          </div>
        </div>
      </main>

      {/* Full Leaderboard Modal */}
      <VideoPlayer/>
      
    </div>
  );
};

export default StudentDashboard;