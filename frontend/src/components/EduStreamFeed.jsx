import React, { useEffect, useState } from "react";
import { Clock, MoreVertical, Search } from "lucide-react";
import {useSelector} from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer"
import mlImg from "../assets/ml-app.png";
import reImg from "../assets/react-logo.svg";
import cssImg from "../assets/css.png";
import aiImg from "../assets/aif.jpeg";
import techImg from "../assets/tech.webp";
import wizImg from "../assets/wizard.png";
import jsImg from "../assets/js-img.jpeg";
import Navbar1 from "./Navbar1";

const EduStreamFeed = () => {
  // Mock data representing educational videos

  const token = useSelector((state)=>state.auth.token)
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);

  useEffect(() => {

    async function getVideos() {
      try {
        const response = await fetch('http://localhost:3000/user/getvideos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token })
        })

        const value = await response.json();

        setVideos(value.data);
      }
      catch (error) {
        console.log(error.message)
      }
    }

    getVideos();
  }, [])

  async function clickhandler(e)
  {
    const id = videos[e.target.parentNode.parentNode.id]._id;

    try 
    {
      const response = await fetch('http://localhost:3000/user/videoisclicked',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token,videoId : id })
      })

    }
    catch(error)
    {
      console.log(error.message);
    }

    navigate(`/feed/${id}`)
  }

  function getDaysAgo(uploadDate) {
    const uploadDateObj = new Date(uploadDate);
    const currentDate = new Date();
    const timeDiff = currentDate - uploadDateObj; // Difference in milliseconds
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

    return `${daysDiff} days ago`;
  }

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      
      <Navbar1/>

      {/* Page Title */}
      {/* <div className="bg-white py-3 px-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">EduStream</h1>
      </div> */}

      {/* Categories - horizontally scrollable */}
      <div className="flex gap-2 overflow-x-auto p-3 bg-white mb-4 shadow-sm mt-20">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {videos.map((video, index) => (
          <div
            key={index}
            id={index}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            onClick={clickhandler}
          >
            {/* Video Thumbnail */}
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={`Thumbnail for ${video.title}`}
                className="h-60 w-full"
              />
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                {parseInt(video.duration / 60)} {":"} {parseInt(video.duration % 60)}
              </div>
            </div>
            {/* getDaysAgo(uploadDate) */}

            {/* Video Info */}
            <div className="p-3 flex">
              {/* Channel Image */}
              <div className="mr-3 flex-shrink-0">
                <div className="w-9 h-9 rounded-full overflow-hidden">
                  <img
                    src={video.instructor.avatar}
                    alt={video.instructor.firstname}
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
                  {video.instructor.firstname} {" "} {video.instructor.lastname}
                </p>
                <div className="flex items-center text-gray-600 text-xs mt-1">
                  <span>{video.views} views</span>
                  <span className="mx-1">•</span>
                  <span>{getDaysAgo(video.uploadDate)}</span>
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
