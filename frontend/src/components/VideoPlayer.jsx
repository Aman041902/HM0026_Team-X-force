import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Groq from "groq-sdk";
import TranslateSummary from "./TranslateSummary";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const VideoPlayer = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [activeVideo, setActiveVideo] = useState({
    id: 1,
    title: "Big Buck Bunny",
    channel: "Blender Foundation",
    views: "12M views",
    uploadDate: "4 years ago",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.",
    likes: 285000,
    dislikes: 12500,
  });

  const [relatedVideos, setRelatedVideos] = useState([
    {
      id: 2,
      title: "Sintel - Open Source Movie",
      thumbnail: "/api/placeholder/180/100",
      channel: "Blender Foundation",
      views: "8.2M views",
      uploadDate: "3 years ago",
    },
  ]);

  const location = useLocation();
  const segments = location.pathname.split("/");
  const videoId = segments[segments.length - 1];

  // State for description expand/collapse
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [summary, setSummary] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // Add these new state variables
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);

  useEffect(() => {
    async function getVideoInformation() {
      try {
        const response = await fetch(
          `http://localhost:3000/user/feed/${videoId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
          }
        );

        const value = await response.json();
        const video = value.data[0];
        // console.log(video);
        setActiveVideo(video);
      } catch (error) {
        console.log(error.message);
      }
    }

    async function getRelativeVideo() {
      try {
        const response = await fetch("http://localhost:3000/user/getvideos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        });

        const value = await response.json();
        const video = value.data;
        const newVideo = video.slice(0, 10);

        // console.log(newVideo);
        setRelatedVideos(newVideo);
      } catch (error) {
        console.log(error.message);
      }
    }

    getVideoInformation();
    getRelativeVideo();
  }, [token]);

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "VideoFan123",
      text: "This is one of my favorite animated shorts! The animation quality is amazing.",
      likes: 432,
      time: "2 months ago",
    },
    {
      id: 2,
      user: "AnimationLover",
      text: "I can't believe this was made so many years ago. Still holds up today!",
      likes: 215,
      time: "3 months ago",
    },
    {
      id: 3,
      user: "CreativeArtist",
      text: "The character design is so expressive. Love the attention to detail.",
      likes: 178,
      time: "5 months ago",
    },
  ]);

  const [commentText, setCommentText] = useState("");
  const [screenSize, setScreenSize] = useState("large");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("small");
      } else if (window.innerWidth < 1024) {
        setScreenSize("medium");
      } else {
        setScreenSize("large");
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: comments.length + 1,
      user: "CurrentUser",
      text: commentText,
      likes: 0,
      time: "Just now",
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  // Toggle description visibility
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  function clickhandler(e) {
    const id = relatedVideos[e.target.parentNode.parentNode.id]._id;
    navigate(`/feed/${id}`);
  }

  function getDate(timestamp) {
    const dateOnly = timestamp.split("T")[0];
    return dateOnly;
  }

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Generate a concise summary of this video about: ${activeVideo.title}\n\nDescription: ${activeVideo.description}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });
      setSummary(chatCompletion.choices[0]?.message?.content || "No response");
      setShowSummary(true);
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // Add this new function for generating notes
  const handleGenerateNotes = async () => {
    setIsGeneratingNotes(true);
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Create detailed study notes from this video description. Extract key points, concepts, and important details in a well-organized format.
            
            Video Title: ${activeVideo.title}
            Description: ${activeVideo.description}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });
      setNotes(chatCompletion.choices[0]?.message?.content || "No response");
      setShowNotes(true);
    } catch (error) {
      console.error("Error generating notes:", error);
    } finally {
      setIsGeneratingNotes(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-[2000px] mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Column */}
          <div className="w-full lg:w-8/12">
            {/* Video Player */}
            <div className="bg-black w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <video
                className="w-full h-full"
                src={activeVideo.url}
                controls
                autoPlay
                poster="/api/placeholder/640/360"
              />
            </div>

            {/* Video Info Section */}
            <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 break-words">
                {activeVideo.title}
              </h1>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-gray-200">
                {/* Channel Info */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                    {activeVideo.channel ? activeVideo.channel[0] : "I"}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                        {activeVideo.channel}
                      </h3>
                      <span className="text-gray-500">•</span>
                      <span className="text-sm text-gray-600">
                       Harshal Gayakwad
                      </span>
                    </div>
                    {/* <p className="text-sm text-gray-600">
                      {activeVideo.views} subscribers
                    </p> */}
                  </div>
                </div>

                {/* Action Buttons */}
                {/* <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    <span className="font-medium">{activeVideo.likes.toLocaleString()}</span>
                  </button>

                  <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2"
                      />
                    </svg>
                    <span className="font-medium">Dislike</span>
                  </button>

                  <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    <span className="font-medium">Share</span>
                  </button>
                </div> */}
              </div>

              {/* Description Section with improved show more/less */}
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                {/* Views and Date Info */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>{activeVideo.views} views</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{getDate(activeVideo.uploadDate)}</span>
                  </div>
                </div>

                {/* Description Content */}
                <div className="relative">
                  <div
                    className={`
                    ${!showFullDescription ? "max-h-24" : ""} 
                    overflow-hidden 
                    transition-all 
                    duration-300 
                    ${!showFullDescription ? "mask-bottom" : ""}
                  `}
                  >
                    <p className="text-gray-700 whitespace-pre-wrap text-sm md:text-base leading-relaxed break-words">
                      {activeVideo.description}
                    </p>
                  </div>

                  {activeVideo.description.length > 100 && (
                    <button
                      onClick={toggleDescription}
                      className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm 
                        flex items-center gap-1 transition-all duration-200 group"
                    >
                      {showFullDescription ? (
                        <>
                          <span className="group-hover:-translate-y-0.5 transition-transform duration-200">
                            Show less
                          </span>
                          <svg
                            className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span className="group-hover:translate-y-0.5 transition-transform duration-200">
                            Show more
                          </span>
                          <svg
                            className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* AI Features Section */}
            <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                AI Features
              </h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleGenerateSummary}
                  disabled={isGeneratingSummary}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 
                    text-white rounded-lg hover:from-blue-700 hover:to-blue-800 
                    disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed 
                    transition-all duration-200 shadow-sm"
                >
                  {isGeneratingSummary ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Generating Summary...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                      <span>Generate Summary</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleGenerateNotes}
                  disabled={isGeneratingNotes}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 
                    text-white rounded-lg hover:from-purple-700 hover:to-purple-800 
                    disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed 
                    transition-all duration-200 shadow-sm"
                >
                  {isGeneratingNotes ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Generating Notes...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span>Generate Study Notes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                {comments.length} Comments
              </h2>

              {/* Add Comment */}
              <div className="flex gap-4 mb-6">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0 
                  flex items-center justify-center text-white font-bold"
                >
                  U
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      onClick={() => setCommentText("")}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                        disabled:bg-gray-300 disabled:text-gray-500 transition-colors duration-200"
                      disabled={!commentText.trim()}
                      onClick={addComment}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4 group">
                    <div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 
                      flex-shrink-0 flex items-center justify-center text-white font-bold"
                    >
                      {comment.user[0]}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {comment.user}
                        </span>
                        <span className="text-sm text-gray-500">
                          {comment.time}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">{comment.text}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                          <span className="material-icons text-sm">
                            thumb_up
                          </span>
                          <span>{comment.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                          <span className="material-icons text-sm">
                            thumb_down
                          </span>
                        </button>
                        <button className="text-gray-600 hover:text-blue-600">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-4/12">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Related Videos
              </h2>
              <div className="space-y-4">
                {relatedVideos.map((video, index) => (
                  <div
                    key={index}
                    id={index}
                    className="flex gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
                    onClick={clickhandler}
                  >
                    <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {video.channel}
                      </p>
                      <p className="text-sm text-gray-600">
                        {video.views} • {video.uploadDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary and Notes Modals */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/60 z-50">
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl">
                {/* Modal Header - Fixed at top */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 rounded-t-xl">
                  <div className="p-4 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Video Summary
                    </h2>
                    <button
                      onClick={() => {
                        setShowSummary(false);
                        setShowTranslation(false);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                  <div className="p-6">
                    {/* Original Summary */}
                    <div className="prose max-w-none bg-gray-50 rounded-lg p-6 mb-6">
                      <div className="whitespace-pre-wrap">{summary}</div>
                    </div>

                    {/* Translation Section */}
                    {showTranslation ? (
                      <div className="mt-6 bg-blue-50 rounded-lg p-6">
                        <TranslateSummary summary={summary} />
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowTranslation(true)}
                        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg
                          hover:bg-blue-700 transition-colors duration-300
                          flex items-center gap-2 shadow-sm"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                          />
                        </svg>
                        <span>Translate Summary</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNotes && (
        <div className="fixed inset-0 bg-black/60 z-50">
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl">
                {/* Modal Header - Fixed at top */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 rounded-t-xl">
                  <div className="p-4 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Study Notes
                    </h2>
                    <button
                      onClick={() => {
                        setShowNotes(false);
                        setShowTranslation(false);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                  <div className="p-6">
                    {/* Notes Content */}
                    <div className="prose max-w-none bg-gray-50 rounded-lg p-6 mb-6">
                      <div className="whitespace-pre-wrap">{notes}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 justify-end">
                      <button
                        onClick={() => navigator.clipboard.writeText(notes)}
                        className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg
                          hover:bg-gray-50 transition-colors duration-300
                          flex items-center gap-2 shadow-sm"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          />
                        </svg>
                        <span>Copy Notes</span>
                      </button>

                      {!showTranslation && (
                        <button
                          onClick={() => setShowTranslation(true)}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg
                            hover:bg-blue-700 transition-colors duration-300
                            flex items-center gap-2 shadow-sm"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                            />
                          </svg>
                          <span>Translate Notes</span>
                        </button>
                      )}
                    </div>

                    {/* Translation Section */}
                    {showTranslation && (
                      <div className="mt-6 bg-blue-50 rounded-lg p-6">
                        <TranslateSummary summary={notes} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add this CSS to your global styles or as a style tag */}
      <style>
        {`
          .mask-bottom {
            mask-image: linear-gradient(to bottom, black calc(100% - 28px), transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 28px), transparent 100%);
          }
        `}
      </style>
    </div>
  );
};

export default VideoPlayer;
