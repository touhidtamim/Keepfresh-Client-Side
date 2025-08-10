import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import {
  FiSearch,
  FiFilter,
  FiClock,
  FiAlertTriangle,
  FiBox,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const ShowAllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(16);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(9);
      } else {
        setItemsPerPage(6);
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Fetch data
  useEffect(() => {
    fetch("https://keep-fresh-server-side.vercel.app/items")
      .then((res) => res.json())
      .then((data) => {
        let sorted = [...data];
        if (sortBy === "newest")
          sorted.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        else if (sortBy === "oldest")
          sorted.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
        else if (sortBy === "expiry-asc")
          sorted.sort(
            (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
          );
        else if (sortBy === "expiry-desc")
          sorted.sort(
            (a, b) => new Date(b.expiryDate) - new Date(a.expiryDate)
          );
        setItems(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sortBy]);

  // Helpers
  const isExpired = (expiryDate) =>
    expiryDate && new Date(expiryDate) < new Date();
  const isNearlyExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = (expiry - now) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 5;
  };
  const handleSearch = () => setCurrentPage(1);

  // Filtering
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;
    const matchesStatus = statusFilter
      ? (statusFilter === "expired" && isExpired(item.expiryDate)) ||
        (statusFilter === "nearly-expired" &&
          isNearlyExpired(item.expiryDate)) ||
        (statusFilter === "fresh" &&
          !isExpired(item.expiryDate) &&
          !isNearlyExpired(item.expiryDate))
      : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const goToPage = (page) => setCurrentPage(page);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Animations
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  // Categories for filter
  const categories = [
    "Dairy",
    "Meat",
    "Vegetable",
    "Fruits",
    "Beverages",
    "Snacks",
    "Others",
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6">
      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {[
          {
            label: "Total Items",
            count: filteredItems.length,
            color: "bg-blue-100 dark:bg-blue-900",
            textColor: "text-blue-600 dark:text-blue-300",
            icon: <FiBox className="h-6 w-6" />,
          },
          {
            label: "Expired Items",
            count: filteredItems.filter((i) => isExpired(i.expiryDate)).length,
            color: "bg-red-100 dark:bg-red-900",
            textColor: "text-red-600 dark:text-red-300",
            icon: <FiAlertTriangle className="h-6 w-6" />,
          },
          {
            label: "Nearly Expiring",
            count: filteredItems.filter((i) => isNearlyExpired(i.expiryDate))
              .length,
            color: "bg-yellow-100 dark:bg-yellow-900",
            textColor: "text-yellow-600 dark:text-yellow-300",
            icon: <FiClock className="h-6 w-6" />,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start"
          >
            <div
              className={`${stat.color} ${stat.textColor} p-3 rounded-lg flex-shrink-0`}
            >
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                <CountUp end={stat.count} duration={1.5} />
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Filters */}
        <div
          className={`w-full lg:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 h-screen lg:sticky lg:top-4 transition-all duration-300 ${
            sidebarCollapsed ? "lg:w-20 overflow-hidden" : ""
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`text-lg font-semibold text-gray-900 dark:text-white flex items-center ${
                sidebarCollapsed ? "hidden" : ""
              }`}
            >
              <FiFilter className="mr-2" /> Filters
            </h2>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {sidebarCollapsed ? (
                <FiChevronRight className="h-5 w-5" />
              ) : (
                <FiChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Search */}
          <div className={`mb-5 ${sidebarCollapsed ? "hidden" : ""}`}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className={`mb-5 ${sidebarCollapsed ? "hidden" : ""}`}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className={`mb-5 ${sidebarCollapsed ? "hidden" : ""}`}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Statuses</option>
              <option value="fresh">Fresh</option>
              <option value="nearly-expired">Nearly Expired</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          {/* Sort By */}
          <div className={`${sidebarCollapsed ? "hidden" : ""}`}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="expiry-asc">Expiry (Soonest)</option>
              <option value="expiry-desc">Expiry (Latest)</option>
            </select>
          </div>

          {/* Collapsed View */}
          {sidebarCollapsed && (
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiFilter className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiSearch className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Items Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 rounded-full"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500 mb-4">
                <FiBox className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                No items found
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              {/* Items Count */}
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing{" "}
                  <span className="font-medium">
                    {indexOfFirstItem + 1}-
                    {Math.min(indexOfLastItem, filteredItems.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredItems.length}</span>{" "}
                  items
                </p>
              </div>

              {/* Items Grid */}
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {currentItems.map((item) => (
                  <motion.div
                    key={item._id}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="relative h-48">
                      <img
                        src={
                          item.image ||
                          "https://i.postimg.cc/3xQgzDmK/800px-Image-not-available.png"
                        }
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 flex flex-col space-y-2">
                        {isExpired(item.expiryDate) && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                            Expired
                          </span>
                        )}
                        {isNearlyExpired(item.expiryDate) &&
                          !isExpired(item.expiryDate) && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                              Expiring Soon
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {item.title}
                          </h3>
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p
                          className={`text-sm ${
                            isExpired(item.expiryDate)
                              ? "text-red-600 dark:text-red-400"
                              : isNearlyExpired(item.expiryDate)
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          Expiry:{" "}
                          {item.expiryDate
                            ? new Date(item.expiryDate).toLocaleDateString()
                            : "Unknown"}
                        </p>
                      </div>
                      <Link to={`/items/${item._id}`}>
                        <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-all duration-200">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          } transition-colors`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <button
                        onClick={() => goToPage(totalPages)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {totalPages}
                      </button>
                    )}
                  </div>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowAllItems;
