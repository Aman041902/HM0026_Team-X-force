import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BookOpen, LogIn, UserPlus, Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Define navigation links
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about-us", label: "About Us" },
    { to: "/contact", label: "Contact" }
  ];

  

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-lg py-2" 
          : "bg-gradient-to-r from-blue-600 to-indigo-700 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center group">
          <BookOpen className={`h-8 w-8 ${isScrolled ? 'text-blue-600' : 'text-white'}`} />
          <span className={`ml-2 text-2xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-blue-600' : 'text-white'
          }`}>
            Edu<span className="text-yellow-400">Stream</span>
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className={`h-8 w-8 ${isScrolled ? 'text-blue-600' : 'text-white'}`} />
          ) : (
            <Menu className={`h-8 w-8 ${isScrolled ? 'text-blue-600' : 'text-white'}`} />
          )}
        </button>

        {/* Navigation Links */}
        <div 
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none transition-all duration-300 ease-in-out`}
        >
          <nav className="left-0 p-4  md:p-0 w-full mr-6 lg:mr-52">
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-3 md:space-y-0 w-full md:justify-start ">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink 
                    to={link.to} 
                    className={({ isActive }) => `
                      text-lg font-medium transition-colors duration-300 block py-1
                      ${isScrolled 
                        ? (isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600') 
                        : 'md:text-white md:hover:text-yellow-300 text-gray-700'
                      }
                    `}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              
              
              
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 p-4 md:p-0 border-t md:border-0 border-gray-200">
            <NavLink
              to="/login"
              className={`flex items-center justify-center px-5 py-2 rounded-lg font-medium transition duration-300
                ${isScrolled 
                  ? 'text-blue-600 border border-blue-600 hover:bg-blue-50' 
                  : 'text-white border border-white md:hover:border-yellow-400 md:hover:text-yellow-400'
                }
              `}
            >
              <LogIn className="h-4 w-4 mr-2" /> Login
            </NavLink>
            
            <NavLink
              to="/signup"
              className="flex items-center justify-center px-5 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition duration-300"
            >
              <UserPlus className="h-4 w-4 mr-2" /> Register
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;