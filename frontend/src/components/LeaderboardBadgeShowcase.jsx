import React, { useState, useEffect } from "react";
import profileImg from "../assets/profile-img.jpg";
import { motion } from "framer-motion";
import {
  Bell,
  Award,
  Users,
  ChevronUp,
  ChevronDown,
  Filter,
  Trophy,
  LogOut,
  BookOpen,
  ArrowLeft,
} from "lucide-react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import profileImg from "../assets/profile-img.jpg";
const sampleStudents = [
  { id: 1, name: "Aman Jain", avatar: profileImg, points: 2450, badges: 12, rank: 1, prevRank: 2, region: "North", subjects: ["Math", "Science"] },
  { id: 2, name: "Onkar Jondhale", avatar: profileImg, points: 2300, badges: 10, rank: 2, prevRank: 1, region: "East", subjects: ["History", "English"] },
  { id: 3, name: "Brijmohan Gour", avatar: profileImg, points: 2100, badges: 9, rank: 3, prevRank: 3, region: "West", subjects: ["Science", "Art"] },
  { id: 4, name: "Ratul Kulkarni", avatar: profileImg, points: 1950, badges: 8, rank: 4, prevRank: 6, region: "South", subjects: ["Math", "Music"] },
  { id: 5, name: "Ansh Gaigawali", avatar: profileImg, points: 1820, badges: 7, rank: 5, prevRank: 4, region: "North", subjects: ["English", "History"] },
  { id: 6, name: "Arjun Sharma", avatar: profileImg, points: 1700, badges: 7, rank: 6, prevRank: 5, region: "East", subjects: ["Science", "Math"] },
];

const regions = ["All Regions", "North", "South", "East", "West"];
const subjects = ["All Subjects", "Math", "Science", "History", "English", "Art", "Music"];

const LeaderboardBadgeShowcase = () => {
  const [students, setStudents] = useState(sampleStudents);
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [showAnimation, setShowAnimation] = useState(false);
  const token = useSelector((state)=>state.auth.token)
  const userData = {
    name: "Aman Jain",
    avatar: "../assets/profile-img.jpg",
    points: 2840,
    badges: 12,
    level: "Advanced Learner",
    completedCourses: 8,
    hoursWatched: 124,
  };
  const navigate = useNavigate();
  useEffect(() => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 3000);
  }, []);
  function signouthandler() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const handleBack = () => {
    navigate('/dashboard/student');
  };

  const filteredStudents = students.filter((student) => {
    const regionMatch = regionFilter === "All Regions" || student.region === regionFilter;
    const subjectMatch = subjectFilter === "All Subjects" || student.subjects.includes(subjectFilter);
    return regionMatch && subjectMatch;
  });

  const getRankChangeIcon = (student) => {
    if (student.rank < student.prevRank) {
      return <ChevronUp className={`text-green-500 ${showAnimation ? "animate-bounce" : ""}`} />;
    } else if (student.rank > student.prevRank) {
      return <ChevronDown className={`text-red-500 ${showAnimation ? "animate-bounce" : ""}`} />;
    }
    return <span className="px-2">-</span>;
  };

  return (
    <>
     <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow w-full fixed top-0 left-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="flex items-center cursor-pointer"
        >
          <BookOpen className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">EduStream</span>
        </motion.div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={signouthandler}
            className="flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-1.5 cursor-pointer" />
            <span className="text-sm font-medium">Logout</span>
          </motion.button>

          <div className="flex items-center ml-2 cursor-pointer">
            <motion.img
              src={profileImg}
              alt="User avatar"
              className="h-10 w-10 rounded-full"
              whileHover={{ scale: 1.1 }}
            />
            <span className="ml-2 font-medium text-gray-900 hidden sm:block hover:text-gray-500">
              {userData.name}
            </span>
          </div>
        </div>
      </div>
    </motion.header>

    <div className="min-h-screen w-full mt-10">
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 animate-fade-in w-full">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="mb-4 sm:mb-0 flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Dashboard</span>
            </motion.button>
            <h1 className="text-xl sm:text-2xl font-bold text-indigo-700">Leaderboard & Badge Showcase</h1>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-indigo-600 text-white p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold flex items-center mb-2 sm:mb-0">
                  <Trophy className="mr-2" /> Top Students
                </h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <select className="bg-indigo-700 text-white p-2 rounded-md text-sm appearance-none pr-8 w-full sm:w-auto" value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
                    {regions.map((region) => <option key={region} value={region}>{region}</option>)}
                  </select>
                  <select className="bg-indigo-700 text-white p-2 rounded-md text-sm appearance-none pr-8 w-full sm:w-auto" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
                    {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                </div>
              </div>

              <div className="divide-y divide-gray-200 overflow-x-auto">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="p-3 sm:p-4 flex items-center hover:bg-gray-50 transition-transform transform hover:scale-95 duration-200">
                    <div className="flex items-center w-10 sm:w-12 justify-center flex-shrink-0">
                      <span className={`font-bold text-base sm:text-lg ${student.rank <= 3 ? "text-amber-500" : "text-gray-500"}`}>{student.rank}</span>
                      {getRankChangeIcon(student)}
                    </div>
                    <img src={student.avatar} alt={student.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-indigo-200 flex-shrink-0" />
                    <div className="ml-2 sm:ml-4 flex-grow min-w-0">
                      <div className="font-medium text-sm sm:text-base truncate">{student.name}</div>
                      <div className="text-xs text-gray-500 truncate">{student.subjects.join(", ")} • {student.region}</div>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      <div className="px-2 sm:px-3 text-right">
                        <div className="text-amber-600 font-bold text-sm sm:text-base">{student.points}</div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                      <div className="px-2 sm:px-3 flex items-center">
                        <Award className="text-indigo-500 mr-1" size={16} />
                        <span className="font-medium text-sm sm:text-base">{student.badges}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-3 flex justify-center">
                <button className="text-indigo-600 text-sm font-medium flex items-center hover:text-indigo-800 animate-pulse">
                  <Users size={16} className="mr-1" /> Compete with Friends
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LeaderboardBadgeShowcase;