import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slicer/authSlicer";
import {
  Menu,
  X,
  Bell,
  CheckSquare,
  Calendar,
  User,
  LogOut,
  Settings,
  Moon,
  Sun,
  Search,
  Award,
} from "lucide-react";
import toast from "react-hot-toast";
import { getTasksWithQuery } from "../slicer/taskSlicer";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate task stats
  const pendingTasks =
    tasks?.filter((task) => task.status === "pending").length || 0;
  const completedTasks =
    tasks?.filter((task) => task.status === "completed").length || 0;
  const inProgressTasks =
    tasks?.filter((task) => task.status === "in-progress").length || 0;
  const totalTasks = tasks?.length || 0;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully!", {
        icon: "👋",
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
        },
      });
      navigate("/login");
      setIsMenuOpen(false);
    } catch (error) {
      toast.error(error.message || "Logout failed", {
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
        },
      });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
      dispatch(getTasksWithQuery(searchQuery));
      toast.success(`Searching for: ${searchQuery}`);
      setSearchQuery("");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const notifications = [
    {
      id: 1,
      title: "Task Completed",
      message: "You completed 'Design Dashboard' task",
      time: "2 hours ago",
      read: false,
      type: "success",
      icon: "✅",
    },
    {
      id: 2,
      title: "Due Tomorrow",
      message: "Project deadline is approaching",
      time: "5 hours ago",
      read: false,
      type: "warning",
      icon: "⏰",
    },
    {
      id: 3,
      title: "Team Update",
      message: "Sarah assigned you a new task",
      time: "1 day ago",
      read: true,
      type: "info",
      icon: "📢",
    },
  ];

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-slate-800/50 rounded-lg transition-all duration-300 group"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-purple-400 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                )}
              </button>

              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <CheckSquare className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                    TaskFlow
                  </h1>
                  <p className="text-xs text-gray-400 -mt-1 font-medium">
                    Productivity Unleashed
                  </p>
                </div>
              </Link>
            </div>

            {/* Middle Section - Search */}
            {isAuthenticated && (
              <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-purple-400 transition-colors duration-300" />
                      <input
                        type="text"
                        placeholder="Search tasks, projects, or teams..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  {/* Task Stats */}
                  <div className="hidden lg:flex items-center gap-3 mr-3">
                    {/* Completion Rate */}
                    <div className="group relative">
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl hover:border-green-500/40 transition-all duration-300">
                        <Award className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm font-semibold text-green-400">
                          {completionRate}%
                        </span>
                      </div>
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        Completion Rate
                      </div>
                    </div>

                    {/* Completed Tasks */}
                    <div className="group relative">
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-all duration-300">
                        <CheckSquare className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm font-semibold text-white">
                          {completedTasks}
                          <span className="text-gray-400">/{totalTasks}</span>
                        </span>
                      </div>
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        Completed Tasks
                      </div>
                    </div>

                    {/* Pending Tasks */}
                    {pendingTasks > 0 && (
                      <div className="group relative animate-pulse-slow">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl hover:border-yellow-500/50 transition-all duration-300">
                          <Calendar className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-sm font-semibold text-yellow-400">
                            {pendingTasks}
                          </span>
                        </div>
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          Pending Tasks
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Theme Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-2.5 hover:bg-slate-800/50 rounded-xl transition-all duration-300 group relative"
                    title={
                      darkMode ? "Switch to light mode" : "Switch to dark mode"
                    }
                  >
                    {darkMode ? (
                      <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-180 group-hover:scale-110 transition-all duration-500" />
                    ) : (
                      <Moon className="w-5 h-5 text-blue-400 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500" />
                    )}
                  </button>

                  {/* Notifications */}
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="relative p-2.5 hover:bg-slate-800/50 rounded-xl transition-all duration-300 cursor-pointer group"
                    >
                      <Bell className="w-5 h-5 text-purple-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                      {unreadNotifications > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce shadow-lg">
                          {unreadNotifications}
                        </span>
                      )}
                    </label>
                    <div
                      tabIndex={0}
                      className="dropdown-content menu p-0 shadow-2xl bg-slate-800/95 backdrop-blur-xl rounded-2xl w-96 z-[1] mt-3 border border-slate-700/50 overflow-hidden"
                    >
                      {/* Notifications Header */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-slate-700/50">
                        <h3 className="font-bold text-white flex items-center gap-2">
                          <Bell className="w-5 h-5 text-purple-400" />
                          Notifications
                        </h3>
                        <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium">
                          Mark all read
                        </button>
                      </div>

                      {/* Notifications List */}
                      <div className="p-4 space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                              notification.read
                                ? "bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50"
                                : "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:border-purple-500/50"
                            }`}
                          >
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                                {notification.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="font-semibold text-white text-sm">
                                    {notification.title}
                                  </h4>
                                  <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                                    {notification.time}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Notifications Footer */}
                      <div className="p-4 bg-slate-900/50 border-t border-slate-700/50">
                        <Link
                          to="/notifications"
                          className="block text-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300"
                        >
                          View all notifications →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* User Profile */}
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="cursor-pointer group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold ring-2 ring-purple-500/50 group-hover:ring-4 transition-all duration-300 shadow-lg">
                          {user?.username?.charAt(0).toUpperCase() || (
                            <User className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-3 shadow-2xl bg-slate-800/95 backdrop-blur-xl rounded-2xl w-64 z-[1] mt-3 border border-slate-700/50"
                    >
                      {/* User Info */}
                      <li className="px-3 py-3 border-b border-slate-700/50 mb-2 hover:bg-transparent">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {user?.username?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-white truncate">
                              {user?.username || "User"}
                            </div>
                            <div className="text-sm text-gray-400 truncate">
                              {user?.email || "user@example.com"}
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* Menu Items */}
                      <li>
                        <Link
                          to="/profile"
                          className="py-3 hover:bg-purple-500/10 hover:text-purple-400 rounded-xl transition-all duration-300 group"
                        >
                          <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium">My Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/settings"
                          className="py-3 hover:bg-blue-500/10 hover:text-blue-400 rounded-xl transition-all duration-300 group"
                        >
                          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                          <span className="font-medium">Settings</span>
                        </Link>
                      </li>

                      <div className="divider my-2 opacity-20"></div>

                      {/* Logout */}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all duration-300 group"
                        >
                          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 hover:bg-slate-800/50 rounded-xl transition-all duration-300 text-gray-300 hover:text-white font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="relative group px-5 py-2 rounded-xl font-semibold overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-105 transition-transform duration-300"></div>
                    <span className="relative text-white">Get Started</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800/50 mt-2 animate-slideDown">
              {isAuthenticated ? (
                <div className="space-y-4">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="px-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </form>

                  {/* Mobile Stats */}
                  <div className="grid grid-cols-3 gap-2 px-2">
                    <div className="flex flex-col items-center gap-1 px-3 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <Award className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-bold text-green-400">
                        {completionRate}%
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 px-3 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <CheckSquare className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-bold text-white">
                        {completedTasks}/{totalTasks}
                      </span>
                    </div>
                    {pendingTasks > 0 && (
                      <div className="flex flex-col items-center gap-1 px-3 py-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                        <Calendar className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm font-bold text-yellow-400">
                          {pendingTasks}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Mobile Menu Items */}
                  <div className="space-y-1 px-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-500/10 hover:text-blue-400 rounded-xl transition-all duration-300 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 rounded-xl transition-all duration-300 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                      <span className="font-medium">Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        toggleDarkMode();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 rounded-xl transition-all duration-300 w-full text-left group"
                    >
                      {darkMode ? (
                        <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
                      ) : (
                        <Moon className="w-5 h-5 text-blue-400 group-hover:-rotate-12 transition-transform duration-500" />
                      )}
                      <span className="font-medium">
                        {darkMode ? "Light Mode" : "Dark Mode"}
                      </span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 w-full text-left group"
                    >
                      <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 px-2">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-3 text-center hover:bg-slate-800/50 rounded-xl transition-all duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full px-4 py-3 text-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:scale-105 transition-transform duration-300 font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a855f7, #ec4899);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #9333ea, #db2777);
        }
      `}</style>
    </>
  );
};

export default Header;
