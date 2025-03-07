import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Search, User,Clock } from "lucide-react";

const Navbar1 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsScrolled(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-gradient-to-r from-blue-600 to-indigo-700 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center group">
          <BookOpen className={`h-8 w-8 ${isScrolled ? "text-blue-600" : "text-white"}`} />
          <span
            className={`ml-2 text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-blue-600" : "text-white"
            }`}
          >
            Edu<span className="text-yellow-400">Stream</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-grow mx-6 max-w-xl ">
          <div className="h-fit  relative w-full">
            <input
              type="text"
              placeholder="Search for educational content..."
              className="w-full py-2 bg-white px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className=" absolute right-0 top-0 bottom-0  px-4 rounded-r-full border border-l-0 border-gray-300 ">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Profile Icon */}
        <div className="flex items-center gap-3">
        <div className="bg-gray-100 rounded-full p-2 md:hidden">
            <Search size={18} />
          </div>
          
          <Link
            to="/dashboard/student"
            className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold"
          >
            A
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar1;
