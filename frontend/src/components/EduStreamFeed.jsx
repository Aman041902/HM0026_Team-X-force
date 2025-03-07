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
import { BookOpen } from "lucide-react";

const EduStreamFeed = () => {
  // Mock data representing educational videos

  const token = useSelector((state)=>state.auth.token)
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchInput,setSearchInput] = useState('');

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
  }, [searchInput])

   useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  

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

   useEffect(() => {
      setIsScrolled(false);
    }, [location]);

  function getDaysAgo(uploadDate) {
    const uploadDateObj = new Date(uploadDate);
    const currentDate = new Date();
    const timeDiff = currentDate - uploadDateObj; // Difference in milliseconds
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

    return `${daysDiff} days ago`;
  }

  async function searchclickhandler()
  {
    try 
    {
      console.log(searchInput)
      const response = await fetch('http://localhost:3000/user/feed/getvideo/search',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'token' : token
        },
        body : JSON.stringify({searchInput : searchInput})
      })

      const value = await response.json();

      console.log(value,value.data)

      setVideos(value.data);
    }
    catch(error)
    {
      console.log(error.message);
    }
  }

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      
      <div className={`min-h-20 fixed top-0 left-0 w-full z-50 transition-all duration-300 flex justify-center gap-2 sm:gap-20 lg:gap-52 items-center ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-gradient-to-r from-blue-600 to-indigo-700 py-4"
      }`}>

      <Link to="/" className="flex items-center group">
          <BookOpen className={`h-8 w-8 ${isScrolled ? "text-blue-600" : "text-white"}`} />
          <span
            className={`ml-2 text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-blue-600" : "text-white"
            }`}
          >
            Edu<span className="text-yellow-400">Stream</span>
          </span>
        </Link>
          
            <div className="hidden md:flex flex-grow mx-6 max-w-xl ">
                    <div className="h-fit  relative w-full">
                      <input
                        type="text"
                        placeholder="Search for educational content..."
                        className="w-full py-2 bg-white px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=>{setSearchInput(e.target.value)}}
                      />
                      <button className=" absolute right-0 top-0 bottom-0  px-4 rounded-r-full border border-l-0 border-gray-300 " onClick={searchclickhandler}>
                        <Search size={18} />
                      </button>
                    </div>
                  </div>

                   <div className="flex items-center gap-3">
                          <div className="bg-gray-100 rounded-full p-2 md:hidden">
                              <Search size={18} />
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
      {/* <div className="bg-white py-3 px-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">EduStream</h1>
      </div> */}

      {/* Categories - horizontally scrollable */}
      <div className="flex gap-2 overflow-x-auto p-3 bg-white mb-4 shadow-sm mt-24">
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
        {videos.length>0 ? videos.map((video, index) => (
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
        )) : <div className="p-4 rounded-xl bg-gray-200 text-4xl font-bold text-center content-center"> No videos found </div>}
      </div>
    </div>
  );
};

export default EduStreamFeed;
