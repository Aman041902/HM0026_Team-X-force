import React, { useState } from 'react';
import { 
  User, Bell, BookOpen, Award, BarChart2, 
  Clock, ChevronRight, Play, Film, Star, 
  TrendingUp, CheckCircle, AlertCircle
} from 'lucide-react';

const StudentDashboard = () => {
  // Mock data
  const userData = {
    name: "Alex Thompson",
    avatar: "/api/placeholder/100/100",
    points: 2840,
    badges: 12,
    level: "Advanced Learner",
    completedCourses: 8,
    hoursWatched: 124
  };

  const ongoingCourses = [
    { id: 1, title: "Data Science Fundamentals", progress: 68, lastWatched: "Introduction to Neural Networks", totalVideos: 24, completedVideos: 16 },
    { id: 2, title: "Web Development Bootcamp", progress: 42, lastWatched: "CSS Grid Layouts", totalVideos: 36, completedVideos: 15 },
    { id: 3, title: "Spanish for Beginners", progress: 75, lastWatched: "Common Phrases Part 2", totalVideos: 20, completedVideos: 15 }
  ];

  const recommendedCourses = [
    { id: 1, title: "Machine Learning Applications", instructor: "Dr. Sarah Chen", rating: 4.8, students: 3420, thumbnail: "/api/placeholder/240/135" },
    { id: 2, title: "Advanced JavaScript Patterns", instructor: "Mark Williams", rating: 4.7, students: 2840, thumbnail: "/api/placeholder/240/135" },
    { id: 3, title: "UX Research Methods", instructor: "Priya Sharma", rating: 4.9, students: 1950, thumbnail: "/api/placeholder/240/135" },
    { id: 4, title: "Public Speaking Masterclass", instructor: "James Peterson", rating: 4.6, students: 5240, thumbnail: "/api/placeholder/240/135" }
  ];

  const leaderboardData = [
    { id: 1, name: "Alex Thompson", points: 2840, badges: 12, avatar: "/api/placeholder/40/40" },
    { id: 2, name: "Jamie Rodriguez", points: 2715, badges: 10, avatar: "/api/placeholder/40/40" },
    { id: 3, name: "Taylor Wilson", points: 2690, badges: 11, avatar: "/api/placeholder/40/40" },
    { id: 4, name: "Jordan Smith", points: 2580, badges: 9, avatar: "/api/placeholder/40/40" },
    { id: 5, name: "Casey Johnson", points: 2510, badges: 8, avatar: "/api/placeholder/40/40" }
  ];

  const upcomingQuizzes = [
    { id: 1, title: "Data Structures Quiz", course: "Computer Science 101", dueDate: "Mar 5" },
    { id: 2, title: "Spanish Vocabulary Test", course: "Spanish for Beginners", dueDate: "Mar 8" }
  ];

  const earnedBadges = [
    { id: 1, name: "Fast Learner", icon: "🚀", earnedDate: "Feb 10" },
    { id: 2, name: "Quiz Master", icon: "🧠", earnedDate: "Feb 18" },
    { id: 3, name: "Consistent Viewer", icon: "👁️", earnedDate: "Feb 25" }
  ];

  const nextBadges = [
    { id: 1, name: "Course Completer", icon: "🏁", requirement: "Complete 10 courses (2 more to go)" },
    { id: 2, name: "Discussion Leader", icon: "💬", requirement: "Participate in 15 forum discussions (8 more to go)" }
  ];

  const learningData = [
    { month: 'Sep', hours: 14 },
    { month: 'Oct', hours: 18 },
    { month: 'Nov', hours: 12 },
    { month: 'Dec', hours: 8 },
    { month: 'Jan', hours: 22 },
    { month: 'Feb', hours: 28 }
  ];

  // Max hours for scaling the graph
  const maxHours = Math.max(...learningData.map(d => d.hours));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">EduStream</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">3</span>
            </button>
            <div className="flex items-center">
              <img src={userData.avatar} alt="User avatar" className="h-10 w-10 rounded-full" />
              <span className="ml-2 font-medium text-gray-900">{userData.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile & Progress */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="bg-indigo-600 h-24 flex items-center justify-center">
                <h2 className="text-white text-xl font-bold">Student Dashboard</h2>
              </div>
              <div className="p-6 flex flex-col items-center -mt-10">
                <img src={userData.avatar} alt="User profile" className="h-20 w-20 rounded-full border-4 border-white shadow-md" />
                <h3 className="mt-2 text-xl font-bold text-gray-900">{userData.name}</h3>
                <p className="text-indigo-600">{userData.level}</p>
                <div className="mt-4 flex space-x-6">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-5 w-5" />
                      <span className="ml-1 font-bold text-lg text-gray-800">{userData.points}</span>
                    </div>
                    <span className="text-sm text-gray-500">Points</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-indigo-500">
                      <Award className="h-5 w-5" />
                      <span className="ml-1 font-bold text-lg text-gray-800">{userData.badges}</span>
                    </div>
                    <span className="text-sm text-gray-500">Badges</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="h-5 w-5" />
                      <span className="ml-1 font-bold text-lg text-gray-800">{userData.completedCourses}</span>
                    </div>
                    <span className="text-sm text-gray-500">Courses</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Journey Graph */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Your Learning Journey</h3>
                <TrendingUp className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="text-sm text-gray-500 mb-4">You've watched {userData.hoursWatched} hours of content</p>
              
              {/* Simple bar chart showing learning progress */}
              <div className="mt-4 flex items-end justify-between h-48 space-x-2">
                {learningData.map((data, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-indigo-500 rounded-t-md transition-all duration-300 hover:bg-indigo-600"
                      style={{ height: `${(data.hours / maxHours) * 100}%` }}
                    />
                    <div className="text-xs text-gray-600 mt-1">{data.month}</div>
                    <div className="text-xs font-medium">{data.hours}h</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Quizzes/Challenges */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Upcoming Quizzes</h3>
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="divide-y">
                {upcomingQuizzes.map(quiz => (
                  <div key={quiz.id} className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                        <p className="text-sm text-gray-500">{quiz.course}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="text-red-500 text-sm font-medium">Due {quiz.dueDate}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 text-sm font-medium">
                View All Assessments
              </button>
            </div>
          </div>

          {/* Middle Column - Current Learning & Recommended */}
          <div className="space-y-8 lg:col-span-2">
            {/* My Learning Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">My Learning</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {ongoingCourses.map(course => (
                  <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-900 mb-2">{course.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Last watched: {course.lastWatched}</span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                        <span>{course.completedVideos}/{course.totalVideos} videos complete</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                        <Play className="h-4 w-4 mr-1" />
                        Continue Learning
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center">
                        Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended For You */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recommended For You</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedCourses.map(course => (
                  <div key={course.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 mb-1">{course.title}</h4>
                      <p className="text-sm text-gray-500 mb-2">{course.instructor}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{course.rating}</span>
                          <span className="mx-1 text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{course.students.toLocaleString()} students</span>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges & Achievement Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Earned Badges */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Your Badges</h3>
                  <Award className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="space-y-3">
                  {earnedBadges.map(badge => (
                    <div key={badge.id} className="flex items-center p-2 border rounded-lg">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-2xl">
                        {badge.icon}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900">{badge.name}</h4>
                        <p className="text-xs text-gray-500">Earned on {badge.earnedDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Next Milestone</h4>
                  {nextBadges.map(badge => (
                    <div key={badge.id} className="flex items-center p-2 bg-gray-50 rounded-lg mb-2">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-2xl">
                        {badge.icon}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-700">{badge.name}</h4>
                        <p className="text-xs text-gray-500">{badge.requirement}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Leaderboard</h3>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View Full</button>
                </div>
                <div className="space-y-2">
                  {leaderboardData.map((user, index) => (
                    <div 
                      key={user.id} 
                      className={`flex items-center justify-between p-2 rounded-lg ${user.name === userData.name ? 'bg-indigo-50 border border-indigo-100' : ''}`}
                    >
                      <div className="flex items-center">
                        <div className={`flex items-center justify-center h-6 w-6 rounded-full ${index === 0 ? 'bg-yellow-100 text-yellow-800' : index === 1 ? 'bg-gray-100 text-gray-800' : index === 2 ? 'bg-orange-100 text-orange-800' : 'bg-indigo-50 text-indigo-800'} text-xs font-bold mr-2`}>
                          {index + 1}
                        </div>
                        <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full mr-2" />
                        <span className={`font-medium ${user.name === userData.name ? 'text-indigo-600' : 'text-gray-900'}`}>
                          {user.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 mr-4">{user.points} pts</div>
                        <div className="flex items-center text-indigo-500">
                          <Award className="h-4 w-4 mr-1" />
                          <span className="text-xs">{user.badges}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;