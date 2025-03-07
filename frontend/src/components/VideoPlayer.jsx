import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const YouTubeStylePlayer = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [activeVideo, setActiveVideo] = useState({
    id: 1,
    title: "Big Buck Bunny",
    channel: "Blender Foundation",
    views: "12M views",
    uploadDate: "4 years ago",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.",
    likes: 285000,
    dislikes: 12500
  });


  const [relatedVideos,setRelatedVideos] = useState([{ id: 2, title: "Sintel - Open Source Movie", thumbnail: "/api/placeholder/180/100", channel: "Blender Foundation", views: "8.2M views", uploadDate: "3 years ago" }]);
  
  
  const location = useLocation();
  const segments = location.pathname.split('/');
  const videoId = segments[segments.length - 1];

  // State for description expand/collapse
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    async function getVideoInformation() {
      try {
        const response = await fetch('http://localhost:3000/user/feed/67cac2823d7ad8025f42ac34', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token })
        });

        const value = await response.json();
        const video = value.data[0];
        setActiveVideo(video);
      } catch(error) {
        console.log(error.message);
      }
    }

    async function getRelativeVideo()
    {
       try 
       {
        const response = await fetch('http://localhost:3000/user/getvideos',{
          method : 'POST',
          headers :
          {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({token : token})
        })

        const value = await response.json();
        const video = value.data;
        const newVideo = video.slice(0, 10);
        
        console.log(newVideo);
        setRelatedVideos(newVideo);
       }
       catch(error)
       {
        console.log(error.message);
       }
    }

    getVideoInformation();
    getRelativeVideo();
  }, [token]);

  const [comments, setComments] = useState([
    { id: 1, user: "VideoFan123", text: "This is one of my favorite animated shorts! The animation quality is amazing.", likes: 432, time: "2 months ago" },
    { id: 2, user: "AnimationLover", text: "I can't believe this was made so many years ago. Still holds up today!", likes: 215, time: "3 months ago" },
    { id: 3, user: "CreativeArtist", text: "The character design is so expressive. Love the attention to detail.", likes: 178, time: "5 months ago" }
  ]);
  
  const [commentText, setCommentText] = useState("");
  const [screenSize, setScreenSize] = useState('large');
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('small');
      } else if (window.innerWidth < 1024) {
        setScreenSize('medium');
      } else {
        setScreenSize('large');
      }
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
 
  const addComment = () => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: comments.length + 1,
      user: "CurrentUser",
      text: commentText,
      likes: 0,
      time: "Just now"
    };
    
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  // Toggle description visibility
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  function clickhandler(e)
  {
    const id = relatedVideos[e.target.parentNode.parentNode.id]._id;
    navigate(`/feed/${id}`)
  }

  function getDate(timestamp) {
    const dateOnly = timestamp.split("T")[0];
    return dateOnly;
  }


  return (
    <div className="bg-gray-100 w-full mx-auto p-1 sm:p-2 md:p-4 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-2 md:gap-4">
        {/* Main content area */}
        <div className="w-full lg:w-8/12 flex flex-col">
          {/* Video player */}
          <div className="bg-black w-full aspect-video">
            <video 
              className="w-full h-full" 
              src={activeVideo.url} 
              controls 
              autoPlay
              poster="/api/placeholder/640/360"
            />
          </div>
          
          {/* Video info */}
          <div className="mt-2 md:mt-3">
            <h1 className="text-base sm:text-lg md:text-xl font-bold">{activeVideo.title}</h1>
            <div className="flex flex-wrap items-center justify-between mt-1 md:mt-2 gap-2">
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-300"></div>
                <div className="ml-2">
                  <p className="font-medium text-xs sm:text-sm md:text-base">{activeVideo.channel}</p>
                </div>
                <button className="ml-2 md:ml-4 bg-red-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-medium">Subscribe</button>
              </div>
              
              <div className="flex items-center">
                <button className="flex items-center bg-gray-200 px-2 py-1 md:px-3 rounded-full text-xs sm:text-sm">
                  <span className="material-icons text-xs sm:text-sm md:text-base">thumb_up</span>
                  <span className="ml-1">{activeVideo.likes.toLocaleString()}</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Video description - with proper overflow handling */}
          <div className="mt-3 md:mt-4 bg-gray-200 p-2 md:p-3 rounded-lg text-xs sm:text-sm md:text-base">
            <div className="flex items-center text-xs md:text-sm text-gray-600">
              <span>{activeVideo.views}</span>
              <span className="mx-1"> views •</span>
              <span>{getDate(activeVideo.uploadDate)}</span>
            </div>
            <div className={`mt-1 md:mt-2 ${showFullDescription ? '' : 'line-clamp-2'} overflow-hidden`}>
              <p>{activeVideo.description}</p>
            </div>
            <button 
              onClick={toggleDescription}
              className="mt-1 md:mt-2 text-gray-700 font-medium text-xs sm:text-sm"
            >
              {showFullDescription ? "Show less" : "Show more"}
            </button>
          </div>
          
          {/* Comments section */}
          <div className="mt-3 md:mt-6">
            <h2 className="text-sm md:text-lg font-bold mb-2 md:mb-4">{comments.length} Comments</h2>
            
            {/* Add comment */}
            <div className="flex items-start mb-3 md:mb-6">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
              <div className="ml-2 flex-grow">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full p-1 md:p-2 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent text-xs sm:text-sm"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div className="flex justify-end mt-1 md:mt-2">
                  <button className="px-2 py-1 mr-2 rounded-full text-gray-500 text-xs sm:text-sm">Cancel</button>
                  <button 
                    className="px-2 py-1 rounded-full bg-blue-500 text-white disabled:bg-gray-300 text-xs sm:text-sm"
                    disabled={!commentText.trim()}
                    onClick={addComment}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
            
            {/* Comments list */}
            <div className="space-y-2 md:space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                  <div className="ml-2">
                    <div className="flex items-center">
                      <span className="font-medium text-xs sm:text-sm">{comment.user}</span>
                      <span className="ml-2 text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm">{comment.text}</p>
                    <div className="flex items-center mt-1 text-xs">
                      <button className="flex items-center mr-3">
                        <span className="material-icons text-xs">thumb_up</span>
                        <span className="ml-1">{comment.likes}</span>
                      </button>
                      <button className="flex items-center mr-3">
                        <span className="material-icons text-xs">thumb_down</span>
                      </button>
                      <button>Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar with related videos - adapts to different screen sizes */}
        <div className="w-full lg:w-4/12 mt-3 lg:mt-0">
          <h2 className="text-sm md:text-lg font-bold mb-2">Related Videos</h2>
          
          {screenSize === 'small' ? (
            <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
              {relatedVideos.map((video,index) => (
                <div key={index} id={index} className="flex-shrink-0 w-56 cursor-pointer hover:bg-gray-200 rounded p-1" onClick={clickhandler}>
                  <div className="w-full h-32 bg-gray-300">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-1">
                    <h3 className="font-medium text-xs line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-gray-600">{video.channel}</p>
                    <p className="text-xs text-gray-600">{video.views} • {video.uploadDate}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : screenSize === 'medium' ? (
            <div className="grid grid-cols-2 gap-2">
              {relatedVideos.map((video,index) => (
                <div key={index} id={index} className="cursor-pointer hover:bg-gray-200 rounded p-1" onClick={clickhandler}>
                  <div className="w-full aspect-video bg-gray-300">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-1">
                    <h3 className="font-medium text-xs line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-gray-600">{video.channel}</p>
                    <p className="text-xs text-gray-600">{video.views} • {video.uploadDate}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {relatedVideos.map((video,index) => (
                <div key={index} id={index} className="flex cursor-pointer hover:bg-gray-200 rounded p-1" onClick={clickhandler}>
                  <div className="w-28 sm:w-32 md:w-40 h-16 sm:h-20 md:h-24 bg-gray-300 flex-shrink-0">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-2 flex-grow overflow-hidden">
                    <h3 className="font-medium text-xs line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-gray-600">{video.channel}</p>
                    <p className="text-xs text-gray-600">{video.views} • {video.uploadDate}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;