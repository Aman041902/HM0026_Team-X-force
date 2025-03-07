import React, { useState, useEffect } from 'react';

const VideoPlayer = () => {
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
  
  const [comments, setComments] = useState([
    { id: 1, user: "VideoFan123", text: "This is one of my favorite animated shorts! The animation quality is amazing.", likes: 432, time: "2 months ago" },
    { id: 2, user: "AnimationLover", text: "I can't believe this was made so many years ago. Still holds up today!", likes: 215, time: "3 months ago" },
    { id: 3, user: "CreativeArtist", text: "The character design is so expressive. Love the attention to detail.", likes: 178, time: "5 months ago" }
  ]);
  
  const [commentText, setCommentText] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
      setIsMediumScreen(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const relatedVideos = [
    { id: 2, title: "Sintel - Open Source Movie", thumbnail: "/api/placeholder/180/100", channel: "Blender Foundation", views: "8.2M views", uploadDate: "3 years ago" },
    { id: 3, title: "Tears of Steel", thumbnail: "/api/placeholder/180/100", channel: "Blender Foundation", views: "5.4M views", uploadDate: "2 years ago" },
    { id: 4, title: "Elephants Dream", thumbnail: "/api/placeholder/180/100", channel: "Blender Foundation", views: "7.1M views", uploadDate: "5 years ago" },
    { id: 5, title: "Animation Workflows", thumbnail: "/api/placeholder/180/100", channel: "TutorialsPlus", views: "2.3M views", uploadDate: "1 year ago" },
    { id: 6, title: "3D Character Rigging", thumbnail: "/api/placeholder/180/100", channel: "AnimationSchool", views: "1.8M views", uploadDate: "8 months ago" }
  ];
  
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

  return (
    <div className="bg-gray-100 w-full max-w-6xl mx-auto p-2 sm:p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main content area */}
        <div className="w-full lg:w-8/12 flex flex-col">
          {/* Video player */}
          <div className="bg-black w-full aspect-video">
            <video 
              className="w-full h-full" 
              src={activeVideo.url} 
              controls 
              poster="/api/placeholder/640/360"
            />
          </div>
          
          {/* Video info */}
          <div className="mt-3">
            <h1 className="text-lg sm:text-xl font-bold">{activeVideo.title}</h1>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-3">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300"></div>
                <div className="ml-2">
                  <p className="font-medium text-sm sm:text-base">{activeVideo.channel}</p>
                  <p className="text-xs sm:text-sm text-gray-600">1.2M subscribers</p>
                </div>
                <button className="ml-2 sm:ml-4 bg-red-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">Subscribe</button>
              </div>
              
              <div className="flex items-center flex-wrap gap-2">
                <div className="flex">
                  <button className="flex items-center bg-gray-200 px-2 py-1 sm:px-3 rounded-l-full text-xs sm:text-sm">
                    <span className="material-icons text-sm sm:text-base">thumb_up</span>
                    <span className="ml-1">{activeVideo.likes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center bg-gray-200 px-2 py-1 sm:px-3 rounded-r-full border-l border-gray-300 text-xs sm:text-sm">
                    <span className="material-icons text-sm sm:text-base">thumb_down</span>
                    <span className="ml-1">{activeVideo.dislikes.toLocaleString()}</span>
                  </button>
                </div>
                <button className="flex items-center bg-gray-200 px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm">
                  <span className="material-icons text-sm sm:text-base">share</span>
                  <span className="ml-1">Share</span>
                </button>
                <button className="flex items-center bg-gray-200 px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm">
                  <span className="material-icons text-sm sm:text-base">more_horiz</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Video description */}
          <div className="mt-4 bg-gray-200 p-2 sm:p-3 rounded-lg text-sm sm:text-base">
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <span>{activeVideo.views}</span>
              <span className="mx-1">•</span>
              <span>{activeVideo.uploadDate}</span>
            </div>
            <p className="mt-2">{activeVideo.description}</p>
            <button className="mt-2 text-gray-700 font-medium text-sm">Show more</button>
          </div>
          
          {/* Comments section */}
          <div className="mt-4 sm:mt-6">
            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">{comments.length} Comments</h2>
            
            {/* Add comment */}
            <div className="flex items-start mb-4 sm:mb-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
              <div className="ml-2 sm:ml-3 flex-grow">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full p-1 sm:p-2 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent text-sm sm:text-base"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div className="flex justify-end mt-1 sm:mt-2">
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
            <div className="space-y-3 sm:space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                  <div className="ml-2 sm:ml-3">
                    <div className="flex items-center">
                      <span className="font-medium text-xs sm:text-sm">{comment.user}</span>
                      <span className="ml-2 text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm">{comment.text}</p>
                    <div className="flex items-center mt-1 text-xs">
                      <button className="flex items-center mr-3">
                        <span className="material-icons text-xs sm:text-sm">thumb_up</span>
                        <span className="ml-1">{comment.likes}</span>
                      </button>
                      <button className="flex items-center mr-3">
                        <span className="material-icons text-xs sm:text-sm">thumb_down</span>
                      </button>
                      <button>Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar with related videos - on small screens, becomes horizontal scrolling */}
        <div className="w-full lg:w-4/12">
          <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Related Videos</h2>
          
          {isSmallScreen ? (
            <div className="flex overflow-x-auto pb-2 space-x-3">
              {relatedVideos.map((video) => (
                <div key={video.id} className="flex-shrink-0 w-64 cursor-pointer hover:bg-gray-200 rounded p-2">
                  <div className="w-full h-36 bg-gray-300">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-1">
                    <h3 className="font-medium text-xs sm:text-sm line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{video.channel}</p>
                    <p className="text-xs text-gray-600">{video.views} • {video.uploadDate}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : isMediumScreen ? (
            <div className="grid grid-cols-2 gap-2">
              {relatedVideos.map((video) => (
                <div key={video.id} className="cursor-pointer hover:bg-gray-200 rounded p-2">
                  <div className="w-full aspect-video bg-gray-300">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-1">
                    <h3 className="font-medium text-xs sm:text-sm line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{video.channel}</p>
                    <p className="text-xs text-gray-600">{video.views} • {video.uploadDate}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {relatedVideos.map((video) => (
                <div key={video.id} className="flex cursor-pointer hover:bg-gray-200 rounded p-2">
                  <div className="w-32 sm:w-40 h-20 sm:h-24 bg-gray-300 flex-shrink-0">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-2 flex-grow overflow-hidden">
                    <h3 className="font-medium text-xs sm:text-sm line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{video.channel}</p>
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