import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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
} from "lucide-react";

// Sample data for demonstration purposes
const teacherData = {
  name: "Dr. Sarah Miller",
  avatar: "/api/placeholder/100/100",
  subject: "Physics",
  joinDate: "August 2023",
  totalPlaylists: 14,
  totalVideos: 87,
  totalViews: 45920,
  followers: 1283,
};

const viewsData = [
  { month: "Jan", views: 3540 },
  { month: "Feb", views: 4120 },
  { month: "Mar", views: 3890 },
  { month: "Apr", views: 4680 },
  { month: "May", views: 5230 },
  { month: "Jun", views: 4870 },
  { month: "Jul", views: 6350 },
  { month: "Aug", views: 7120 },
  { month: "Sep", views: 6020 },
];

const playlistData = [
  {
    id: 1,
    title: "Advanced Quantum Mechanics",
    videos: 12,
    thumbnail: "/api/placeholder/160/90",
    views: 8720,
    created: "Jan 15, 2025",
    lastUpdated: "Feb 20, 2025",
    category: "Advanced Physics",
    status: "Published",
    rating: 4.8,
    engagement: 87,
  },
  {
    id: 2,
    title: "Fundamentals of Thermodynamics",
    videos: 8,
    thumbnail: "/api/placeholder/160/90",
    views: 12450,
    created: "Nov 10, 2024",
    lastUpdated: "Jan 05, 2025",
    category: "Intermediate Physics",
    status: "Published",
    rating: 4.7,
    engagement: 92,
  },
  {
    id: 3,
    title: "Introduction to Electromagnetism",
    videos: 15,
    thumbnail: "/api/placeholder/160/90",
    views: 15280,
    created: "Aug 22, 2024",
    lastUpdated: "Dec 12, 2024",
    category: "Beginner Physics",
    status: "Published",
    rating: 4.9,
    engagement: 95,
  },
  {
    id: 4,
    title: "Classical Mechanics Deep Dive",
    videos: 10,
    thumbnail: "/api/placeholder/160/90",
    views: 9470,
    created: "Feb 08, 2025",
    lastUpdated: "Feb 15, 2025",
    category: "Intermediate Physics",
    status: "Draft",
    rating: null,
    engagement: null,
  },
];

const videoInsights = [
  { name: "Quantum Wave Functions", views: 1250 },
  { name: "Entropy & The Second Law", views: 980 },
  { name: "Maxwell's Equations", views: 1420 },
  { name: "Newton's Laws Applied", views: 850 },
  { name: "Particle-Wave Duality", views: 1050 },
];

const TeacherDashboard = () => {
  const [view, setView] = useState("grid");
  const [playlists, setPlaylists] = useState(playlistData);
  const [sortBy, setSortBy] = useState("views");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  const navigate = useNavigate();

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

  function signouthandler()
  {
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 h-screen bg-gray-900 text-white fixed">
          <div className="px-6 py-8">
            <h1 className="text-xl font-bold mb-8">Teacher Portal</h1>

            <div className="flex items-center mb-8">
              <img
                src={teacherData.avatar}
                alt={teacherData.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3">
                <h2 className="font-semibold">{teacherData.name}</h2>
                <p className="text-sm text-gray-400">{teacherData.subject}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <a
                href="#"
                className="flex items-center px-4 py-3 rounded-lg bg-indigo-700 text-white"
              >
                <Book className="mr-3" size={18} />
                <span>Courses</span>
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
              >
                <Video className="mr-3" size={18} />
                <span>Videos</span>
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
              >
                <BarChart2 className="mr-3" size={18} />
                <span>Analytics</span>
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
              >
                <Users className="mr-3" size={18} />
                <span>Students</span>
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
              >
                <Settings className="mr-3" size={18} />
                <span>Settings</span>
              </a>
            </nav>
          </div>

          <div className="absolute bottom-0 w-full px-6 py-4 border-t border-gray-800">
            <a
              href="#"
              className="flex items-center text-gray-300 hover:text-white transition"
            >
              <LogOut className="mr-3" size={18} />
              <span onClick={signouthandler}>Sign Out</span>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Course Playlists</h1>
              <p className="text-gray-600">Manage your educational content</p>
            </div>

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center">
              <Plus className="mr-2" size={18} />
              New Playlist
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Playlists</p>
                  <h3 className="text-2xl font-bold">
                    {teacherData.totalPlaylists}
                  </h3>
                </div>
                <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <Book className="text-indigo-600" size={20} />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <ArrowUp size={14} />
                <span>12% from last month</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Videos</p>
                  <h3 className="text-2xl font-bold">
                    {teacherData.totalVideos}
                  </h3>
                </div>
                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <Video className="text-purple-600" size={20} />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <ArrowUp size={14} />
                <span>8% from last month</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Views</p>
                  <h3 className="text-2xl font-bold">
                    {teacherData.totalViews.toLocaleString()}
                  </h3>
                </div>
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <Eye className="text-blue-600" size={20} />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <ArrowUp size={14} />
                <span>15% from last month</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Followers</p>
                  <h3 className="text-2xl font-bold">
                    {teacherData.followers.toLocaleString()}
                  </h3>
                </div>
                <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <Users className="text-amber-600" size={20} />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <ArrowUp size={14} />
                <span>5% from last month</span>
              </div>
            </div>
          </div>

          {/* Views Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Playlist Views Trend</h3>
                <select className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm">
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
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Top Performing Videos</h3>
                <a href="#" className="text-indigo-600 text-sm hover:underline">
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
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Playlist Management */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Manage Playlists</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search playlists..."
                    className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <Search
                    className="absolute left-2 top-2.5 text-gray-400"
                    size={16}
                  />
                </div>

                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    className={`px-3 py-2 ${
                      view === "grid"
                        ? "bg-indigo-50 text-indigo-600"
                        : "bg-white text-gray-600"
                    }`}
                    onClick={() => setView("grid")}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    className={`px-3 py-2 ${
                      view === "list"
                        ? "bg-indigo-50 text-indigo-600"
                        : "bg-white text-gray-600"
                    }`}
                    onClick={() => setView("list")}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {view === "list" ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Playlist
                      </th>
                      <th
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
                        onClick={() => handleSort("views")}
                      >
                        <div className="flex items-center">
                          Views
                          {sortBy === "views" &&
                            (sortDirection === "asc" ? (
                              <ArrowUp size={14} className="ml-1" />
                            ) : (
                              <ArrowDown size={14} className="ml-1" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Status
                      </th>
                      <th
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
                        onClick={() => handleSort("created")}
                      >
                        <div className="flex items-center">
                          Created
                          {sortBy === "created" &&
                            (sortDirection === "asc" ? (
                              <ArrowUp size={14} className="ml-1" />
                            ) : (
                              <ArrowDown size={14} className="ml-1" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedPlaylists.map((playlist, index) => (
                      <tr
                        key={playlist.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                        draggable
                        onDragStart={(e) => handleDragStart(e, playlist, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        onClick={() => handlePlaylistClick(playlist)}
                        style={{ cursor: isDragging ? "grabbing" : "grab" }}
                      >
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <img
                              src={playlist.thumbnail}
                              alt={playlist.title}
                              className="w-12 h-8 object-cover rounded mr-3"
                            />
                            <div>
                              <div className="font-medium">
                                {playlist.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {playlist.videos} videos • {playlist.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {playlist.views.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              playlist.status === "Published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {playlist.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {playlist.created}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button className="p-1 text-gray-500 hover:text-indigo-600">
                              <Edit size={16} />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-red-600">
                              <Trash2 size={16} />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-gray-800">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedPlaylists.map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-indigo-300 transition"
                    draggable
                    onDragStart={(e) => handleDragStart(e, playlist, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handlePlaylistClick(playlist)}
                    style={{ cursor: isDragging ? "grabbing" : "grab" }}
                  >
                    <div className="relative">
                      <img
                        src={playlist.thumbnail}
                        alt={playlist.title}
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                        <div className="flex items-center text-white">
                          <Video size={14} className="mr-1" />
                          <span className="text-xs">
                            {playlist.videos} videos
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <h3 className="font-medium line-clamp-1">
                        {playlist.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {playlist.category}
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-sm">
                          <Eye size={14} className="text-gray-500 mr-1" />
                          <span>{playlist.views.toLocaleString()}</span>
                        </div>

                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            playlist.status === "Published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {playlist.status}
                        </span>
                      </div>

                      {playlist.rating && (
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <Star size={14} className="text-amber-500 mr-1" />
                            <span className="text-sm">{playlist.rating}</span>
                          </div>

                          <div className="flex items-center text-xs text-gray-500">
                            <Clock size={12} className="mr-1" />
                            <span>Updated {playlist.lastUpdated}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 p-2 flex justify-end border-t border-gray-200">
                      <button className="p-1 text-gray-500 hover:text-indigo-600 ml-1">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-red-600 ml-1">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-800 ml-1">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Playlist Details (Shows when a playlist is selected) */}
          {currentPlaylist && (
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">
                  Playlist Details: {currentPlaylist.title}
                </h3>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setCurrentPlaylist(null)}
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col md:flex-row">
                <img
                  src={currentPlaylist.thumbnail}
                  alt={currentPlaylist.title}
                  className="w-full md:w-64 h-36 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
                />

                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{currentPlaylist.category}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium">{currentPlaylist.status}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-medium">{currentPlaylist.created}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">
                        {currentPlaylist.lastUpdated}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Total Views</p>
                      <p className="font-medium">
                        {currentPlaylist.views.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Videos</p>
                      <p className="font-medium">{currentPlaylist.videos}</p>
                    </div>

                    {currentPlaylist.rating && (
                      <>
                        <div>
                          <p className="text-sm text-gray-500">Rating</p>
                          <div className="flex items-center">
                            <Star size={14} className="text-amber-500 mr-1" />
                            <span className="font-medium">
                              {currentPlaylist.rating}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Engagement</p>
                          <p className="font-medium">
                            {currentPlaylist.engagement}%
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition text-sm">
                      View Analytics
                    </button>
                    <button className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition text-sm">
                      Edit Playlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
