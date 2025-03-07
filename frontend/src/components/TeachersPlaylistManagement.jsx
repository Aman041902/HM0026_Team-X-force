import React, { useState } from "react";
import {
  Search,
  Video,
  Award,
  BarChart,
  Star,
  Plus,
  Edit,
  Trash2,
  Upload,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeachersPlaylistManagement = () => {
  const navigate = useNavigate();

  // Sample data for playlists
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      title: "Introduction to Algebra",
      description: "Foundational concepts of algebra for beginners",
      tags: ["math", "algebra", "beginner"],
      videos: [
        {
          id: 1,
          title: "Variables and Constants",
          description: "Learn about variables and constants in algebra",
          file: "variables-constants.mp4",
          thumbnail: "https://example.com/thumbnail1.jpg",
          duration: 625, // in seconds (10:25)
          views: 158,
          likes: 42,
          uploadDate: new Date("2025-02-15"),
          instructor: "6073a3e752faff34e8562c2a",
          tags: ["algebra", "variables", "beginner"],
          engagement: 87,
        },
      ],
      completionRate: 68,
      rewards: { badge: "Algebra Master", points: 50 },
    },
    {
      id: 2,
      title: "Data Preprocessing",
      description: "Complex sentence structures and punctuation",
      tags: ["data science", "ML", "begineer"],
      videos: [
        {
          id: 3,
          title: "Data cleaning",
          description: "Learn techniques for cleaning messy datasets",
          file: "data-cleaning.mp4",
          thumbnail: "https://example.com/thumbnail3.jpg",
          duration: 765, // in seconds (12:45)
          views: 132,
          likes: 35,
          uploadDate: new Date("2025-02-20"),
          instructor: "6073a3e752faff34e8562c2a",
          tags: ["data science", "cleaning", "begineer"],
          engagement: 78,
        },
      ],
      completionRate: 54,
      rewards: { badge: "Data Science Begineer", points: 40 },
    },
  ]);

  // State for new playlist form - now with separate thumbnail file fields
  const [newPlaylist, setNewPlaylist] = useState({
    title: "",
    description: "",
    tags: "",
    videoFile: null,
    videoFileName: "",
    thumbnailFile: null,
    thumbnailFileName: "",
    thumbnail: "", // For URL-based thumbnails
    duration: "",
    instructor: "",
  });

  // State for AI generation prompts
  const [aiPrompt, setAiPrompt] = useState({
    description: "",
    thumbnail: "",
  });

  // State for showing AI input fields
  const [showAiInput, setShowAiInput] = useState({
    description: false,
    thumbnail: false,
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
      [name]: value,
    });
  };

  // Handle input changes for AI prompts
  const handleAiPromptChange = (e) => {
    const { name, value } = e.target;
    setAiPrompt({
      ...aiPrompt,
      [name]: value,
    });
  };

  // Toggle AI input fields
  const toggleAiInput = (field) => {
    setShowAiInput({
      ...showAiInput,
      [field]: !showAiInput[field],
    });
  };

  // Handle AI generation for description
  const generateWithAi = (field) => {
    // Simulate AI generation with sample responses
    if (field === "description") {
      const sampleDescriptions = [
        "This comprehensive video explores key concepts with practical examples and in-depth explanations. Perfect for students looking to build a strong foundation in this subject.",
        "An engaging instructional video that breaks down complex topics into easy-to-understand segments. Includes visual demonstrations and real-world applications.",
        "A step-by-step tutorial designed for beginners, covering fundamental principles and essential techniques. Includes practice exercises and common mistake warnings.",
      ];

      // Choose a random sample or use the prompt to "generate" something
      const generatedText = aiPrompt.description
        ? `Based on "${aiPrompt.description}": ${
            sampleDescriptions[
              Math.floor(Math.random() * sampleDescriptions.length)
            ]
          }`
        : sampleDescriptions[
            Math.floor(Math.random() * sampleDescriptions.length)
          ];

      setNewPlaylist({
        ...newPlaylist,
        description: generatedText,
      });
    } else if (field === "thumbnail") {
      // For thumbnail, generate a placeholder URL based on the prompt
      const generatedUrl = `https://example.com/generated-thumbnail-${Date.now()}.jpg`;

      setNewPlaylist({
        ...newPlaylist,
        thumbnail: generatedUrl,
        // Clear thumbnail file if using generated URL
        thumbnailFile: null,
        thumbnailFileName: "",
      });
    }

    // Close the AI input field after generation
    setShowAiInput({
      ...showAiInput,
      [field]: false,
    });

    // Clear the AI prompt
    setAiPrompt({
      ...aiPrompt,
      [field]: "",
    });
  };

  // Handle file upload for video
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPlaylist({
        ...newPlaylist,
        videoFile: file,
        videoFileName: file.name,
      });
    }
  };

  // Fixed - Handle file upload for thumbnail image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPlaylist({
        ...newPlaylist,
        thumbnailFile: file,
        thumbnailFileName: file.name,
        // Clear the URL-based thumbnail when uploading a file
        thumbnail: "",
      });
    }
  };

  // Handle playlist creation
  const handleCreatePlaylist = () => {
    const tagsArray = newPlaylist.tags.split(",").map((tag) => tag.trim());

    // Determine which thumbnail to use (file or URL)
    let thumbnailSource = "";
    if (newPlaylist.thumbnailFile) {
      // In a real app, you'd likely upload this file to a server and get a URL back
      // For this example, we'll use a placeholder approach
      thumbnailSource = URL.createObjectURL(newPlaylist.thumbnailFile);
    } else if (newPlaylist.thumbnail) {
      thumbnailSource = newPlaylist.thumbnail;
    }

    const newPlaylistObj = {
      id: playlists.length + 1,
      title: newPlaylist.title,
      description: newPlaylist.description,
      tags: tagsArray,
      file: newPlaylist.videoFileName,
      thumbnail: thumbnailSource,
      duration: parseInt(newPlaylist.duration) || 0,
      views: 0,
      likes: 0,
      uploadDate: new Date(),
      instructor: newPlaylist.instructor || "6073a3e752faff34e8562c2a",
      videos: [],
      completionRate: 0,
      rewards: { badge: "", points: 0 },
    };

    setPlaylists([...playlists, newPlaylistObj]);
    setNewPlaylist({
      title: "",
      description: "",
      tags: "",
      videoFile: null,
      videoFileName: "",
      thumbnailFile: null,
      thumbnailFileName: "",
      thumbnail: "",
      duration: "",
      instructor: "",
    });
  };

  // Render playlist cards
  const renderPlaylistCards = () => {
    return playlists.map((playlist) => (
      <div
        key={playlist.id}
        className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setSelectedPlaylist(playlist)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{playlist.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{playlist.description}</p>
            <div className="flex flex-wrap mt-2">
              {playlist.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center mb-1">
              <Video className="h-4 w-4 text-gray-500 mr-1" />
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
        <h2 className="text-xl font-semibold mb-4">Create New Video</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={newPlaylist.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video title"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <button
                onClick={() => toggleAiInput("description")}
                className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded flex items-center hover:bg-purple-200 transition-colors"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Generate with AI
              </button>
            </div>
            {showAiInput.description && (
              <div className="mb-2 flex">
                <input
                  type="text"
                  name="description"
                  value={aiPrompt.description}
                  onChange={handleAiPromptChange}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe what kind of content you want..."
                />
                <button
                  onClick={() => generateWithAi("description")}
                  className="bg-purple-600 text-white px-3 py-2 rounded-r-md hover:bg-purple-700 transition-colors"
                >
                  Generate
                </button>
              </div>
            )}
            <textarea
              name="description"
              value={newPlaylist.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              placeholder="Enter video description"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Video
            </label>
            <div className="flex items-center">
              <label className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                <Upload className="h-5 w-5 text-gray-500 mr-2" />
                {newPlaylist.videoFileName ? (
                  <span className="text-gray-700">
                    {newPlaylist.videoFileName}
                  </span>
                ) : (
                  <span className="text-gray-500">Choose video file</span>
                )}
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail URL
            </label>
            <input
              type="text"
              name="thumbnail"
              value={newPlaylist.thumbnail}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/thumbnail.jpg"
            />


          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (seconds)
              </label>
              <input
                type="number"
                name="duration"
                value={newPlaylist.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter duration in seconds"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={newPlaylist.tags}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ML,GenAI"
            />
          </div>
          <div>
            <button
              onClick={handleCreatePlaylist}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Video
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Teacher's Playlist Management
          </h1>
        </div>
      </div>

      <div className="container mx-auto py-6 px-6">
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-3 px-6 ${
                activeTab === "playlists"
                  ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("playlists")}
            >
              Create Video
            </button>
          </div>
        </div>

        {activeTab === "playlists" && (
          <div>
            {renderNewPlaylistForm()}

            <h2 className="text-xl font-semibold mb-4">Your Playlists</h2>
            {renderPlaylistCards()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersPlaylistManagement;
