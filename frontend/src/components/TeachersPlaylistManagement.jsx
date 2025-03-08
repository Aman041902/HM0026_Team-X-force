import React, { useState } from "react";
import { useSelector } from "react-redux";

const VideoUploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    tags: "",
  });
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [videoPreview, setVideoPreview] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const token = useSelector((state) => state.auth.token);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const fileExt = file.name.split(".").pop().toLowerCase();
      if (!["mp4", "mov"].includes(fileExt)) {
        setMessage({
          text: "Video type not supported. Use mp4 or mov files.",
          type: "error",
        });
        return;
      }

      // Validate file size (1MB = 1048576 bytes)
      if (file.size > 100 * 1048576) {
        setMessage({ text: "Video size exceeds 50MB limit.", type: "error" });
        return;
      }

      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
      setMessage({ text: "", type: "" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const fileExt = file.name.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg", "png"].includes(fileExt)) {
        setMessage({
          text: "Image type not supported. Use jpg, jpeg or png files.",
          type: "error",
        });
        return;
      }

      // Validate file size (1MB = 1048576 bytes)
      if (file.size > 100 * 1048576) {
        setMessage({ text: "Image size exceeds 1MB limit.", type: "error" });
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setMessage({ text: "", type: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video || !image) {
      setMessage({
        text: "Please upload both video and thumbnail image",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("video", video);
      formDataToSend.append("image", image);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("tags", formData.tags);

      const response = await fetch("http://localhost:3000/user/addvideo", {
        method: "POST",
        headers: {
          token: token,
        },
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ text: "Video uploaded successfully!", type: "success" });
        // Reset form after successful upload
        setFormData({
          email: "",
          title: "",
          description: "",
          duration: "",
          tags: "",
        });
        setVideo(null);
        setImage(null);
        setVideoPreview("");
        setImagePreview("");
      } else {
        setMessage({ text: result.message || "Upload failed.", type: "error" });
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage({
        text: "Failed to upload video. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
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
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        Upload Educational Video
      </h2>

      {message.text && (
        <div
          className={`p-4 mb-6 rounded-md ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Video Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter video title"
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter video description"
          ></textarea>
        </div>

        {/* Duration Field */}
        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            required
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter video duration in minutes"
          />
        </div>

        {/* Tags Field */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. education, programming, javascript"
          />
        </div>

        {/* File Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Video (MP4, MOV, max 50MB)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 border-indigo-300 bg-indigo-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {videoPreview ? (
                    <video
                      src={videoPreview}
                      className="h-40 mb-2 object-cover"
                      controls
                    />
                  ) : (
                    <>
                      <svg
                        className="w-10 h-10 mb-3 text-indigo-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">
                          Click to upload video
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        MP4 or MOV (MAX. 50MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleVideoChange}
                  accept=".mp4,.mov"
                />
              </label>
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Thumbnail (JPG, JPEG, PNG, max 1MB)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 border-purple-300 bg-purple-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Thumbnail preview"
                      className="h-40 mb-2 object-cover"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-10 h-10 mb-3 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">
                          Click to upload thumbnail
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        JPG, JPEG, or PNG (MAX. 1MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept=".jpg,.jpeg,.png"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium transition-colors duration-300"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </span>
            ) : (
              "Upload Video"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoUploadForm;
