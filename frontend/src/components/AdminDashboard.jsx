import React, { useState, useEffect } from "react";
import adminImg from "../assets/admi-img.jpeg";
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';
import {
  Bell,
  CheckCircle,
  XCircle,
  BarChart2,
  Flag,
  UserCheck,
  Video,
  Users,
  LogOut,
  X,
  Play,
  BookOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer,BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Bar} from "recharts";


const AdminDashboard = () => {
  // Sample data - in a real app this would come from an API
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [pendingVideos, setPendingVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);

  function getDate(timestamp) {
    const dateOnly = timestamp.split("T")[0];
    return dateOnly;
  }

  useEffect(() => {
    async function getPendingVideo() {
      try {
        const response = await fetch(
          "http://localhost:3000/user/getpendingvideo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
          }
        );

        const value = await response.json();
        setPendingVideos(value.data);
        console.log(value.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    getPendingVideo();
    
    // Add scroll event listener for header effect
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [token]);

  const [analytics, setAnalytics] = useState({
    totalVideos: 0,
    activeUsers: 0,
    dailyViews: 0,
    avgEngagement: 0,
  });

  const learningData = [
    { day: "Sun", views: 1 },
    { day: "Mon", views: 4 },
    { day: "Tue", views: 2 },
    { day: "Wed", views: 6 },
    { day: "Thu", views: 2 },
    { day: "Fri", views: Math.random()*2 },
    { day: "Sat", views: 4 },
  ];

  const [reports, setReports] = useState([
    {
      id: 1,
      type: "Inappropriate Content",
      video: "Data Science",
      reportedBy: "user123",
      link: "#",
      date: "2025-02-27",
    },
    {
      id: 2,
      type: "Copyright Issue",
      video: "Introduction to Calculus",
      reportedBy: "teacher456",
      link: "#",
      date: "2025-02-28 basics",
    },
  ]);

  const [activeTab, setActiveTab] = useState("pending");
  const [alertsCount, setAlertsCount] = useState(3);

  const openVideoModal = (video) => {
    setHideNav(true);
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setHideNav(false);
    setIsModalOpen(false);
  };

  async function approveVideo(id) {
    try {
      await fetch("http://localhost:3000/user/flagvideos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, videoId: id }),
      });
    } catch (error) {
      console.log(error.message);
    }
  }


  useEffect(()=>{
    async function getAnalyticsData() {
      // Placeholder for analytics data fetching
      try {
        const response = await fetch("http://localhost:3000/user/admin/getvideos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token}),
        });

        const res = await fetch("http://localhost:3000/user/getuserdata",{
          method : 'GET'
        });

        const val = await res.json();
  
        const value = await response.json();
        console.log(value.data);
        
        setAnalytics({totalVideos:value.data.length,activeUsers:val.data.length,dailyViews : parseInt(Math.random()*10),avgEngagement : parseInt(Math.random()*10)})
      } catch (error) {
        console.log(error.message);
      }
    }

    getAnalyticsData();
  },[])

  const handleApprove = (id, section) => {
    if (section === "videos") {
      setPendingVideos(pendingVideos.filter((video) => video._id !== id));
      setAnalytics({ ...analytics, totalVideos: analytics.totalVideos + 1 });
      approveVideo(id);
    } else if (section === "teachers") {
      setAnalytics({ ...analytics, activeUsers: analytics.activeUsers + 1 });
    }
    setAlertsCount(Math.max(0, alertsCount - 1));

    // Close modal if it's open
    if (isModalOpen) {
      setIsModalOpen(false);
      setHideNav(false);
    }
    toast.success('Approved')
  };

  const handleReject = (id, section) => {
    if (section === "videos") {
      setPendingVideos(pendingVideos.filter((video) => video._id !== id));
    } else if (section === "teachers") {
      // This is referring to a state that's not defined in the component
      // Consider removing or defining teacherVerifications state
      setTeacherVerifications && setTeacherVerifications(
        teacherVerifications.filter((teacher) => teacher.id !== id)
      );
    }
    setAlertsCount(Math.max(0, alertsCount - 1));

    // Close modal if it's open
    if (isModalOpen) {
      setIsModalOpen(false);
      setHideNav(false);
    }
    toast.error('Reject')
  };

  const handleResolve = (id) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  function signouthandler() {
    localStorage.removeItem("token");
    navigate("/");
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? "bg-white shadow-lg py-2" : "bg-gradient-to-r from-blue-600 to-indigo-700 py-4"
          } ${hideNav ? "hidden" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
              >
                <BookOpen className={`h-8 w-8 ${isScrolled ? "text-blue-600" : "text-white"}`} />
              </motion.div>
              <span
                className={`ml-2 text-xl md:text-2xl font-bold transition-colors duration-300 ${isScrolled ? "text-blue-600" : "text-white"
                  }`}
              >
                Edu<span className="text-yellow-400">Stream</span>
              </span>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={signouthandler}
                className={`flex items-center space-x-1 px-2 sm:px-3 py-1 rounded transition-colors ${isScrolled
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src={adminImg}
                    alt=""
                    className="rounded-full object-cover w-8 h-8 sm:w-10 sm:h-10"
                  />
                </motion.div>
                <span className={`hidden sm:inline ${isScrolled ? "text-gray-700" : "text-white"}`}>
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <div className="pt-14 md:pt-18">
        <div className="bg-white border-b overflow-x-auto">
          <nav className="flex whitespace-nowrap">
            <motion.button
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              className={`px-4 sm:px-6 py-4 font-medium flex items-center space-x-2 ${activeTab === "pending"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
                }`}
              onClick={() => setActiveTab("pending")}
            >
              <Video className="w-5 h-5" />
              <span className="hidden sm:inline">Pending Videos</span>
              <span className="inline sm:hidden">Videos</span>
              {pendingVideos && pendingVideos.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {pendingVideos ? pendingVideos.length : 0}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              className={`px-4 sm:px-6 py-4 font-medium flex items-center space-x-2 ${activeTab === "analytics"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
                }`}
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart2 className="w-5 h-5" />
              <span>Analytics</span>
            </motion.button>
          </nav>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white rounded-lg w-full max-w-3xl shadow-xl"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium truncate">
                  {selectedVideo?.title || "Video Preview"}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(229, 231, 235, 1)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeVideoModal}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="p-4">
                {/* Video Player */}
                <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded overflow-hidden mb-4">
                  {selectedVideo?.url ? (
                    <iframe
                      src={selectedVideo.url}
                      className="w-full h-56 sm:h-72 md:h-96"
                      title={selectedVideo.title}
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center h-56 sm:h-72 md:h-96 bg-gray-800 text-white">
                      No video available
                    </div>
                  )}
                </div>

                {/* Video Details */}
                <div className="space-y-2 mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Instructor
                      </p>
                      <p>
                        {selectedVideo?.instructor?.firstname}{" "}
                        {selectedVideo?.instructor?.lastname}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Duration
                      </p>
                      <p>{selectedVideo?.duration}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Uploaded</p>
                    <p>
                      {selectedVideo?.uploadDate
                        ? getDate(selectedVideo.uploadDate)
                        : "Unknown"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap justify-end space-x-0 space-y-2 sm:space-y-0 sm:space-x-3 mt-6 pt-4 border-t">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeVideoModal}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      selectedVideo && handleApprove(selectedVideo._id, "videos")
                    }
                    className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center justify-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      selectedVideo && handleReject(selectedVideo._id, "videos")
                    }
                    className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center justify-center"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="p-4 sm:p-6 mt-2">
        {/* Pending Videos */}
        <AnimatePresence mode="wait">
          {activeTab === "pending" && (
            <motion.div
              key="pending"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-bold">
                  Review Pending Video Uploads
                </h2>
                <div className="text-sm text-gray-500 mt-2 sm:mt-0">
                  {pendingVideos ? pendingVideos.length : 0} pending approval
                </div>
              </div>

              {pendingVideos && pendingVideos.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          Creator
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Duration
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                          Submitted
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Preview
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingVideos.map((video, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          exit={{ opacity: 0 }}
                          whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.5)" }}
                        >
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-16 bg-gray-200 rounded mr-3 flex-shrink-0 hidden sm:block">
                                <img
                                  src={video.thumbnail}
                                  alt="Thumbnail"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {video.title}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                            {video.instructor.firstname}{" "}
                            {video.instructor.lastname}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            {video.duration}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                            {getDate(video.uploadDate)}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openVideoModal(video)}
                              className="flex items-center text-blue-600 hover:text-blue-800"
                            >
                              <Play className="w-4 h-4 mr-1" />
                              <span className="hidden sm:inline">View</span>
                            </motion.button>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleApprove(video._id, "videos")}
                              className="text-green-600 hover:text-green-900 mr-4"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleReject(video._id, "videos")}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XCircle className="w-5 h-5" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  >
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-gray-900">
                    No pending videos
                  </h3>
                  <p className="text-gray-500 mt-1">
                    All submitted videos have been reviewed.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Analytics */}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-xl font-bold mb-6">Platform Analytics</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1 }}
                      className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4"
                    >
                      <Video className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Videos
                      </p>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl font-semibold"
                      >
                        {analytics.totalVideos}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1 }}
                      className="p-3 rounded-full bg-green-100 text-green-600 mr-4"
                    >
                      <Users className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Active Users
                      </p>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-2xl font-semibold"
                      >
                        {analytics.activeUsers}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1 }}
                      className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4"
                    >
                      <BarChart2 className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Daily Views
                      </p>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-2xl font-semibold"
                      >
                        {analytics.dailyViews}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1 }}
                      className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4"
                    >
                      <Bell className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Avg. Engagement
                      </p>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-2xl font-semibold"
                      >
                        {analytics.avgEngagement} {"hr"}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="w-[90%] sm:w-1/2 mt-8flex items-end justify-between h-48 space-x-2">
                            <ResponsiveContainer width="100%" height={200} className={'-left-12 '}>
                          <BarChart data={learningData} layout="horizontal">
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis type="category" dataKey="day" />
                              <YAxis type="number" />
                              <Tooltip />
                              <Bar
                                  dataKey="views"
                                  fill="#6366f1"
                                  barSize={20}
                                  radius={[4, 4, 0, 0]}
                              />
                          </BarChart>
                      </ResponsiveContainer>
                            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;