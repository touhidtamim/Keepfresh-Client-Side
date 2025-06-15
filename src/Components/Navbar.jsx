import React, { useContext, useState } from "react";
import { FiMenu, FiX, FiBell, FiLogOut } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const defaultAvatar =
    "https://i.postimg.cc/0QTwptyd/png-transparent-default-avatar-thumbnail.png";

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

  const activeLinkClass = "bg-sky-200 text-gray-900 font-semibold";
  const normalLinkClass =
    "hover:bg-sky-100 hover:text-gray-900 transition duration-300";

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        await logOut();
        Swal.fire("Success", "You have been logged out", "success");
        navigate("/login");
      } catch (error) {
        Swal.fire("Error", "Logout failed. Try again.", "error");
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <nav className="relative bg-[#f9fbfc] text-gray-900 font-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Hamburger (mobile & tablet) */}
          <div className="flex items-center">
            <button
              className="lg:hidden py-2 mr-1 rounded-md hover:bg-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="ml-2 lg:ml-0">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-15 lg:h-18 w-auto pb-3 py-1"
                  src="/src/assets/logo-transparent.png"
                  alt="Logo"
                />
              </div>
            </Link>
          </div>

          {/* Middle - Navigation Links (desktop only) */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
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
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                {/* Notification Button */}
                <button
                  className="p-2 cursor-pointer rounded-full hover:bg-sky-100 transition"
                  onClick={() => navigate("/notifications")}
                  title="Notifications"
                >
                  <FiBell className="h-5 w-5 text-gray-700" />
                </button>

                {/* Avatar with hover tooltip and click to dashboard */}
                <div className="relative group cursor-pointer">
                  <img
                    src={user.photoURL || defaultAvatar}
                    alt="User"
                    onClick={() => navigate("/dashboard")}
                    title={user.displayName || "User"}
                    className="h-9 w-9 rounded-full border border-gray-300 hover:ring-2 ring-sky-300"
                  />
                  <div className="absolute hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 top-full mt-1 right-0 z-50 whitespace-nowrap">
                    {user.displayName || "User"}
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className=" hidden cursor-pointer lg:flex items-center gap-1 px-3 py-2 rounded-md text-md text-red-600 hover:bg-red-100"
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn bg-sky-300 lg:bg-white hover:bg-sky-100 px-3 py-2 rounded-md text-md hover:text-gray-900 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden lg:block px-3 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet menu */}
      {/* Mobile & Tablet menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-50 shadow-md z-40 lg:hidden">
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
                className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base text-red-700 bg-red-100 hover:bg-red-200"
                onClick={() => {
                  handleLogout();
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
