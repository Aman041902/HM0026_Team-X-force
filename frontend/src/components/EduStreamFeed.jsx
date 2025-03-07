import React from "react";
import { Clock, MoreVertical, Search } from "lucide-react";
import { Link } from "react-router-dom";
import mlImg from "../assets/ml-app.png";
import reImg from "../assets/react-logo.svg";
import cssImg from "../assets/css.png";
import aiImg from "../assets/aif.jpeg";
import techImg from "../assets/tech.webp";
import wizImg from "../assets/wizard.png";
import jsImg from "../assets/js-img.jpeg";
import Navbar1 from "./Navbar1";
import VideoGallery from "./VideoGallery";

const EduStreamFeed = () => {
  // Mock data representing educational videos
  const videos = [
    {
      id: 1,
      thumbnail: reImg,
      title: "How to Build a React Application from Scratch",
      channelName: "React Masters",
      channelImage: reImg,
      views: "1.2M",
      timeAgo: "3 weeks ago",
      duration: "18:24",
    },
    {
      id: 2,
      thumbnail: cssImg,
      title: "Learn CSS Grid in 20 Minutes | Easy Tutorial 2025",
      channelName: "CSS Pro Tips",
      channelImage: cssImg,
      views: "458K",
      timeAgo: "6 days ago",
      duration: "21:32",
    },
    {
      id: 3,
      thumbnail: aiImg,
      title: "The Future of AI in 2025 | What You Need to Know",
      channelName: "Tech Insights",
      channelImage: techImg,
      views: "2.8M",
      timeAgo: "1 month ago",
      duration: "15:07",
    },
    {
      id: 4,
      thumbnail: jsImg,
      title: "Advanced JavaScript Techniques Every Developer Should Know",
      channelName: "JS Wizards",
      channelImage: wizImg,
      views: "763K",
      timeAgo: "2 weeks ago",
      duration: "24:18",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen font-sans">
      {/* Header */}

      
      <Navbar1/>
      

      {/* Page Title */}
      {/* <div className="bg-white py-3 px-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">EduStream</h1>
      </div> */}

      {/* Categories - horizontally scrollable */}
      <div className="mt-20 flex gap-2 overflow-x-auto p-3 bg-white mb-4 shadow-sm">
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
          Cyber Security
        </div>
      </div>

      {/* Video Grid - responsive with different column counts */}
     

      <VideoGallery/>
    </div>
  );
};

export default EduStreamFeed;
