import React, { useState } from 'react';
import { 
  Play, Pause, Volume2, Settings, Maximize, 
  SkipForward, BarChart2, Award, CheckCircle, 
  Lock, Unlock, List, X, ChevronLeft, ChevronRight,
  ThumbsUp, MessageSquare, Share2, BookOpen,
  Info, HelpCircle, Star
} from 'lucide-react';

const CoursePlaylistPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Course data
  const courseData = {
    title: "Advanced JavaScript Concepts",
    instructor: "Mark Williams",
    totalVideos: 10,
    watchedVideos: 5,
    description: "Master advanced JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features.",
    rating: 4.8,
    students: 2840,
    totalHours: 14.5,
    level: "Intermediate",
    badges: ["JavaScript", "Web Development", "Front-end"]
  };

  // Videos in the playlist
  const playlistVideos = [
    { id: 1, title: "Course Introduction", duration: "5:42", isWatched: true, isLocked: false },
    { id: 2, title: "JavaScript Execution Context", duration: "18:24", isWatched: true, isLocked: false },
    { id: 3, title: "Closures and Lexical Scope", duration: "22:17", isWatched: true, isLocked: false },
    { id: 4, title: "Prototypal Inheritance", duration: "24:05", isWatched: true, isLocked: false },
    { id: 5, title: "The 'this' Keyword", duration: "19:53", isWatched: true, isLocked: false },
    { id: 6, title: "Async JavaScript & Promises", duration: "28:30", isWatched: false, isLocked: false, hasPreviousQuiz: true },
    { id: 7, title: "Modern ES6+ Features", duration: "32:15", isWatched: false, isLocked: true },
    { id: 8, title: "JavaScript Design Patterns", duration: "35:42", isWatched: false, isLocked: true },
    { id: 9, title: "Performance Optimization", duration: "26:18", isWatched: false, isLocked: true },
    { id: 10, title: "Real-world Project Application", duration: "45:10", isWatched: false, isLocked: true }
  ];

  // Current video data
  const currentVideo = playlistVideos[currentVideoIndex];

  // Quiz data
  const quizData = {
    title: "The 'this' Keyword Quiz",
    questions: [
      {
        id: 1,
        question: "In which context does 'this' refer to the global object in non-strict mode?",
        options: [
          { id: 'a', text: "Inside a method" },
          { id: 'b', text: "In a constructor function" },
          { id: 'c', text: "In a standalone function" },
          { id: 'd', text: "Inside an arrow function" }
        ],
        correctAnswer: 'c'
      },
      {
        id: 2,
        question: "What does 'this' refer to in an arrow function?",
        options: [
          { id: 'a', text: "The global object" },
          { id: 'b', text: "The object that defined the arrow function" },
          { id: 'c', text: "The lexical context where the arrow function is defined" },
          { id: 'd', text: "The object that called the arrow function" }
        ],
        correctAnswer: 'c'
      },
      {
        id: 3,
        question: "How can you explicitly set the value of 'this'?",
        options: [
          { id: 'a', text: "Using the call(), apply(), or bind() methods" },
          { id: 'b', text: "Using the this() method" },
          { id: 'c', text: "Using the setThis() method" },
          { id: 'd', text: "Using the contextify() method" }
        ],
        correctAnswer: 'a'
      }
    ],
    pointsAwarded: 50
  };

  // Recommended videos
  const recommendedVideos = [
    { id: 1, title: "Advanced React Hooks", instructor: "Sarah Chen", duration: "28:15", thumbnail: "/api/placeholder/160/90" },
    { id: 2, title: "TypeScript Fundamentals", instructor: "James Peterson", duration: "32:40", thumbnail: "/api/placeholder/160/90" },
    { id: 3, title: "Node.js Architecture", instructor: "Priya Sharma", duration: "24:22", thumbnail: "/api/placeholder/160/90" }
  ];

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // If we were showing a quiz and the user hits play, let's hide the quiz
    if (showQuiz) setShowQuiz(false);
  };

  // Play next video
  const playNextVideo = () => {
    if (currentVideoIndex < playlistVideos.length - 1) {
      if (playlistVideos[currentVideoIndex + 1].isLocked) {
        // Show quiz if the next video is locked
        setShowQuiz(true);
        setIsPlaying(false);
      } else {
        setCurrentVideoIndex(currentVideoIndex + 1);
        setIsPlaying(true);
      }
    }
  };

  // Play previous video
  const playPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setIsPlaying(true);
    }
  };

  // Handle quiz answer selection
  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId
    });
  };

  // Check quiz answers
  const checkQuizAnswers = () => {
    // In a real app, you'd validate the answers against correct ones
    // Here we'll simulate a passed quiz
    setQuizCompleted(true);
    // Unlock next video after quiz completion
    const updatedPlaylist = [...playlistVideos];
    if (currentVideoIndex + 1 < updatedPlaylist.length) {
      updatedPlaylist[currentVideoIndex + 1].isLocked = false;
    }
  };

  // Continue to next video after quiz
  const continueAfterQuiz = () => {
    setShowQuiz(false);
    setQuizCompleted(false);
    setSelectedAnswers({});
    if (currentVideoIndex + 1 < playlistVideos.length) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsPlaying(true);
    }
  };

  // Calculate progress percentage
  const progressPercentage = (courseData.watchedVideos / courseData.totalVideos) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">EduStream</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-1 rounded-full text-gray-500 hover:text-gray-700">
              <HelpCircle className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <img src="/api/placeholder/32/32" alt="User avatar" className="h-8 w-8 rounded-full" />
              <span className="font-medium text-gray-900">Alex T.</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* Main Content - Video Player + Info */}
        <div className={`flex-1 p-4 ${showSidebar ? 'md:mr-80' : ''}`}>
          {/* Course Title and Back Navigation */}
          <div className="mb-4">
            <button className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">{courseData.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span className="mr-2">by {courseData.instructor}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{courseData.rating}</span>
              </div>
              <span className="mx-2">•</span>
              <span>{courseData.level}</span>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg mb-6">
            {/* Video Element Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!isPlaying ? (
                <>
                  <img 
                    src="/api/placeholder/1280/720" 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={togglePlayPause}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-16 h-16 flex items-center justify-center"
                    >
                      <Play className="h-8 w-8" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <div className="text-white text-xl">
                    [Video playing: {currentVideo.title}]
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="h-1 w-full bg-gray-600 rounded-full">
                  <div 
                    className="h-1 bg-indigo-500 rounded-full"
                    style={{ width: `${(currentTime / 100) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <button onClick={togglePlayPause} className="hover:text-indigo-300">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <button onClick={playPreviousVideo} className="hover:text-indigo-300">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={playNextVideo} className="hover:text-indigo-300">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="text-xs">
                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / 
                    {currentVideo.duration}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center w-24">
                    <Volume2 className="h-4 w-4 mr-2" />
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volume} 
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <button className="hover:text-indigo-300">
                    <Settings className="h-5 w-5" />
                  </button>
                  <button className="hover:text-indigo-300">
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quiz Overlay */}
            {showQuiz && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center p-6">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
                  {!quizCompleted ? (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">{quizData.title}</h2>
                        <button onClick={() => setShowQuiz(false)} className="text-gray-500 hover:text-gray-700">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">Complete this quiz to unlock the next video!</p>
                      <div className="space-y-6 mb-6">
                        {quizData.questions.map((question) => (
                          <div key={question.id} className="border rounded-lg p-4">
                            <p className="font-medium text-gray-900 mb-3">{question.question}</p>
                            <div className="space-y-2">
                              {question.options.map((option) => (
                                <div 
                                  key={option.id}
                                  onClick={() => handleAnswerSelect(question.id, option.id)}
                                  className={`p-3 rounded-lg cursor-pointer border ${
                                    selectedAnswers[question.id] === option.id 
                                      ? 'bg-indigo-50 border-indigo-300' 
                                      : 'hover:bg-gray-50 border-gray-200'
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div className={`h-4 w-4 rounded-full border ${
                                      selectedAnswers[question.id] === option.id 
                                        ? 'bg-indigo-600 border-indigo-600' 
                                        : 'border-gray-300'
                                    }`}>
                                      {selectedAnswers[question.id] === option.id && (
                                        <div className="h-2 w-2 rounded-full bg-white mx-auto mt-1" />
                                      )}
                                    </div>
                                    <span className="ml-3">{option.text}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <button 
                          onClick={checkQuizAnswers}
                          disabled={Object.keys(selectedAnswers).length !== quizData.questions.length}
                          className={`px-4 py-2 rounded-md font-medium ${
                            Object.keys(selectedAnswers).length === quizData.questions.length
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Submit Answers
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center py-6">
                        <div className="flex justify-center mb-4">
                          <div className="rounded-full bg-green-100 p-3">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                        <p className="text-gray-600 mb-4">You've earned {quizData.pointsAwarded} points and unlocked the next video.</p>
                        <div className="flex justify-center">
                          <button 
                            onClick={continueAfterQuiz}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
                          >
                            Continue to Next Video
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Video Information and Engagement */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentVideo.title}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Video {currentVideoIndex + 1} of {playlistVideos.length} • {currentVideo.duration}
                </p>
              </div>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <button className="flex items-center text-gray-700 hover:text-indigo-600">
                  <ThumbsUp className="h-5 w-5 mr-1" />
                  <span>Like</span>
                </button>
                <button className="flex items-center text-gray-700 hover:text-indigo-600">
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span>Comment</span>
                </button>
                <button className="flex items-center text-gray-700 hover:text-indigo-600">
                  <Share2 className="h-5 w-5 mr-1" />
                  <span>Share</span>
                </button>
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-gray-700">
                {courseData.description}
              </p>
            </div>
          </div>

          {/* Badge Completion Prompt */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-indigo-100 rounded-full p-2 mr-4">
                <Award className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Complete this playlist to earn a badge!</h3>
                <p className="text-sm text-gray-600">Finish all videos and quizzes to earn the "JavaScript Expert" badge.</p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-indigo-600"
                  style={{
                    clipPath: progressPercentage === 0
                      ? `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`  // Default square shape
                      : progressPercentage === 100
                      ? `path('M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90')`  // Full circle
                      : `path('M 50,50 m 0,-45 a 45,45 0 ${progressPercentage / 100 * 360 <= 180 ? 0 : 1} 1 ${Math.sin(progressPercentage / 100 * Math.PI * 2) * 45 + 50},${-Math.cos(progressPercentage / 100 * Math.PI * 2) * 45 + 50} a 45,45 0 ${progressPercentage / 100 * 360 <= 180 ? 0 : 1} 1 ${-Math.sin(progressPercentage / 100 * Math.PI * 2) * 45},${Math.cos(progressPercentage / 100 * Math.PI * 2) * 45}')`  // Partial circle
                  }}
                  
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-indigo-600">
                  {Math.round(progressPercentage)}%
                </div>
              </div>
            </div>
          </div>

          {/* Next Videos Recommendations */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Next</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedVideos.map(video => (
                <div key={video.id} className="flex space-x-3 border rounded-lg p-3 hover:shadow-md cursor-pointer transition-shadow">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">{video.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{video.instructor}</p>
                    <p className="text-gray-500 text-xs mt-1">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Playlist */}
        <div 
          className={`
            fixed top-0 right-0 bottom-0 w-80 bg-white shadow-lg z-20 transition-transform transform
            ${showSidebar ? 'translate-x-0' : 'translate-x-full'}
            mt-16 pt-4 md:pt-0 md:mt-0 md:relative md:h-screen overflow-y-auto
          `}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-bold text-gray-900">Course Playlist</h3>
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Your Progress</span>
              <span className="text-sm text-indigo-600 font-medium">{courseData.watchedVideos}/{courseData.totalVideos} videos</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Playlist Items */}
          <div className="divide-y">
            {playlistVideos.map((video, index) => (
              <div 
                key={video.id}
                onClick={() => {
                  if (!video.isLocked) {
                    setCurrentVideoIndex(index);
                    setIsPlaying(true);
                  }
                }}
                className={`
                  p-4 hover:bg-gray-50 cursor-pointer transition-colors
                  ${currentVideoIndex === index ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''}
                  ${video.isLocked ? 'opacity-60' : ''}
                `}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {video.isWatched ? (
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      ) : video.isLocked ? (
                        <Lock className="h-5 w-5 text-gray-400" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div>
                      <h4 className={`font-medium text-sm ${video.isLocked ? 'text-gray-500' : 'text-gray-900'}`}>
                        {video.title}
                      </h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">{video.duration}</span>
                        {video.hasPreviousQuiz && (
                          <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">Quiz</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {currentVideoIndex === index && (
                    <div className="bg-indigo-100 rounded-full p-1">
                      <Play className="h-4 w-4 text-indigo-600" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Auto-Next Video Toggle */}
          <div className="p-4 border-t mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <SkipForward className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Auto-play next video</span>
              </div>
              <label className="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden fixed bottom-4 right-4 bg-indigo-600 text-white rounded-full p-3 shadow-lg z-30"
        >
          {showSidebar ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
        </button>
      </main>
    </div>
  );
};

export default CoursePlaylistPage;