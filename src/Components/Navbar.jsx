import React, { useState } from "react";
import { FiMenu, FiX, FiBell, FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isLoggedIn = false, user = null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation links
  const loggedOutLinks = [
    { name: "Home", path: "/" },
    { name: "Fridge", path: "/fridge" },
    { name: "Blog", path: "/blog" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const loggedInLinks = [
    { name: "Home", path: "/" },
    { name: "Fridge", path: "/fridge" },
    { name: "Add Food", path: "/add-food" },
    { name: "My Items", path: "/my-items" },
    { name: "Blog", path: "/blog" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const activeLinkClass = "bg-sky-200 text-gray-900 font-medium";
  const normalLinkClass =
    "hover:bg-sky-100 hover:text-gray-900 transition duration-300";

  return (
    <nav className="bg-[#f9fbfc] text-gray-900 font-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Hamburger (mobile) */}
          <div className="flex items-center">
            {/* Hamburger for mobile */}
            <button
              className="md:hidden py-2 mr-1 rounded-md hover:bg-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="ml-2 md:ml-0">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-15 md:h-18 w-auto pb-3 py-1"
                  src="/src/assets/logo-transparent.png"
                  alt="Logo"
                />
              </div>
            </Link>
          </div>

          {/* Middle - Navigation Links (desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {(isLoggedIn ? loggedInLinks : loggedOutLinks).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm ${
                  location.pathname === link.path
                    ? activeLinkClass
                    : normalLinkClass
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side - Auth/User controls */}
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <button className="p-2 rounded-full hover:bg-white relative">
                  <FiBell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                <div className="relative group">
                  <button className="flex items-center space-x-1 focus:outline-none">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.avatar || "https://via.placeholder.com/32"}
                      alt="User"
                    />
                  </button>
                  <div className="absolute hidden group-hover:block right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <p className="block px-4 py-2 text-sm text-gray-700 border-b">
                      {user?.name || "User"}
                    </p>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className=" btn bg-sky-300 md:bg-white  hover:bg-sky-100 px-3 py-2 rounded-md text-md hover:text-gray-900 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden md:block px-3 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {(isLoggedIn
              ? loggedInLinks.filter((link) => link.name !== "Home")
              : loggedOutLinks.filter((link) => link.name !== "Home")
            ).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base ${
                  location.pathname === link.path
                    ? activeLinkClass
                    : normalLinkClass
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isLoggedIn && (
              <button
                className="w-full flex items-center px-3 py-2 rounded-md text-base text-red-600 hover:bg-red-50"
                onClick={() => {
                  // Handle logout
                  setIsMobileMenuOpen(false);
                }}
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
