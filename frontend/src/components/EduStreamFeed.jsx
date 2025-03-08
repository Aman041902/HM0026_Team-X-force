import React, { useEffect, useState } from "react";
import { Clock, MoreVertical, Search, Menu, X, Bell, Home, Compass, BookOpen, Settings, Play } from "lucide-react";
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

// Thumbnail fallback mapping
const thumbnailMap = {
  'machine-learning': mlImg,
  'react': reImg,
  'css': cssImg,
  'ai': aiImg,
  'tech': techImg,
  'javascript': jsImg,
  'default': techImg
};

const EduStreamFeed = () => {
  // Mock data representing educational videos

  const token = useSelector((state)=>state.auth.token)
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchInput,setSearchInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Function to get appropriate thumbnail
  const getThumbnail = (video) => {
    if (video.thumbnail) return video.thumbnail;
    
    // Check video title for keywords to match with fallback images
    const title = video.title.toLowerCase();
    if (title.includes('machine learning')) return thumbnailMap['machine-learning'];
    if (title.includes('react')) return thumbnailMap['react'];
    if (title.includes('css')) return thumbnailMap['css'];
    if (title.includes('ai') || title.includes('artificial intelligence')) return thumbnailMap['ai'];
    if (title.includes('javascript') || title.includes('js')) return thumbnailMap['javascript'];
    
    return thumbnailMap['default'];
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Enhanced Header/Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-gradient-to-r from-blue-600 to-indigo-700"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-opacity-10 hover:bg-white lg:hidden"
              >
                {isMobileMenuOpen ? 
                  <X className={isScrolled ? "text-gray-700" : "text-white"} size={24} /> : 
                  <Menu className={isScrolled ? "text-gray-700" : "text-white"} size={24} />
                }
              </button>
              
              <Link to="/" className="flex items-center group">
                <BookOpen className={`h-8 w-8 ${isScrolled ? "text-blue-600" : "text-white"}`} />
                <span className={`ml-2 text-2xl font-bold ${isScrolled ? "text-blue-600" : "text-white"}`}>
                  Edu<span className="text-yellow-400">Stream</span>
                </span>
              </Link>
            </div>

            {/* Search Section */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for educational content..."
                  className="w-full py-2.5 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Search 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <button 
                  onClick={searchclickhandler}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-opacity-10 hover:bg-white md:hidden">
                <Search className={isScrolled ? "text-gray-700" : "text-white"} size={20} />
              </button>
              
              {/* <button className="p-2 rounded-full hover:bg-opacity-10 hover:bg-white hidden md:block">
                <Bell className={isScrolled ? "text-gray-700" : "text-white"} size={20} />
              </button>
               */}
              <Link
                to="/dashboard/student"
                className="w-9 h-9 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow duration-300"
              >
                A
              </Link>
            </div>
          </div>

          {/* Mobile Search - Shown when menu is open */}
          <div className={`md:hidden px-4 pb-3 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <button 
                onClick={searchclickhandler}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-2 sm:px-4 max-w-[1440px] mx-auto">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
          <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-full whitespace-nowrap hover:bg-blue-700 transition-colors">
            All Videos
          </button>
          <button className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-full whitespace-nowrap hover:bg-gray-300 transition-colors">
            Computer Science
          </button>
          <button className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-full whitespace-nowrap hover:bg-gray-300 transition-colors">
            Web Development
          </button>
          <button className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-full whitespace-nowrap hover:bg-gray-300 transition-colors">
            Data Science
          </button>
          <button className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-full whitespace-nowrap hover:bg-gray-300 transition-colors">
            Cyber Security
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 py-4">
          {videos.length > 0 ? videos.map((video, index) => (
            <div
              key={index}
              id={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              onClick={clickhandler}
            >
              {/* Enhanced Thumbnail */}
              <div className="relative aspect-video group">
                <img
                  src={getThumbnail(video)}
                  alt={`Thumbnail for ${video.title}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = thumbnailMap['default'];
                  }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                    <Play className="w-5 h-5 text-blue-600 ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-1.5 right-1.5 bg-black bg-opacity-80 text-white text-[10px] px-1.5 py-0.5 rounded">
                  {parseInt(video.duration / 60)}:{String(parseInt(video.duration % 60)).padStart(2, '0')}
                </div>

                {/* Category Tag - if you have category information */}
                {video.category && (
                  <div className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded">
                    {video.category}
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-2.5">
                <div className="flex space-x-2">
                  {/* Channel Image */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-100 hover:border-blue-500 transition-colors duration-300">
                      <img
                        src={video.instructor.avatar}
                        alt={video.instructor.firstname}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = wizImg; // Default instructor avatar
                        }}
                      />
                    </div>
                  </div>

                  {/* Video Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-gray-800 line-clamp-2 mb-0.5 hover:text-blue-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-xs hover:text-blue-600 transition-colors truncate">
                      {video.instructor.firstname} {video.instructor.lastname}
                    </p>
                    <div className="flex items-center text-gray-500 text-[11px] mt-0.5">
                      <span>{video.views.toLocaleString()} views</span>
                      <span className="mx-1">•</span>
                      <span>{getDaysAgo(video.uploadDate)}</span>
                    </div>
                  </div>

                  <button className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical size={14} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full flex items-center justify-center p-6">
              <div className="text-center bg-white p-6 rounded-xl shadow-sm">
                <div className="text-5xl mb-3">🎓</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Videos Found</h3>
                <p className="text-gray-600 text-sm">Try adjusting your search criteria</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default EduStreamFeed;
