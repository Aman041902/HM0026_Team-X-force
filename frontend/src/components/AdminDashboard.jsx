import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  XCircle,
  BarChart2,
  Flag,
  UserCheck,
  Video,
  Users,
} from "lucide-react";

const AdminDashboard = () => {
  // Sample data - in a real app this would come from an API
  const [pendingVideos, setPendingVideos] = useState([
    {
      id: 1,
      title: "Advanced Algebra Concepts",
      creator: "Prof. Smith",
      duration: "45:22",
      submitted: "2025-02-28",
    },
    {
      id: 2,
      title: "Introduction to Biology",
      creator: "Dr. Johnson",
      duration: "32:15",
      submitted: "2025-03-01",
    },
    {
      id: 3,
      title: "History of Ancient Rome",
      creator: "Ms. Williams",
      duration: "28:40",
      submitted: "2025-03-01",
    },
  ]);

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
      video: "Chemistry Basics",
      reportedBy: "user123",
      date: "2025-02-27",
    },
    {
      id: 2,
      type: "Copyright Issue",
      video: "Piano Lessons",
      reportedBy: "teacher456",
      date: "2025-02-28",
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

  const handleApprove = (id, section) => {
    if (section === "videos") {
      setPendingVideos(pendingVideos.filter((video) => video.id !== id));
      setAnalytics({ ...analytics, totalVideos: analytics.totalVideos + 1 });
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
      setPendingVideos(pendingVideos.filter((video) => video.id !== id));
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

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">EdVideo Admin Panel</h1>
          <div className="flex items-center space-x-2">
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
                src="/api/placeholder/35/35"
                alt="Admin"
                className="rounded-full"
              />
              <span>Admin User</span>
            </div>
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
            {pendingVideos.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {pendingVideos.length}
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

          <button
            className={`px-6 py-4 font-medium flex items-center space-x-2 ${
              activeTab === "teachers"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("teachers")}
          >
            <UserCheck className="w-5 h-5" />
            <span>Teacher Verification</span>
            {teacherVerifications.length > 0 && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {teacherVerifications.length}
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
                {pendingVideos.length} pending approval
              </div>
            </div>

            {pendingVideos.length > 0 ? (
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
                    {pendingVideos.map((video) => (
                      <tr key={video.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-16 bg-gray-200 rounded mr-3 flex-shrink-0">
                              <img
                                src={`/api/placeholder/64/36`}
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
                          {video.creator}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {video.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {video.submitted}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleApprove(video.id, "videos")}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(video.id, "videos")}
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

        {/* Teacher Verification */}
        {activeTab === "teachers" && (
          <div>
            <h2 className="text-xl font-bold mb-6">Verify Teacher Profiles</h2>

            {teacherVerifications.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credentials
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
                    {teacherVerifications.map((teacher) => (
                      <tr key={teacher.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 mr-3">
                              <img
                                src={`/api/placeholder/40/40`}
                                alt="Profile"
                                className="h-10 w-10 rounded-full"
                              />
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {teacher.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {teacher.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {teacher.credentials}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {teacher.submitted}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() =>
                              handleApprove(teacher.id, "teachers")
                            }
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(teacher.id, "teachers")}
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
                <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  No pending verifications
                </h3>
                <p className="text-gray-500 mt-1">
                  All teacher profiles have been verified.
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
