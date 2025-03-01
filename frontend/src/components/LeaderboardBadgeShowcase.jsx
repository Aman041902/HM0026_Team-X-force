import React, { useState, useEffect } from 'react';
import { Bell, Award, Users, ChevronUp, ChevronDown, Filter, Trophy } from 'lucide-react';

// Sample data - in a real app this would come from your API
const sampleStudents = [
  { id: 1, name: "Alex Johnson", avatar: "/api/placeholder/50/50", points: 2450, badges: 12, rank: 1, prevRank: 2, region: "North", subjects: ["Math", "Science"] },
  { id: 2, name: "Jamie Smith", avatar: "/api/placeholder/50/50", points: 2300, badges: 10, rank: 2, prevRank: 1, region: "East", subjects: ["History", "English"] },
  { id: 3, name: "Taylor Brown", avatar: "/api/placeholder/50/50", points: 2100, badges: 9, rank: 3, prevRank: 3, region: "West", subjects: ["Science", "Art"] },
  { id: 4, name: "Morgan Wilson", avatar: "/api/placeholder/50/50", points: 1950, badges: 8, rank: 4, prevRank: 6, region: "South", subjects: ["Math", "Music"] },
  { id: 5, name: "Casey Miller", avatar: "/api/placeholder/50/50", points: 1820, badges: 7, rank: 5, prevRank: 4, region: "North", subjects: ["English", "History"] },
  { id: 6, name: "Jordan Lee", avatar: "/api/placeholder/50/50", points: 1700, badges: 7, rank: 6, prevRank: 5, region: "East", subjects: ["Science", "Math"] },
  { id: 7, name: "Riley Davis", avatar: "/api/placeholder/50/50", points: 1650, badges: 6, rank: 7, prevRank: 8, region: "West", subjects: ["Art", "Music"] },
  { id: 8, name: "Quinn Thomas", avatar: "/api/placeholder/50/50", points: 1580, badges: 5, rank: 8, prevRank: 7, region: "South", subjects: ["History", "Science"] },
];

const sampleBadges = [
  { id: 1, name: "Math Master", icon: "🧮", earned: true, date: "2025-02-15" },
  { id: 2, name: "Science Whiz", icon: "🔬", earned: true, date: "2025-02-20" },
  { id: 3, name: "History Buff", icon: "📜", earned: true, date: "2025-01-10" },
  { id: 4, name: "English Expert", icon: "📚", earned: false, progress: 80 },
  { id: 5, name: "Art Virtuoso", icon: "🎨", earned: false, progress: 65 },
  { id: 6, name: "Music Maestro", icon: "🎵", earned: false, progress: 40 },
];

const sampleChallenges = [
  { id: 1, name: "Complete 10 Math quizzes", reward: "Math Genius Badge", deadline: "Mar 15, 2025", progress: 7 },
  { id: 2, name: "Join 5 study groups", reward: "Team Player Badge", deadline: "Mar 10, 2025", progress: 3 },
  { id: 3, name: "Perfect score on Science exam", reward: "Einstein Badge", deadline: "Mar 20, 2025", progress: 0 },
];

const regions = ["All Regions", "North", "South", "East", "West"];
const subjects = ["All Subjects", "Math", "Science", "History", "English", "Art", "Music"];

