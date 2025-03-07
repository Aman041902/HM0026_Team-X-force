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
      if (file.size > 50 * 1048576) {
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
      if (file.size > 1048576) {
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
