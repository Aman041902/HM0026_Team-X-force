import React, { useState } from 'react';
import { Search, Video, Award, BarChart, Star, Users, Plus, Edit, Trash2 } from 'lucide-react';

const TeachersPlaylistManagement = () => {
  // Sample data for playlists
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      title: "Introduction to Algebra",
      description: "Foundational concepts of algebra for beginners",
      tags: ["math", "algebra", "beginner"],
      videos: [
        { id: 1, title: "Variables and Constants", duration: "10:25", views: 158, engagement: 87 },
        { id: 2, title: "Solving Simple Equations", duration: "15:10", views: 142, engagement: 91 }
      ],
      completionRate: 68,
      rewards: { badge: "Algebra Master", points: 50 }
    },
    {
      id: 2,
      title: "Advanced Grammar",
      description: "Complex sentence structures and punctuation",
      tags: ["english", "grammar", "advanced"],
      videos: [
        { id: 3, title: "Conjunctions and Clauses", duration: "12:45", views: 132, engagement: 78 },
        { id: 4, title: "Punctuation Rules", duration: "9:30", views: 127, engagement: 85 }
      ],
      completionRate: 54,
      rewards: { badge: "Grammar Expert", points: 40 }
    }
  ]);

  // Sample data for leaderboard
  const [students, setStudents] = useState([
    { id: 1, name: "Emma Johnson", completedPlaylists: 8, totalPoints: 380, badges: 5 },
    { id: 2, name: "Noah Williams", completedPlaylists: 7, totalPoints: 350, badges: 4 },
    { id: 3, name: "Olivia Brown", completedPlaylists: 6, totalPoints: 320, badges: 4 },
    { id: 4, name: "Liam Davis", completedPlaylists: 6, totalPoints: 310, badges: 3 },
    { id: 5, name: "Ava Miller", completedPlaylists: 5, totalPoints: 290, badges: 3 }
  ]);

  // State for new playlist form
  const [newPlaylist, setNewPlaylist] = useState({
    title: "",
    description: "",
    tags: ""
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState("playlists");
  
  // State for selected playlist (for details view)
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Handle input changes for new playlist form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlaylist({
      ...newPlaylist,
      [name]: value
    });
  };

  // Handle playlist creation
  const handleCreatePlaylist = () => {
    const tagsArray = newPlaylist.tags.split(",").map(tag => tag.trim());
    const newPlaylistObj = {
      id: playlists.length + 1,
      title: newPlaylist.title,
      description: newPlaylist.description,
      tags: tagsArray,
      videos: [],
      completionRate: 0,
      rewards: { badge: "", points: 0 }
    };
    
    setPlaylists([...playlists, newPlaylistObj]);
    setNewPlaylist({ title: "", description: "", tags: "" });
  };

  // Render playlist cards
  const renderPlaylistCards = () => {
    return playlists.map(playlist => (
      <div key={playlist.id} className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedPlaylist(playlist)}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{playlist.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{playlist.description}</p>
            <div className="flex flex-wrap mt-2">
              {playlist.tags.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center mb-1">
              <Video className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">{playlist.videos.length} videos</span>
            </div>
            <div className="flex items-center">
              <BarChart className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">{playlist.completionRate}% completion</span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  // Render new playlist form
  const renderNewPlaylistForm = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Playlist</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={newPlaylist.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter playlist title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={newPlaylist.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              placeholder="Enter playlist description"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={newPlaylist.tags}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="math, algebra, beginner"
            />
          </div>
          <div>
            <button 
              onClick={handleCreatePlaylist}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Playlist
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render playlist details view
  const renderPlaylistDetails = () => {
    if (!selectedPlaylist) return null;
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold">{selectedPlaylist.title}</h2>
            <p className="text-gray-600 mt-1">{selectedPlaylist.description}</p>
            <div className="flex flex-wrap mt-2">
              {selectedPlaylist.tags.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1">{tag}</span>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setSelectedPlaylist(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            Back to All Playlists
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Completion Rate</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full" 
                  style={{ width: `${selectedPlaylist.completionRate}%` }}
                ></div>
              </div>
              <span className="text-blue-800 font-semibold">{selectedPlaylist.completionRate}%</span>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-800 mb-2">Reward Badge</h3>
            <div className="flex items-center">
              <Award className="h-6 w-6 text-green-600 mr-2" />
              <input
                type="text"
                value={selectedPlaylist.rewards.badge}
                className="flex-1 px-3 py-1 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Add badge name"
              />
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-purple-800 mb-2">Bonus Points</h3>
            <div className="flex items-center">
              <Star className="h-6 w-6 text-purple-600 mr-2" />
              <input
                type="number"
                value={selectedPlaylist.rewards.points}
                className="flex-1 px-3 py-1 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Add points"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Videos</h3>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center">
              <Plus className="h-4 w-4 mr-1" />
              Add Video
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            {selectedPlaylist.videos.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No videos added yet</p>
            ) : (
              <div className="space-y-3">
                {selectedPlaylist.videos.map((video, index) => (
                  <div key={video.id} className="bg-white p-3 rounded-md shadow-sm flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-md w-8 h-8 flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{video.title}</h4>
                        <p className="text-gray-500 text-sm">{video.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-4 text-sm text-gray-600">
                        <Video className="h-4 w-4 mr-1" />
                        {video.views}
                      </div>
                      <div className="flex items-center mr-4 text-sm text-gray-600">
                        <BarChart className="h-4 w-4 mr-1" />
                        {video.engagement}%
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1 text-gray-500 hover:text-blue-600 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-red-600 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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

  // Render leaderboard
  const renderLeaderboard = () => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 bg-blue-600">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <Award className="mr-2 h-6 w-6" />
            Top Students Leaderboard
          </h2>
        </div>
        
        <div className="p-4">
          <div className="bg-gray-100 py-3 px-4 rounded-t-lg grid grid-cols-12 gap-4 font-medium text-gray-600">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Student</div>
            <div className="col-span-2 text-center">Playlists</div>
            <div className="col-span-2 text-center">Points</div>
            <div className="col-span-2 text-center">Badges</div>
          </div>
          
          {students.map((student, index) => (
            <div 
              key={student.id} 
              className={`py-4 px-4 grid grid-cols-12 gap-4 border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <div className="col-span-1 flex items-center">
                {index < 3 ? (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                    index === 1 ? 'bg-gray-200 text-gray-700' : 
                    'bg-yellow-600 text-yellow-100'
                  }`}>
                    {index + 1}
                  </div>
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center text-gray-500">
                    {index + 1}
                  </div>
                )}
              </div>
              <div className="col-span-5 flex items-center">
                <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-3">
                  {student.name.charAt(0)}
                </div>
                <span className="font-medium">{student.name}</span>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                {student.completedPlaylists}
              </div>
              <div className="col-span-2 flex items-center justify-center text-green-600 font-medium">
                {student.totalPoints}
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-purple-600 mr-1" />
                  <span>{student.badges}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">Teacher's Playlist Management</h1>
        </div>
      </div>
      
      <div className="container mx-auto py-6 px-6">
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button 
              className={`py-3 px-6 ${activeTab === 'playlists' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('playlists')}
            >
              Playlists
            </button>
            <button 
              className={`py-3 px-6 ${activeTab === 'leaderboard' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('leaderboard')}
            >
              Student Leaderboard
            </button>
          </div>
        </div>
        
        {activeTab === 'playlists' && (
          <div>
            {!selectedPlaylist ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-64">
                    <input
                      type="text"
                      placeholder="Search playlists..."
                      className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3">
                      <option>All Subjects</option>
                      <option>Math</option>
                      <option>English</option>
                      <option>Science</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Levels</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
                
                {renderNewPlaylistForm()}
                
                <h2 className="text-xl font-semibold mb-4">Your Playlists</h2>
                {renderPlaylistCards()}
              </>
            ) : (
              renderPlaylistDetails()
            )}
          </div>
        )}
        
        {activeTab === 'leaderboard' && renderLeaderboard()}
      </div>
    </div>
  );
};

export default TeachersPlaylistManagement;
