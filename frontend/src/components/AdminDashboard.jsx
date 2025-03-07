import React, { useState } from "react";
import { useEffect } from "react";
import adminImg from "../assets/admi-img.jpeg";
import {useSelector} from 'react-redux';
import {
  Bell,
  CheckCircle,
  XCircle,
  BarChart2,
  Flag,
  UserCheck,
  Video,
  Users,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  // Sample data - in a real app this would come from an API
  const navigate = useNavigate();
  const token = useSelector((state)=>state.auth.token);
  const [pendingVideos, setPendingVideos] = useState([]);

  
  function getDate(timestamp)
  {
    const dateOnly = timestamp.split('T')[0];
    return dateOnly;
  }

  useEffect(()=>{
    async function getPendingVideo()
    {
      try 
      {
        const response = await fetch('http://localhost:3000/user/getpendingvideo',{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body : JSON.stringify({token : token})
        })

        const value = await response.json();
        setPendingVideos(value.data)
        console.log(value.data);
      }
      catch(error)
      {
        console.log(error.message);
      }
    }

    getPendingVideo();
  },[]);

  const [analytics, setAnalytics] = useState({
    totalVideos: 452,
    activeUsers: 1875,
    dailyViews: 4328,
    avgEngagement: "18:45",
  });

  const [reports, setReports] = useState([
    {
      id: 1,
      type: "Inappropriate Content",
      video: "Data Science",
      reportedBy: "user123",
      date: "2025-02-27",
    },
    {
      id: 2,
      type: "Copyright Issue",
      video: "Introduction to Calculus",
      reportedBy: "teacher456",
      date: "2025-02-28 basics",
    },
  ]);

  const [teacherVerifications, setTeacherVerifications] = useState([
    {
      id: 1,
      name: "Jane Doe",
      subject: "Mathematics",
      credentials: "PhD in Mathematics",
      submitted: "2025-03-01",
    },
    {
      id: 2,
      name: "Robert Brown",
      subject: "Physics",
      credentials: "MSc in Physics",
      submitted: "2025-02-28",
    },
  ]);

  const [activeTab, setActiveTab] = useState("pending");
  const [alertsCount, setAlertsCount] = useState(3);

  async function approveVideo(id)
    {
      try 
      {
        const response = await fetch('http://localhost:3000/user/flagvideos',{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body : JSON.stringify({token : token, videoId : id})
        })
      }
      catch(error)
      {
        console.log(error.message);
      }
    }

  const handleApprove = (id, section) => {
    if (section === "videos") {
      setPendingVideos(pendingVideos.filter((video) => video._id !== id));
      setAnalytics({ ...analytics, totalVideos: analytics.totalVideos + 1 });
      approveVideo(id);
    } else if (section === "teachers") {
      setTeacherVerifications(
        teacherVerifications.filter((teacher) => teacher.id !== id)
      );
      setAnalytics({ ...analytics, activeUsers: analytics.activeUsers + 1 });
    }
    setAlertsCount(Math.max(0, alertsCount - 1));
  };

  const handleReject = (id, section) => {
    if (section === "videos") {
      setPendingVideos(pendingVideos.filter((video) => video._id !== id));
    } else if (section === "teachers") {
      setTeacherVerifications(
        teacherVerifications.filter((teacher) => teacher.id !== id)
      );
    }
    setAlertsCount(Math.max(0, alertsCount - 1));
  };

  const handleResolve = (id) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  function signouthandler() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">EdVideo Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 cursor-pointer" />
              {alertsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {alertsCount}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={adminImg}
                alt=""
                className="rounded-full object-cover w-10 h-10"
              />
              <span>Admin </span>
            </div>
            <button
              onClick={signouthandler}
              className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <nav className="flex">
          <button
            className={`px-6 py-4 font-medium flex items-center space-x-2 ${
              activeTab === "pending"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            <Video className="w-5 h-5" />
            <span>Pending Videos</span>
            {pendingVideos && pendingVideos.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {pendingVideos ? pendingVideos.length : 0}
              </span>
            )}
          </button>

          <button
            className={`px-6 py-4 font-medium flex items-center space-x-2 ${
              activeTab === "analytics"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart2 className="w-5 h-5" />
            <span>Analytics</span>
          </button>

          <button
            className={`px-6 py-4 font-medium flex items-center space-x-2 ${
              activeTab === "reports"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("reports")}
          >
            <Flag className="w-5 h-5" />
            <span>Reports</span>
            {reports.length > 0 && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {reports.length}
              </span>
            )}
          </button>

        </nav>
      </div>

      {/* Main Content */}
      <main className="p-6">
        {/* Pending Videos */}
        {activeTab === "pending" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                Review Pending Video Uploads
              </h2>
              <div className="text-sm text-gray-500">
                {pendingVideos ? pendingVideos.length : 0} pending approval
              </div>
            </div>

            {pendingVideos && pendingVideos.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Creator
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingVideos.map((video,index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-16 bg-gray-200 rounded mr-3 flex-shrink-0">
                              <img
                                src={video.thumbnail}
                                alt="Thumbnail"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {video.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {video.instructor.firstname}{" "}{video.instructor.lastname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {video.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getDate(video.uploadDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleApprove(video._id, "videos")}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(video._id, "videos")}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  No pending videos
                </h3>
                <p className="text-gray-500 mt-1">
                  All submitted videos have been reviewed.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Analytics */}
        {activeTab === "analytics" && (
          <div>
            <h2 className="text-xl font-bold mb-6">Platform Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Videos
                    </p>
                    <p className="text-2xl font-semibold">
                      {analytics.totalVideos}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Active Users
                    </p>
                    <p className="text-2xl font-semibold">
                      {analytics.activeUsers}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                    <BarChart2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Daily Views
                    </p>
                    <p className="text-2xl font-semibold">
                      {analytics.dailyViews}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Avg. Engagement
                    </p>
                    <p className="text-2xl font-semibold">
                      {analytics.avgEngagement}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-medium text-gray-700 mb-4">
                Video Approval Statistics
              </h3>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">
                  Chart visualization would appear here
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Reports */}
        {activeTab === "reports" && (
          <div>
            <h2 className="text-xl font-bold mb-6">Manage Reports</h2>

            {reports.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Video
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reported By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              report.type.includes("Inappropriate")
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {report.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {report.video}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.reportedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleResolve(report.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Resolve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Flag className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  No active reports
                </h3>
                <p className="text-gray-500 mt-1">
                  There are no user reports that need attention.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
