import React from "react";
import { Clock, MoreVertical, Search } from "lucide-react";
import { Link } from "react-router-dom";

const EduStreamFeed = () => {
  // Mock data representing educational videos
  const videos = [
    {
      id: 1,
      thumbnail: "/api/placeholder/640/360",
      title: "How to Build a React Application from Scratch",
      channelName: "React Masters",
      channelImage: "/api/placeholder/48/48",
      views: "1.2M",
      timeAgo: "3 weeks ago",
      duration: "18:24",
    },
    {
      id: 2,
      thumbnail: "/api/placeholder/640/360",
      title: "Learn CSS Grid in 20 Minutes | Easy Tutorial 2025",
      channelName: "CSS Pro Tips",
      channelImage: "/api/placeholder/48/48",
      views: "458K",
      timeAgo: "6 days ago",
      duration: "21:32",
    },
    {
      id: 3,
      thumbnail: "/api/placeholder/640/360",
      title: "The Future of AI in 2025 | What You Need to Know",
      channelName: "Tech Insights",
      channelImage: "/api/placeholder/48/48",
      views: "2.8M",
      timeAgo: "1 month ago",
      duration: "15:07",
    },
    {
      id: 4,
      thumbnail: "/api/placeholder/640/360",
      title: "Advanced JavaScript Techniques Every Developer Should Know",
      channelName: "JS Wizards",
      channelImage: "/api/placeholder/48/48",
      views: "763K",
      timeAgo: "2 weeks ago",
      duration: "24:18",
    },
    {
      id: 5,
      thumbnail: "/api/placeholder/640/360",
      title: "Machine Learning Fundamentals Explained Simply",
      channelName: "AI Academy",
      channelImage: "/api/placeholder/48/48",
      views: "1.5M",
      timeAgo: "1 month ago",
      duration: "32:45",
    },
    {
      id: 6,
      thumbnail: "/api/placeholder/640/360",
      title: "The Complete Guide to Data Structures and Algorithms",
      channelName: "CS Fundamentals",
      channelImage: "/api/placeholder/48/48",
      views: "893K",
      timeAgo: "2 weeks ago",
      duration: "45:12",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            E
          </div>
          <span className="font-bold text-xl hidden sm:inline">EduStream</span>
        </div>

        {/* Search bar - responsive */}
        <div className="hidden md:flex flex-grow mx-6 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for educational content..."
              className="w-full py-2 px-4 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-0 top-0 bottom-0 bg-gray-100 px-4 rounded-r-full border border-l-0 border-gray-300">
              <Search size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-100 rounded-full p-2 md:hidden">
            <Search size={18} />
          </div>
          <div className="bg-gray-100 rounded-full p-2">
            <Clock size={18} />
          </div>

          <Link
            to="/dashboard/student"
            className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold"
          >
            A
          </Link>
        </div>
      </div>

      {/* Page Title */}
      <div className="bg-white py-3 px-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">EduStream</h1>
      </div>

      {/* Categories - horizontally scrollable */}
      <div className="flex gap-2 overflow-x-auto p-3 bg-white mb-4 shadow-sm">
        <div className="bg-blue-600 text-white rounded-full px-4 py-1 whitespace-nowrap">
          All
        </div>
        <div className="bg-gray-200 rounded-full px-4 py-1 whitespace-nowrap">
          Computer Science
        </div>
        <div className="bg-gray-200 rounded-full px-4 py-1 whitespace-nowrap">
          Web Development
        </div>
        <div className="bg-gray-200 rounded-full px-4 py-1 whitespace-nowrap">
          Data Science
        </div>
        <div className="bg-gray-200 rounded-full px-4 py-1 whitespace-nowrap">
          Mathematics
        </div>
        <div className="bg-gray-200 rounded-full px-4 py-1 whitespace-nowrap">
          Languages
        </div>
        <div className="bg-gray-200 rounded-full px-4 py-1 whitespace-nowrap">
          Business
        </div>
        <div className="bg-gray-200 rounded-full px-4 py-1 whitespace-nowrap">
          Arts
        </div>
      </div>

      {/* Video Grid - responsive with different column counts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Video Thumbnail */}
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={`Thumbnail for ${video.title}`}
                className="w-full h-auto"
              />
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-3 flex">
              {/* Channel Image */}
              <div className="mr-3 flex-shrink-0">
                <div className="w-9 h-9 rounded-full overflow-hidden">
                  <img
                    src={video.channelImage}
                    alt={video.channelName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Video Details */}
              <div className="flex-grow">
                <h3 className="font-medium text-sm line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-xs mt-1">
                  {video.channelName}
                </p>
                <div className="flex items-center text-gray-600 text-xs mt-1">
                  <span>{video.views} views</span>
                  <span className="mx-1">•</span>
                  <span>{video.timeAgo}</span>
                </div>
              </div>

              <div className="ml-2 flex-shrink-0">
                <MoreVertical size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EduStreamFeed;
