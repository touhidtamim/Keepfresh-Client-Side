import React, { useContext, useState, useEffect } from "react";
import { FiMenu, FiX, FiBell, FiLogOut } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const defaultAvatar =
    "https://i.postimg.cc/0QTwptyd/png-transparent-default-avatar-thumbnail.png";

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://keep-fresh-server-side.vercel.app/notifications/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setHasUnreadNotifications(true);
          }
        })
        .catch((err) => console.error("Notification fetch error:", err));
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: "Blog", path: "/blog" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const activeLinkClass =
    "bg-sky-200 dark:bg-sky-700 text-gray-900 dark:text-white font-semibold";

  const normalLinkClass =
    "relative inline-block font-semibold text-gray-800 dark:text-gray-200 transition duration-300 hover:text-gray-900 dark:hover:text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1.5px] after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full after:rounded";

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
    <nav
      className={`transition-all duration-300 py-1 border-b ${
        isSticky
          ? "fixed top-0 left-0 w-full bg-sky-50 dark:bg-gray-800 shadow-sm z-50 border-gray-200 dark:border-gray-700"
          : "relative bg-sky-50 dark:bg-gray-900 border-transparent dark:border-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Menu */}
          <div className="flex items-center">
            <button
              className="lg:hidden py-2 mr-1 rounded-md hover:bg-white dark:hover:bg-gray-700 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6 text-gray-900 dark:text-white" />
              ) : (
                <FiMenu className="h-6 w-6 text-gray-900 dark:text-white" />
              )}
            </button>

            <Link to="/" className="ml-2 lg:ml-0">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-15 lg:h-18 w-auto pb-3 py-1"
                  src="https://i.postimg.cc/d3YdpZK1/logo-transparent.png"
                  alt="Logo"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {(isLoggedIn ? loggedInLinks : loggedOutLinks).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1 rounded-md text-sm ${
                  location.pathname === link.path
                    ? activeLinkClass
                    : normalLinkClass
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                {/* Notification */}
                <div className="relative">
                  <button
                    className="p-2 cursor-pointer rounded-full hover:bg-sky-100 dark:hover:bg-sky-800 transition"
                    onClick={() => {
                      setHasUnreadNotifications(false);
                      navigate("/notifications");
                    }}
                    title="Notifications"
                  >
                    <FiBell className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                  </button>
                  {hasUnreadNotifications && (
                    <>
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
                    </>
                  )}
                </div>

                {/* Avatar */}
                <div className="relative group cursor-pointer">
                  <HashLink to="/dashboard/my-profile" smooth>
                    <img
                      src={user.photoURL || defaultAvatar}
                      alt="User"
                      title={user.displayName || "User"}
                      className="h-9 w-9 rounded-full border border-gray-300 dark:border-gray-600 hover:ring-2 ring-sky-300 dark:ring-sky-500 cursor-pointer"
                    />
                  </HashLink>
                  <div className="absolute hidden group-hover:block bg-black dark:bg-gray-100 text-white dark:text-black text-xs rounded px-2 py-1 top-full mt-1 right-0 z-50 whitespace-nowrap">
                    {user.displayName || "User"}
                  </div>
                </div>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden cursor-pointer lg:flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 border border-red-200 dark:border-red-700 hover:bg-red-100 dark:hover:text-white dark:hover:bg-red-600 transition duration-200"
                >
                  <FiLogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn bg-sky-700 lg:bg-white dark:lg:bg-gray-700 hover:border-gray-800 px-3 py-2 rounded-md text-md hover:text-gray-900 dark:text-white dark:hover:text-white transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden lg:block px-3 py-2 rounded-md text-sm bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-50 dark:bg-gray-800 shadow-md z-40 lg:hidden">
          <div className="flex flex-col px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {(isLoggedIn ? loggedInLinks : loggedOutLinks).map((link) => (
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
                className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base text-red-700 bg-red-100 dark:text-white dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800"
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