const LeaderboardBadgeShowcase = () => {
  const [students, setStudents] = useState(sampleStudents);
  const [badges, setBadges] = useState(sampleBadges);
  const [challenges, setChallenges] = useState(sampleChallenges);
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [showAnimation, setShowAnimation] = useState(false);
  const [badgeAnimation, setBadgeAnimation] = useState(false);
  
  useEffect(() => {
    // Simulate rank change animations on component mount
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 3000);
    
    // Simulate a badge unlock after 2 seconds
    setTimeout(() => {
      setBadgeAnimation(true);
      setTimeout(() => setBadgeAnimation(false), 3000);
    }, 2000);
  }, []);
  
  // Filter students based on selected region and subject
  const filteredStudents = students.filter(student => {
    const regionMatch = regionFilter === "All Regions" || student.region === regionFilter;
    const subjectMatch = subjectFilter === "All Subjects" || student.subjects.includes(subjectFilter);
    return regionMatch && subjectMatch;
  });
  
  const getRankChangeIcon = (student) => {
    if (student.rank < student.prevRank) {
      return <ChevronUp className={`text-green-500 ${showAnimation ? 'animate-bounce' : ''}`} />;
    } else if (student.rank > student.prevRank) {
      return <ChevronDown className={`text-red-500 ${showAnimation ? 'animate-bounce' : ''}`} />;
    }
    return <span className="px-2">-</span>;
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">Leaderboard & Badge Showcase</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard Panel */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center"><Trophy className="mr-2" /> Top Students</h2>
            <div className="flex space-x-2">
              <div className="relative">
                <select 
                  className="bg-indigo-700 text-white p-2 rounded-md text-sm appearance-none pr-8"
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <Filter className="absolute right-2 top-2.5 w-4 h-4" />
              </div>
              <div className="relative">
                <select 
                  className="bg-indigo-700 text-white p-2 rounded-md text-sm appearance-none pr-8"
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <Filter className="absolute right-2 top-2.5 w-4 h-4" />
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-4 flex items-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center w-12 justify-center">
                  <span className={`font-bold text-lg ${student.rank <= 3 ? 'text-amber-500' : 'text-gray-500'}`}>
                    {student.rank}
                  </span>
                  <span className="ml-1">{getRankChangeIcon(student)}</span>
                </div>
                
                <div className="flex-shrink-0 ml-2">
                  <img 
                    src={student.avatar} 
                    alt={student.name} 
                    className="w-10 h-10 rounded-full border-2 border-indigo-200" 
                  />
                </div>
                
                <div className="ml-4 flex-grow">
                  <div className="font-medium">{student.name}</div>
                  <div className="text-xs text-gray-500">{student.subjects.join(", ")} • {student.region}</div>
                </div>
                
                <div className="flex items-center">
                  <div className="px-3 text-right">
                    <div className="text-amber-600 font-bold">{student.points}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                  
                  <div className="px-3 flex items-center">
                    <Award className="text-indigo-500 mr-1" size={16} />
                    <span className="font-medium">{student.badges}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-3 flex justify-center">
            <button className="text-indigo-600 text-sm font-medium flex items-center hover:text-indigo-800">
              <Users size={16} className="mr-1" /> Compete with Friends
            </button>
          </div>
        </div>
        
        {/* Badges and Challenges Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Earned Badges */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-600 text-white p-4">
              <h2 className="text-xl font-bold flex items-center">
                <Award className="mr-2" /> Your Badges
              </h2>
            </div>
            
            <div className="p-4 grid grid-cols-3 gap-3">
              {badges.map((badge) => (
                <div 
                  key={badge.id} 
                  className={`p-2 flex flex-col items-center justify-center text-center rounded-lg border ${
                    badge.earned ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200 bg-gray-50 opacity-70'
                  } ${badgeAnimation && badge.id === 2 ? 'animate-pulse bg-yellow-100' : ''}`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium">{badge.name}</div>
                  {!badge.earned && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-indigo-500 h-1.5 rounded-full" 
                        style={{ width: `${badge.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Upcoming Challenges */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-600 text-white p-4">
              <h2 className="text-xl font-bold flex items-center">
                <Bell className="mr-2" /> Upcoming Challenges
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="p-4">
                  <div className="font-medium">{challenge.name}</div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Reward: {challenge.reward}</span>
                    <span>Due: {challenge.deadline}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full" 
                      style={{ width: `${(challenge.progress / 10) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs mt-1 text-gray-600">
                    {challenge.progress}/10 completed
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardBadgeShowcase;