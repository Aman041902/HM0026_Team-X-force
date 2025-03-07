import React from 'react'
import { motion } from "framer-motion";
import { BookOpen, Bell, Trophy, LogOut } from "lucide-react";
import { useState } from "react";
const LeaderboardNavbar = ({ userData, profileImg, signouthandler, handleleaderboard }) => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);
  return (
    
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
              <span className="ml-2 text-2xl font-bold text-gray-900 ">EduStream</span>
            </motion.div>
    
            <div className="flex items-center space-x-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
                  3
                </span>
              </motion.button>
    
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLeaderboard(true)}
                className="flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-colors cursor-pointer"
              >
                <Trophy className="h-4 w-4 mr-1.5" />
                <span className="text-sm font-medium" onClick={handleleaderboard}>
                  Leaderboard
                </span>
              </motion.button>
    
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
      );
}

export default LeaderboardNavbar




// const Studentheader = ({ userData, profileImg, signouthandler, handleleaderboard }) => {
 

  
// };

// export default Studentheader;
