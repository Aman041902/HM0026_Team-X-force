import React, { useState, useRef } from 'react';
import { MoreVertical, ChevronLeft, ThumbsUp, ThumbsDown, Share, Save, Flag, Play, Pause, Volume2, VolumeX, Settings, Maximize, MessageSquare, User, Send } from 'lucide-react';
import './LandingPage.css'
import reImg from "../assets/react-logo.svg";
import cssImg from "../assets/css.png";
import aiImg from "../assets/aif.jpeg";
import techImg from "../assets/tech.webp";
import wizImg from "../assets/wizard.png";
import jsImg from "../assets/js-img.jpeg";

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const videoRef = useRef(null);
  
  // Sample video data
  const videos = [
    {
      id: 1,
      title: 'How to Build a React Application from Scratch',
      thumbnail: reImg,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '14:35',
      channelName: 'React Mastery',
      channelImage: '/api/placeholder/80/80',
      views: '245K',
      timeAgo: '2 weeks ago',
      description: 'Learn how to build a complete React application from scratch. This tutorial covers components, state management, routing, and more.',
      likes: '15K',
      subscribers: '1.2M',
      comments: [
        {
          id: 101,
          user: 'CodeExplorer',
          text: 'This tutorial helped me understand React components so much better. Thank you!',
          timeAgo: '3 days ago',
          likes: 45,
          replies: 5
        },
        {
          id: 102,
          user: 'WebDevNewbie',
          text: 'Could you make a follow-up tutorial about Redux integration?',
          timeAgo: '1 week ago',
          likes: 32,
          replies: 2
        }
      ]
    },
    {
      id: 2,
      title: 'Advanced CSS Techniques Every Developer Should Know',
      thumbnail: cssImg,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '10:22',
      channelName: 'CSS Wizards',
      channelImage: '/api/placeholder/80/80',
      views: '189K',
      timeAgo: '5 days ago',
      description: 'Discover advanced CSS techniques that will take your web development skills to the next level. Learn about grid layouts, animations, and more.',
      likes: '12K',
      subscribers: '890K',
      comments: [
        {
          id: 201,
          user: 'DesignGeek',
          text: 'Your explanation of grid layouts finally made it click for me!',
          timeAgo: '2 days ago',
          likes: 38,
          replies: 3
        }
      ]
    },
    {
      id: 3,
      title: 'JavaScript Promises and Async/Await Explained',
      thumbnail: reImg,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '18:47',
      channelName: 'JS Pro Tips',
      channelImage: '/api/placeholder/80/80',
      views: '320K',
      timeAgo: '3 weeks ago',
      description: 'A comprehensive guide to understanding JavaScript Promises and Async/Await. Learn how to handle asynchronous operations effectively.',
      likes: '22K',
      subscribers: '1.5M',
      comments: [
        {
          id: 301,
          user: 'AsyncMaster',
          text: 'Finally a clear explanation of Promises that makes sense!',
          timeAgo: '5 days ago',
          likes: 67,
          replies: 8
        }
      ]
    },
    {
      id: 4,
      title: 'Building Responsive Websites with Tailwind CSS',
      thumbnail: cssImg,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '21:05',
      channelName: 'Tailwind Tutorials',
      channelImage: '/api/placeholder/80/80',
      views: '178K',
      timeAgo: '1 month ago',
      description: 'Learn how to use Tailwind CSS to build beautiful, responsive websites quickly. This tutorial covers the basics and advanced techniques.',
      likes: '10K',
      subscribers: '750K',
      comments: [
        {
          id: 401,
          user: 'ResponsiveWizard',
          text: 'Tailwind has changed how I approach CSS forever. Great tutorial!',
          timeAgo: '2 weeks ago',
          likes: 29,
          replies: 4
        }
      ]
    },
    {
      id: 5,
      title: 'Getting Started with TypeScript in 2025',
      thumbnail: reImg,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '15:30',
      channelName: 'TypeScript Tutorials',
      channelImage: '/api/placeholder/80/80',
      views: '210K',
      timeAgo: '1 week ago',
      description: 'A beginner-friendly introduction to TypeScript in 2025. Learn how to set up your development environment and start using TypeScript today.',
      likes: '18K',
      subscribers: '950K',
      comments: [
        {
          id: 501,
          user: 'TypeMaster',
          text: 'As someone who was afraid of TypeScript before, this made it so approachable!',
          timeAgo: '4 days ago',
          likes: 42,
          replies: 6
        }
      ]
    },
    {
      id: 6,
      title: 'Modern UI Design Principles for Web Developers',
      thumbnail: cssImg,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '22:15',
      channelName: 'UI/UX Masters',
      channelImage: '/api/placeholder/80/80',
      views: '290K',
      timeAgo: '3 days ago',
      description: 'Discover modern UI design principles that will help you create better user experiences. Learn about color theory, typography, and more.',
      likes: '25K',
      subscribers: '1.8M',
      comments: [
        {
          id: 601,
          user: 'UXEnthusiast',
          text: 'Your explanation of color theory changed how I think about UI design completely!',
          timeAgo: '1 day ago',
          likes: 53,
          replies: 7
        }
      ]
    },
  ];
  
  // Close the maximized video and return to grid view
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedVideo(null);
    setIsPlaying(false);
  };
  
  // Handle clicking on a video thumbnail
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Handle timeupdate event
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };
  
  // Format time in mm:ss
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    if (duration === 0) return 0;
    return (currentTime / duration) * 100;
  };
  
  // Handle seek on progress bar click
  const handleProgressClick = (e) => {
    if (!videoRef.current) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    
    videoRef.current.currentTime = clickPosition * videoRef.current.duration;
  };
  
  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    // In a real app, you would send this to an API
    // For now, we'll just reset the input
    setCommentText('');
    
    // You could also update the comments array if needed
    // This would require more state management
  };
  
  // Handle video loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      
      // Auto-play when loaded
      if (isPlaying) {
        videoRef.current.play();
      }
    }
  };
  
  // Handle video ended
  const handleVideoEnded = () => {
    setIsPlaying(false);
  };
  
  // Get related videos based on the selected video
  const getRelatedVideos = () => {
    if (!selectedVideo) return [];
    // In a real app, you would use tags or categories to find related videos
    // For this example, we'll just exclude the currently selected video
    return videos.filter(video => video.id !== selectedVideo.id);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {selectedVideo ? (
        // Video player view when a video is selected
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 animate-fadeIn">
          <div className="lg:col-span-2 space-y-4">
            {/* Video Player */}
            <div className="bg-black relative rounded-lg overflow-hidden shadow-lg">
              <video
                ref={videoRef}
                src={selectedVideo.videoUrl}
                poster={selectedVideo.thumbnail}
                className="w-full h-auto"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleVideoEnded}
                muted={isMuted}
                playsInline
              />
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex flex-col justify-between p-4">
                {/* Top Controls */}
                <div className="flex justify-between">
                  <button 
                    onClick={handleClose} 
                    className="bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                </div>
                
                {/* Center Play Button */}
                <div className="flex-grow flex items-center justify-center">
                  {!isPlaying && (
                    <button 
                      onClick={togglePlay}
                      className="bg-white bg-opacity-80 text-black p-6 rounded-full hover:bg-opacity-100 transition-all"
                    >
                      <Play size={32} fill="currentColor" />
                    </button>
                  )}
                </div>
                
                {/* Bottom Controls */}
                <div className="flex flex-col space-y-2">
                  {/* Progress Bar */}
                  <div 
                    className="w-full bg-gray-600 h-2 rounded-full overflow-hidden cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="bg-red-600 h-full rounded-full" 
                      style={{ width: `${calculateProgress()}%` }} 
                    />
                  </div>
                  
                  {/* Control Buttons */}
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <button onClick={togglePlay} className="hover:text-gray-300">
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <button onClick={toggleMute} className="hover:text-gray-300">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                      <span className="text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="hover:text-gray-300">
                        <Settings size={20} />
                      </button>
                      <button className="hover:text-gray-300">
                        <Maximize size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Info */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h1 className="text-xl font-bold">{selectedVideo.title}</h1>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  <span className="text-gray-700">{selectedVideo.views} views</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-700">{selectedVideo.timeAgo}</span>
                </div>
                <div className="flex space-x-4">
                  <button className="flex items-center text-gray-700 hover:text-blue-600">
                    <ThumbsUp size={18} className="mr-1" />
                    <span>{selectedVideo.likes}</span>
                  </button>
                  <button className="flex items-center text-gray-700 hover:text-blue-600">
                    <ThumbsDown size={18} className="mr-1" />
                  </button>
                  <button className="flex items-center text-gray-700 hover:text-blue-600">
                    <Share size={18} className="mr-1" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center text-gray-700 hover:text-blue-600">
                    <Save size={18} className="mr-1" />
                    <span>Save</span>
                  </button>
                  <button className="flex items-center text-gray-700 hover:text-blue-600">
                    <Flag size={18} />
                  </button>
                </div>
              </div>
              
              {/* Channel Info */}
              <div className="flex items-center justify-between mt-4 pb-4 border-b">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={selectedVideo.channelImage} 
                      alt={selectedVideo.channelName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedVideo.channelName}</h3>
                    <p className="text-gray-600 text-sm">{selectedVideo.subscribers} subscribers</p>
                  </div>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
                  Subscribe
                </button>
              </div>
              
              {/* Video Description */}
              <div className="mt-4">
                <p className="text-gray-800">{selectedVideo.description}</p>
              </div>
            </div>
            
            {/* Comments Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <MessageSquare size={20} className="mr-2 text-gray-700" />
                <h2 className="font-bold text-lg">Comments</h2>
                <span className="ml-2 text-gray-600 text-sm">
                  {selectedVideo.comments ? selectedVideo.comments.length : 0} comments
                </span>
              </div>
              
              {/* Add comment form */}
              <form onSubmit={handleCommentSubmit} className="flex items-start mb-6 space-x-2">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <User size={40} className="w-full h-full bg-gray-200 p-2" />
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  disabled={!commentText.trim()}
                >
                  <Send size={20} />
                </button>
              </form>
              
              {/* Comments list */}
              <div className="space-y-4">
                {selectedVideo.comments && selectedVideo.comments.map(comment => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                      <User size={40} className="w-full h-full p-2" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <h4 className="font-medium text-sm">{comment.user}</h4>
                        <span className="mx-2 text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                      </div>
                      <p className="mt-1 text-sm">{comment.text}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <button className="flex items-center text-gray-600 text-xs hover:text-blue-600">
                          <ThumbsUp size={14} className="mr-1" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="flex items-center text-gray-600 text-xs hover:text-blue-600">
                          <ThumbsDown size={14} className="mr-1" />
                        </button>
                        <button className="text-gray-600 text-xs font-medium hover:text-blue-600">
                          REPLY
                        </button>
                      </div>
                      {comment.replies > 0 && (
                        <button className="flex items-center text-blue-600 text-xs mt-2 font-medium">
                          <ChevronLeft size={16} className="transform rotate-90 mr-1" />
                          View {comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Related Videos */}
          <div className="space-y-4 animate-slideIn">
            <h2 className="font-bold text-lg ml-2">Related Videos</h2>
            {getRelatedVideos().map((video) => (
              <div 
                key={video.id} 
                className="bg-white rounded-lg shadow flex overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative w-40 flex-shrink-0">
                  <img 
                    src={video.thumbnail} 
                    alt={`Thumbnail for ${video.title}`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-2 flex-grow">
                  <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
                  <p className="text-gray-600 text-xs mt-1">{video.channelName}</p>
                  <div className="flex items-center text-gray-600 text-xs mt-1">
                    <span>{video.views} views</span>
                    <span className="mx-1">•</span>
                    <span>{video.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Video grid view (default)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 animate-fadeIn">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer transform hover:scale-105 transition-transform duration-200"
              onClick={() => handleVideoClick(video)}
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
      )}
    </div>
  );
};

export default VideoGallery;