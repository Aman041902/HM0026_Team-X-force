import React, { useState, useRef } from "react";
import {
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  BarChart2,
  Eye,
  ThumbsUp,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

const VideoUploadApprovalPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    tags: "",
    category: "education",
  });

  // Sample data for previously uploaded videos
  const [myVideos, setMyVideos] = useState([
    {
      id: 1,
      title: "Introduction to React Hooks",
      thumbnail: "/api/placeholder/320/180",
      duration: "8:25",
      uploadDate: "2025-02-15",
      status: "approved",
      views: 342,
      likes: 87,
      comments: 24,
      engagement: 76,
      tags: ["react", "frontend", "javascript"],
    },
    {
      id: 2,
      title: "CSS Grid Layout Tutorial",
      thumbnail: "/api/placeholder/320/180",
      duration: "12:30",
      uploadDate: "2025-02-20",
      status: "approved",
      views: 156,
      likes: 42,
      comments: 15,
      engagement: 68,
      tags: ["css", "frontend", "web design"],
    },
    {
      id: 3,
      title: "Advanced JavaScript Patterns",
      thumbnail: "/api/placeholder/320/180",
      duration: "15:45",
      uploadDate: "2025-02-28",
      status: "pending",
      views: 0,
      likes: 0,
      comments: 0,
      engagement: 0,
      tags: ["javascript", "advanced", "programming"],
    },
  ]);

  // Drag and drop event handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      file,
      name: file.name,
      size: file.size,
      progress: 0,
      uploading: true,
      error: null,
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((fileObj, index) => {
      const interval = setInterval(() => {
        setUploadedFiles((prev) => {
          const newState = [...prev];
          const fileIndex = prev.findIndex(
            (f) => f.name === fileObj.name && f.size === fileObj.size
          );

          if (fileIndex !== -1) {
            const newProgress = Math.min(
              newState[fileIndex].progress + 10,
              100
            );
            newState[fileIndex] = {
              ...newState[fileIndex],
              progress: newProgress,
              uploading: newProgress < 100,
            };
          }

          return newState;
        });
      }, 500);

      // Clear interval after simulated upload completes
      setTimeout(() => {
        clearInterval(interval);
      }, 5000);
    });
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadForm({
      ...uploadForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process tags
    const tagsArray = uploadForm.tags.split(",").map((tag) => tag.trim());

    // Create new video object
    const newVideo = {
      id: myVideos.length + 1,
      title: uploadForm.title,
      description: uploadForm.description,
      thumbnail: "/api/placeholder/320/180",
      duration: uploadedFiles.length > 0 ? "00:00" : "10:00", // Placeholder
      uploadDate: new Date().toISOString().split("T")[0],
      status: "pending",
      views: 0,
      likes: 0,
      comments: 0,
      engagement: 0,
      tags: tagsArray,
      category: uploadForm.category,
    };

    // Add to videos
    setMyVideos([newVideo, ...myVideos]);

    // Reset form and uploaded files
    setUploadForm({
      title: "",
      description: "",
      tags: "",
      category: "education",
    });
    setUploadedFiles([]);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "pending":
        return "Pending Review";
      default:
        return "Unknown";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Video Upload & Approval
          </h1>
        </div>
      </div>

      <div className="container mx-auto py-6 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Upload New Video</h2>

              <form onSubmit={handleSubmit}>
                {/* Drag and Drop Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleChange}
                    multiple={false}
                  />

                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop your video here
                  </p>
                  <p className="text-gray-500 text-sm mb-4">or</p>
                  <button
                    type="button"
                    onClick={onButtonClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                  >
                    Select Video
                  </button>
                  <p className="text-gray-500 text-xs mt-2">
                    Supported formats: MP4, MOV, AVI, WMV. Max file size: 2GB
                  </p>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-2">Uploaded Files</h3>
                    <div className="space-y-3">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium truncate">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                file.error ? "bg-red-500" : "bg-blue-500"
                              }`}
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">
                              {file.uploading
                                ? "Uploading..."
                                : file.error
                                ? "Upload Failed"
                                : "Uploaded"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {file.progress}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Video Details Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={uploadForm.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter video title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={uploadForm.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                      placeholder="Enter video description"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={uploadForm.tags}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="javascript, tutorial, coding"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={uploadForm.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="education">Education</option>
                        <option value="tutorial">Tutorial</option>
                        <option value="programming">Programming</option>
                        <option value="science">Science</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
                    >
                      Submit for Approval
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Approval Info and Guidelines */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Approval Process</h2>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-3">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Submit Your Video
                    </h3>
                    <p className="text-sm text-gray-600">
                      Upload your video and complete all required information
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-3">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Pending Review
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your video will be reviewed by our admin team (1-2
                      business days)
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-3">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Approval Decision
                    </h3>
                    <p className="text-sm text-gray-600">
                      You'll be notified once your video is approved or if
                      changes are needed
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-3">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Track Performance
                    </h3>
                    <p className="text-sm text-gray-600">
                      Once approved, monitor engagement and performance metrics
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">
                  Content Guidelines
                </h3>
                <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                  <li>All videos must be educational in nature</li>
                  <li>No explicit or inappropriate content</li>
                  <li>Ensure good audio and video quality</li>
                  <li>Videos should be between 5-30 minutes in length</li>
                  <li>Properly tag videos for better discoverability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* My Videos Section */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-6">My Videos</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Video
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date Uploaded
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Views
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Engagement
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myVideos.map((video) => (
                  <tr key={video.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-20 w-32">
                          <img
                            className="h-20 w-32 object-cover rounded-md"
                            src={video.thumbnail}
                            alt={video.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {video.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {video.duration}
                          </div>
                          <div className="flex flex-wrap mt-1">
                            {video.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded mr-1 mb-1"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {video.uploadDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(video.status)}
                        <span
                          className={`ml-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                            video.status
                          )}`}
                        >
                          {getStatusText(video.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="h-4 w-4 mr-1" />
                        {video.views}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {video.status === "approved" ? (
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                              Engagement
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {video.engagement}%
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${video.engagement}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <div className="flex items-center">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {video.likes}
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {video.comments}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          No data yet
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {myVideos.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Upload className="h-12 w-12" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No videos yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by uploading your first video.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoUploadApprovalPage;
