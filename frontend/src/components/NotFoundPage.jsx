import { Link, useNavigate } from "react-router";
import {
  Home,
  Search,
  ArrowLeft,
  AlertTriangle,
  Compass,
  User,
  Settings,
  Sparkles,
  Zap,
  Star,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const quickLinks = [
    {
      to: "/tasks",
      icon: Compass,
      label: "My Tasks",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500/60",
    },
    {
      to: "/profile",
      icon: User,
      label: "Profile",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      hoverBorder: "hover:border-purple-500/60",
    },
    {
      to: "/settings",
      icon: Settings,
      label: "Settings",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      hoverBorder: "hover:border-green-500/60",
    },
  ];

  const popularPages = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/tasks/create", icon: Sparkles, label: "Create Task" },
    { to: "/analytics", icon: TrendingUp, label: "Analytics" },
    { to: "/help", icon: Star, label: "Help Center" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="w-full max-w-3xl relative z-10">
        {/* Main Content */}
        <div className="backdrop-blur-xl bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-800/50 shadow-2xl">
          {/* Icon & 404 Section */}
          <div className="text-center mb-10">
            {/* Animated Icon */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center border-4 border-purple-500/40 shadow-2xl group hover:scale-110 transition-transform duration-500">
                <AlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-yellow-400 animate-bounce-slow" />
                
                {/* Orbiting Stars */}
                <div className="absolute inset-0 animate-spin-slow">
                  <Sparkles className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-yellow-300" />
                  <Sparkles className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 text-pink-300" />
                  <Sparkles className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-purple-300" />
                  <Sparkles className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                </div>
              </div>
            </div>

            {/* 404 Number */}
            <h1 className="text-8xl md:text-9xl font-black mb-6 tracking-tight">
              <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                404
              </span>
            </h1>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
              Page Not Found
              <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-400 mb-2 leading-relaxed">
              Oops! The page you're looking for seems to have vanished into the void.
            </p>
            <p className="text-sm text-gray-500">
              Let's get you back on track! 🚀
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-purple-400 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="What are you looking for? Try 'tasks', 'profile', or 'settings'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                />
              </div>
            </form>
          </div>

          {/* Main Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="group relative px-6 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-gray-300 hover:bg-slate-800 hover:border-purple-500/50 hover:text-white transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-3">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-semibold">Go Back</span>
              </div>
            </button>

            <Link
              to="/"
              className="group relative px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Back to Home</span>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Quick Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={`group relative px-6 py-5 ${link.bgColor} border ${link.borderColor} ${link.hoverBorder} rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative flex flex-col items-center gap-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${link.color} group-hover:scale-110 transition-transform duration-300`}>
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold text-white group-hover:text-white transition-colors duration-300">
                      {link.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Pages */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              Popular Pages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularPages.map((page, index) => (
                <Link
                  key={index}
                  to={page.to}
                  className="group px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-gray-300 hover:bg-slate-700 hover:border-purple-500/50 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-2">
                    <page.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">{page.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Lost? Don't worry, even the best explorers get lost sometimes. 🧭
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 3s linear infinite;
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;