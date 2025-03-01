import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Play, Award, Trophy, ArrowUpRight, Clock, CheckCircle, BarChart2, Film, BookOpen, ArrowRight } from 'lucide-react';

// Sample data for demonstration
const userData = {
  name: "Alex Johnson",
  avatar: "/api/placeholder/100/100",
  points: 2450,
  badges: 12,
  rank: 3,
  joined: "Sep 2024",
  totalHours: 78,
  completedCourses: 8,
  quizAverage: 87,
};

const progressData = [
  { day: 'Mon', hours: 1.5, points: 120 },
  { day: 'Tue', hours: 2.3, points: 185 },
  { day: 'Wed', hours: 1.2, points: 95 },
  { day: 'Thu', hours: 3.5, points: 280 },
  { day: 'Fri', hours: 2.0, points: 160 },
  { day: 'Sat', hours: 4.1, points: 330 },
  { day: 'Sun', hours: 2.8, points: 225 },
];

const completedPlaylists = [
  { id: 1, title: "Algebra Foundations", videos: 12, completed: "Feb 15, 2025", category: "Math", icon: "🧮" },
  { id: 2, title: "Introduction to Chemistry", videos: 8, completed: "Feb 5, 2025", category: "Science", icon: "🧪" },
  { id: 3, title: "World History: Ancient Civilizations", videos: 15, completed: "Jan 28, 2025", category: "History", icon: "🏛️" },
];

const ongoingPlaylists = [
  { id: 4, title: "Advanced Physics", videos: 18, completed: 12, progress: 67, category: "Science", icon: "⚛️" },
  { id: 5, title: "Literature Analysis", videos: 10, completed: 4, progress: 40, category: "English", icon: "📚" },
];

const watchHistory = [
  { id: 1, title: "Quantum Mechanics Part 3", duration: "28:15", watched: "Yesterday", playlist: "Advanced Physics", thumbnail: "/api/placeholder/160/90" },
  { id: 2, title: "Shakespeare's Tragedies", duration: "42:30", watched: "2 days ago", playlist: "Literature Analysis", thumbnail: "/api/placeholder/160/90" },
  { id: 3, title: "Energy Conservation Laws", duration: "35:10", watched: "3 days ago", playlist: "Advanced Physics", thumbnail: "/api/placeholder/160/90" },
  { id: 4, title: "Poetry Analysis Techniques", duration: "31:45", watched: "4 days ago", playlist: "Literature Analysis", thumbnail: "/api/placeholder/160/90" },
];

const quizPerformance = [
  { id: 1, title: "Physics: Energy & Forces", score: 92, date: "Feb 28, 2025", questions: 15 },
  { id: 2, title: "Literature: Shakespeare", score: 88, date: "Feb 26, 2025", questions: 12 },
  { id: 3, title: "Physics: Quantum Theory", score: 78, date: "Feb 24, 2025", questions: 18 },
  { id: 4, title: "English: Poetry Analysis", score: 85, date: "Feb 22, 2025", questions: 10 },
];

const recommendations = [
  { id: 1, title: "Thermodynamics Explained", duration: "45:20", playlist: "Advanced Physics", thumbnail: "/api/placeholder/160/90", reason: "Based on your Physics videos" },
  { id: 2, title: "Understanding Hamlet", duration: "38:15", playlist: "Literature Analysis", thumbnail: "/api/placeholder/160/90", reason: "Continue your Literature progress" },
  { id: 3, title: "Modern Poetry Forms", duration: "27:30", playlist: "Literature Analysis", thumbnail: "/api/placeholder/160/90", reason: "Related to your recent watches" },
  { id: 4, title: "String Theory Basics", duration: "52:10", playlist: "Advanced Physics", thumbnail: "/api/placeholder/160/90", reason: "Popular in Physics" },
];

const ProfileProgressPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const lastWatchedVideo = watchHistory[0];

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Section - Profile Overview */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <img src={userData.avatar} alt={userData.name} className="w-20 h-20 rounded-full border-4 border-white shadow-md" />
              
              <div className="md:ml-6 mt-4 md:mt-0">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-indigo-100">Member since {userData.joined} • Rank #{userData.rank}</p>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-auto flex flex-wrap gap-4">
                <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 flex items-center">
                  <Trophy className="text-yellow-300 mr-2" size={20} />
                  <div>
                    <div className="text-xl font-bold">{userData.points}</div>
                    <div className="text-xs">Total Points</div>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 flex items-center">
                  <Award className="text-yellow-300 mr-2" size={20} />
                  <div>
                    <div className="text-xl font-bold">{userData.badges}</div>
                    <div className="text-xs">Badges Earned</div>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 flex items-center">
                  <Clock className="text-yellow-300 mr-2" size={20} />
                  <div>
                    <div className="text-xl font-bold">{userData.totalHours}</div>
                    <div className="text-xs">Learning Hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Resume Last Watched */}
          <div className="p-4 border-b border-gray-200 bg-indigo-50">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <Play className="text-indigo-600" size={16} />
                </div>
                <div>
                  <h3 className="font-medium">Resume Learning</h3>
                  <p className="text-sm text-gray-600">{lastWatchedVideo.title}</p>
                </div>
              </div>
              
              <button className="mt-3 md:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center">
                Continue Watching <ArrowRight className="ml-1" size={16} />
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {['overview', 'playlists', 'history', 'quizzes', 'recommendations'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${
                    activeTab === tab 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Main Content Area */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Learning Progress Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <BarChart2 className="mr-2 text-indigo-600" size={20} />
                  Learning Progress
                </h2>
                <select className="bg-gray-100 border border-gray-300 text-sm rounded-md px-2 py-1">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>Last 3 Months</option>
                </select>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="points" stroke="#8884d8" activeDot={{ r: 8 }} name="Points" />
                    <Line yAxisId="right" type="monotone" dataKey="hours" stroke="#82ca9d" name="Hours" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-center mt-2">
                <div className="flex items-center mx-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mr-1"></div>
                  <span className="text-xs text-gray-600">Points Earned</span>
                </div>
                <div className="flex items-center mx-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span className="text-xs text-gray-600">Hours Studied</span>
                </div>
              </div>
            </div>
            
            {/* Achievement Stats */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Trophy className="mr-2 text-indigo-600" size={20} />
                Quick Stats
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-gray-600">Quiz Average</div>
                  <div className="font-medium text-lg">{userData.quizAverage}%</div>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-gray-600">Completed Courses</div>
                  <div className="font-medium text-lg">{userData.completedCourses}</div>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-gray-600">In Progress</div>
                  <div className="font-medium text-lg">{ongoingPlaylists.length}</div>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-gray-600">Videos Watched</div>
                  <div className="font-medium text-lg">124</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-gray-600">Quizzes Taken</div>
                  <div className="font-medium text-lg">32</div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg flex items-center justify-center font-medium hover:bg-indigo-200 transition">
                  <Award className="mr-2" size={16} />
                  View All Achievements
                </button>
              </div>
            </div>
            
            {/* Recent Activity Feed */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="mr-2 text-indigo-600" size={20} />
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="text-green-600" size={16} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Completed quiz "Physics: Energy & Forces" with score 92%</p>
                    <p className="text-xs text-gray-500">Today, 10:35 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Film className="text-blue-600" size={16} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Watched "Quantum Mechanics Part 3"</p>
                    <p className="text-xs text-gray-500">Yesterday, 7:20 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <BookOpen className="text-purple-600" size={16} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Started new playlist "Literature Analysis"</p>
                    <p className="text-xs text-gray-500">3 days ago, 2:45 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition">
                  View All Activity
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'playlists' && (
          <div className="space-y-6">
            {/* Ongoing Playlists */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Ongoing Playlists</h2>
              
              <div className="space-y-4">
                {ongoingPlaylists.map(playlist => (
                  <div key={playlist.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{playlist.icon}</div>
                        <div>
                          <h3 className="font-medium">{playlist.title}</h3>
                          <p className="text-sm text-gray-600">{playlist.category} • {playlist.completed}/{playlist.videos} videos</p>
                        </div>
                      </div>
                      
                      <button className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition text-sm flex items-center">
                        Continue <ArrowRight className="ml-1" size={14} />
                      </button>
                    </div>
                    
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${playlist.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-600">{playlist.progress}% complete</span>
                        <span className="text-xs text-gray-600">Est. {Math.ceil((playlist.videos - playlist.completed) * 0.5)} hours left</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Completed Playlists */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Completed Playlists</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedPlaylists.map(playlist => (
                  <div key={playlist.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{playlist.icon}</div>
                      <div>
                        <h3 className="font-medium">{playlist.title}</h3>
                        <p className="text-sm text-gray-600">{playlist.category} • {playlist.videos} videos</p>
                        <div className="mt-1 flex items-center">
                          <CheckCircle className="text-green-500 mr-1" size={14} />
                          <span className="text-xs text-gray-500">Completed on {playlist.completed}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Watch History */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Watch History</h2>
              
              <div className="space-y-4">
                {watchHistory.map(video => (
                  <div key={video.id} className="flex border-b border-gray-100 pb-4">
                    <img src={video.thumbnail} alt={video.title} className="w-40 h-24 object-cover rounded-md" />
                    
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-sm text-gray-600">{video.playlist}</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-500">{video.duration}</span>
                        <span className="text-xs text-gray-500">Watched {video.watched}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition">
                  View Full History
                </button>
              </div>
            </div>
            
            {/* Quiz Performance */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Quiz Performance</h2>
              
              <div className="space-y-4">
                {quizPerformance.map(quiz => (
                  <div key={quiz.id} className="border-b border-gray-100 pb-3">
                    <h3 className="font-medium">{quiz.title}</h3>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-600">{quiz.questions} questions</span>
                      <span className="text-sm text-gray-600">{quiz.date}</span>
                    </div>
                    
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            quiz.score >= 90 ? 'bg-green-500' : 
                            quiz.score >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${quiz.score}%` }}
                        ></div>
                      </div>
                      <span className={`font-medium ${
                        quiz.score >= 90 ? 'text-green-600' : 
                        quiz.score >= 75 ? 'text-yellow-600' : 'text-red-600'
                      }`}>{quiz.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <button className="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg flex items-center justify-center font-medium hover:bg-indigo-200 transition">
                  <BarChart2 className="mr-2" size={16} />
                  View Detailed Analytics
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'recommendations' && (
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Recommended Videos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map(video => (
                <div key={video.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition">
                  <div className="flex">
                    <img src={video.thumbnail} alt={video.title} className="w-40 h-24 object-cover rounded-md" />
                    
                    <div className="ml-3 flex-1">
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-sm text-gray-600">{video.playlist}</p>
                      <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
                      
                      <div className="mt-2 bg-indigo-50 rounded px-2 py-1 inline-flex items-center">
                        <ArrowUpRight className="text-indigo-500 mr-1" size={12} />
                        <span className="text-xs text-indigo-600">{video.reason}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                View More Recommendations
              </button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ProfileProgressPage;