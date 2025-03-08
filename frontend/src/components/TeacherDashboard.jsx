import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import teacherImg from "../assets/teacher-img.avif";
import genImg from "../assets/genai-img.jpeg";
import probImg from "../assets/prob-img.webp";
import mlfImg from "../assets/mlfunda-img.jpg";
import nImg from "../assets/neural-img.png";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  User,
  Book,
  Video,
  BarChart2,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Clock,
  Star,
  Users,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  Grid,
  List,
  Menu,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";

// Sample data for demonstration purposes

const viewsData = [
  { month: "Jan", views: Math.floor(Math.random() * 8001) },
  { month: "Feb", views: Math.floor(Math.random() * 8001) },
  { month: "Mar", views: Math.floor(Math.random() * 8001) },
  { month: "Apr", views: Math.floor(Math.random() * 8001) },
  { month: "May", views: Math.floor(Math.random() * 8001) },
  { month: "Jun", views: Math.floor(Math.random() * 8001) },
  { month: "Jul", views: Math.floor(Math.random() * 8001) },
  { month: "Aug", views: Math.floor(Math.random() * 8001) },
  { month: "Sep", views: Math.floor(Math.random() * 8001) },
];

const playlistData = [
  {
    id: 1,
    title: "ML fundamentals",
    videos: 12,
    thumbnail: mlfImg,
    views: 8720,
    created: "Jan 15, 2025",
    lastUpdated: "Feb 20, 2025",
    category: "Intermediate ",
    status: "Published",
    rating: 4.8,
    engagement: 87,
  },
  {
    id: 2,
    title: "Probability and Statistics",
    videos: 8,
    thumbnail: probImg,
    views: 12450,
    created: "Nov 10, 2024",
    lastUpdated: "Jan 05, 2025",
    category: "Begineer ",
    status: "Published",
    rating: 4.7,
    engagement: 92,
  },
  {
    id: 3,
    title: "Neural Networks",
    videos: 15,
    thumbnail: nImg,
    views: 15280,
    created: "Aug 22, 2024",
    lastUpdated: "Dec 12, 2024",
    category: "Intermediate ",
    status: "Published",
    rating: 4.9,
    engagement: 95,
  },
  {
    id: 4,
    title: "Gen AI",
    videos: 10,
    thumbnail: genImg,
    views: 9470,
    created: "Feb 08, 2025",
    lastUpdated: "Feb 15, 2025",
    category: "Intermediate ",
    status: "Draft",
    rating: null,
    engagement: null,
  },
];

const videoInsights = [
  { name: "Data Preprocessing", views: parseInt(Math.random() * 20) },
  { name: "Supervised Learning", views: parseInt(Math.random() * 20) },
  { name: "Gen AI", views: parseInt(Math.random() * 20) },
];

const TeacherDashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const [view, setView] = useState("grid");
  const [playlists, setPlaylists] = useState(playlistData);
  const [sortBy, setSortBy] = useState("views");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [videoData, setVideoData] = useState([]);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");
  const [length, setLength] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "http://localhost:3000/user/getuserdata/instructor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        }
      );

      const value = await response.json();
      setFirstName(value.data.firstname);
      setLastName(value.data.lastname);
      setAvatar(value.data.avatar);
      setRole(value.data.role);
      setLength(value.data.playlist.length);
    }

    getData();
  }, []);

  console.log(firstname, lastname);
  console.log(length);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // TODO : get all videos
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "http://localhost:3000/user/getinstructorvideo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        }
      );

      const value = await response.json();
      setVideoData(value.data[0].playlist);
    }

    getData();
  }, []);

  console.log(videoData);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  };

  const sortedPlaylists = [...playlists].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleDragStart = (e, playlist, index) => {
    setIsDragging(true);
    setDraggedItem({ playlist, index });
    // This ghost image makes the drag more visual
    const ghostEl = document.createElement("div");
    ghostEl.classList.add("hidden");
    document.body.appendChild(ghostEl);
    e.dataTransfer.setDragImage(ghostEl, 0, 0);
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const items = [...playlists];
    const draggedPlaylist = items[draggedItem.index];
    items.splice(draggedItem.index, 1);
    items.splice(index, 0, draggedPlaylist);

    setPlaylists(items);
    setDraggedItem({ playlist: draggedPlaylist, index });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
  };

  const handlePlaylistClick = (playlist) => {
    setCurrentPlaylist(playlist);
  };

  function signouthandler() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const handleAddPlaylist = () => {
    navigate("/dashboard/instructor/playlist");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Mobile Menu Toggle */}
        <div className="fixed top-4 left-4 z-40 md:hidden">
          <button
            onClick={toggleSidebar}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-all duration-300 cursor-pointer"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar */}
        <motion.div
          className={`w-64 h-screen bg-gray-900 text-white fixed z-30 shadow-lg overflow-hidden`}
          initial={{ x: windowWidth < 768 ? -256 : 0 }}
          animate={{ x: sidebarOpen ? 0 : -256 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="px-6 py-8">
            <h1 className="text-xl font-bold mb-8">Teacher Portal</h1>

            <div className="flex items-center mb-8">
              <img
                src={avatar}
                alt={firstname}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3">
                <h2 className="font-semibold">{firstname + " " + lastname}</h2>
                <p className="text-sm text-gray-400">{role}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <motion.a
                href="#"
                className="flex items-center px-4 py-3 rounded-lg bg-indigo-700 text-white cursor-pointer"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Book className="mr-3" size={18} />
                <span>Courses</span>
              </motion.a>
              {/* <motion.a
                href="#"
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition cursor-pointer"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Video className="mr-3" size={18} />
                <span>Videos</span>
              </motion.a> */}
              {/* <motion.a
                href="#"
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition cursor-pointer"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <BarChart2 className="mr-3" size={18} />
                <span>Analytics</span>
              </motion.a> */}
            </nav>
          </div>

          <div className="absolute bottom-0 w-full px-6 py-4 border-t border-gray-800">
            <motion.a
              href="#"
              className="flex items-center text-gray-300 hover:text-white transition cursor-pointer"
              whileHover={{ x: 4 }}
              onClick={signouthandler}
            >
              <LogOut className="mr-3" size={18} />
              <span>Sign Out</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className={`flex-1 p-4 sm:p-6 transition-all duration-300 ease-in-out`}
          initial={{ marginLeft: windowWidth < 768 ? 0 : 256 }}
          animate={{ marginLeft: sidebarOpen && windowWidth >= 768 ? 256 : 0 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 mt-8 md:mt-0">
            <div>
              <h1 className="text-2xl font-bold">Course Playlists</h1>
              <p className="text-gray-600">Manage your educational content</p>
            </div>

            <motion.button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center mt-4 sm:mt-0 cursor-pointer"
              onClick={handleAddPlaylist}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="mr-2" size={18} />
              New Video
            </motion.button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <motion.div
              className="bg-white p-4 rounded-lg shadow"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Videos</p>
                  <h3 className="text-2xl font-bold"></h3>
                  {videoData.length}
                </div>
                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <Video className="text-purple-600" size={20} />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <ArrowUp size={14} />
                <span>8% from last month</span>
              </div>
            </motion.div>
            <motion.div
              className="bg-white p-4 rounded-lg shadow"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Views</p>
                  <h3 className="text-2xl font-bold"></h3>
                  {Math.floor(Math.random() * 21)}
                </div>
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <Eye className="text-blue-600" size={20} />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <ArrowUp size={14} />
                <span>15% from last month</span>
              </div>
            </motion.div>
          </div>

          {/* Views Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <motion.div
              className="lg:col-span-2 bg-white p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h3 className="font-bold mb-2 sm:mb-0">Playlist Views Trend</h3>
                <select className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer">
                  <option>Last 9 Months</option>
                  <option>Last 6 Months</option>
                  <option>Last 3 Months</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Top Performing Videos</h3>
                <a
                  href="#"
                  className="text-indigo-600 text-sm hover:underline cursor-pointer"
                >
                  View all
                </a>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={videoInsights}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="views"
                      fill="#6366f1"
                      barSize={20}
                      radius={[0, 4, 4, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Playlist Management */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h3 className="font-bold">Your Playlists</h3>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-2 sm:mt-0">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search playlists..."
                    className="pl-10 pr-4 py-1.5 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`p-1.5 rounded ${
                      view === "grid"
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    onClick={() => setView("grid")}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    className={`p-1.5 rounded ${
                      view === "list"
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    onClick={() => setView("list")}
                  >
                    <List size={18} />
                  </button>
                  <button className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    <Filter size={18} />
                    <span className="text-sm">Filter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Grid View */}
            {view === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {videoData.map((video, index) => (
                  <motion.div
                    key={video._id}
                    className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition cursor-pointer"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, video, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handlePlaylistClick(video)}
                    style={{
                      opacity:
                        isDragging && draggedItem?.index === index ? 0.5 : 1,
                    }}
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <div className="bg-white rounded-full p-1 shadow">
                          <MoreVertical size={18} className="text-gray-600" />
                        </div>
                      </div>
                      {video.isVerified && (
                        <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-gray-900 truncate">
                        {video.title}
                      </h4>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Eye size={14} className="mr-1" />
                          <span>{video.views}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={14} className="mr-1" />
                          <span>{video.duration} min</span>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 text-xs">
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                          {video.tags[0]}
                        </span>
                        <span className="ml-auto text-gray-500">
                          {new Date(video.uploadDate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* List View */}
            {view === "list" && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-100 py-2 px-4 text-sm font-medium text-gray-700">
                  <div
                    className="col-span-5 flex items-center cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    <span>Title</span>
                    {sortBy === "title" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? (
                          <ArrowUp size={14} />
                        ) : (
                          <ArrowDown size={14} />
                        )}
                      </span>
                    )}
                  </div>
                  <div
                    className="col-span-2 cursor-pointer"
                    onClick={() => handleSort("views")}
                  >
                    <span>Views</span>
                    {sortBy === "views" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? (
                          <ArrowUp size={14} />
                        ) : (
                          <ArrowDown size={14} />
                        )}
                      </span>
                    )}
                  </div>
                  <div className="col-span-1">Duration</div>
                  <div
                    className="col-span-2 cursor-pointer"
                    onClick={() => handleSort("uploadDate")}
                  >
                    <span>Date</span>
                    {sortBy === "uploadDate" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? (
                          <ArrowUp size={14} />
                        ) : (
                          <ArrowDown size={14} />
                        )}
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>

                {videoData.map((video, index) => (
                  <div
                    key={video._id}
                    className="grid grid-cols-12 py-3 px-4 border-b border-gray-100 hover:bg-gray-50 transition"
                    draggable
                    onDragStart={(e) => handleDragStart(e, video, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    style={{
                      opacity:
                        isDragging && draggedItem?.index === index ? 0.5 : 1,
                    }}
                  >
                    <div className="col-span-5 flex items-center">
                      <div className="relative w-12 h-12 mr-3 flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover rounded"
                        />
                        {video.isVerified && (
                          <div className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="truncate">
                        <div className="font-medium text-gray-900">
                          {video.title}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {video.description}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <Eye size={14} className="text-gray-400 mr-1" />
                      <span>{video.views}</span>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <Clock size={14} className="text-gray-400 mr-1" />
                      <span>{video.duration} min</span>
                    </div>
                    <div className="col-span-2 flex items-center text-sm text-gray-500">
                      {new Date(video.uploadDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="col-span-2 flex justify-end items-center space-x-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye size={18} />
                      </button>
                      <button className="p-1 text-indigo-600 hover:bg-indigo-50 rounded">
                        <Edit size={18} />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
