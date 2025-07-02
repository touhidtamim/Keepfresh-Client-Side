import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const ShowAllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default to mobile view

  // Set items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1280) {
        // Desktop (xl)
        setItemsPerPage(16); // 4x4 grid
      } else if (window.innerWidth >= 768) {
        // Tablet (lg)
        setItemsPerPage(9); // 3x3 grid
      } else {
        // Mobile
        setItemsPerPage(6); // 2x3 grid
      }
    };

    // Set initial value
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    fetch("https://keep-fresh-server-side.vercel.app/items")
      .then((res) => res.json())
      .then((data) => {
        let sorted = [...data];
        if (sortBy === "newest") {
          sorted.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        } else if (sortBy === "oldest") {
          sorted.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
        } else if (sortBy === "expiry-asc") {
          sorted.sort(
            (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
          );
        } else if (sortBy === "expiry-desc") {
          sorted.sort(
            (a, b) => new Date(b.expiryDate) - new Date(a.expiryDate)
          );
        }
        setItems(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sortBy]);

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

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const goToPage = (page) => setCurrentPage(page);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="flex">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-l-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="bg-sky-600 dark:bg-sky-700 text-white px-4 rounded-r-md hover:bg-sky-700 dark:hover:bg-sky-800 transition"
            >
              Search
            </button>
          </div>

          {/* Category Filter */}
          <select
            className="px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Categories</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Beverage">Beverage</option>
            <option value="Snacks">Snacks</option>
            <option value="Others">Others</option>
          </select>

          {/* Status Filter */}
          <select
            className="px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="fresh">Fresh</option>
            <option value="nearly-expired">Nearly Expired</option>
            <option value="expired">Expired</option>
          </select>

          {/* Sort By */}
          <select
            className="px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="expiry-asc">Expiry (Soonest)</option>
            <option value="expiry-desc">Expiry (Latest)</option>
          </select>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto mb-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {[
          {
            label: "Total Items",
            count: filteredItems.length,
            color: "bg-blue-500 dark:bg-blue-600",
            iconPath:
              "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
          },
          {
            label: "Expired Items",
            count: filteredItems.filter((i) => isExpired(i.expiryDate)).length,
            color: "bg-red-500 dark:bg-red-600",
            iconPath: "M6 18L18 6M6 6l12 12",
          },
          {
            label: "Nearly Expiring",
            count: filteredItems.filter((i) => isNearlyExpired(i.expiryDate))
              .length,
            color: "bg-yellow-500 dark:bg-yellow-600",
            iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg flex items-center"
          >
            <div className={`${stat.color} p-3 rounded-md text-white`}>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={stat.iconPath}
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                <CountUp end={stat.count} duration={1} />
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Cards Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-blue-500 border-solid" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 text-xl mt-20">
          No items found matching your criteria.
        </div>
      ) : (
        <>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {currentItems.map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="relative">
                  <img
                    src={
                      item.image ||
                      "https://i.postimg.cc/3xQgzDmK/800px-Image-not-available.png"
                    }
                    alt={item.title || "Food Item"}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://i.postimg.cc/3xQgzDmK/800px-Image-not-available.png";
                    }}
                  />
                  {isExpired(item.expiryDate) ? (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Expired
                    </span>
                  ) : isNearlyExpired(item.expiryDate) ? (
                    <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Expiring Soon
                    </span>
                  ) : null}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                    {item.title || "Unnamed Item"}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                      {item.category || "Uncategorized"}
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      Qty: {item.quantity ?? "N/A"}
                    </span>
                  </div>
                  <p
                    className={`text-xs ${
                      isExpired(item.expiryDate)
                        ? "text-red-600 dark:text-red-400"
                        : isNearlyExpired(item.expiryDate)
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Expiry:{" "}
                    {item.expiryDate
                      ? new Date(item.expiryDate).toLocaleDateString()
                      : "Unknown"}
                  </p>
                  <Link to={`/items/${item._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full mt-2 cursor-pointer bg-gradient-to-r from-sky-500 to-sky-800 dark:from-sky-600 dark:to-sky-900 text-white py-2 rounded-md text-sm"
                    >
                      See Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white disabled:opacity-50 transition-colors flex items-center text-sm"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {/* Always show first page */}
                  {currentPage > 2 && totalPages > 3 && (
                    <button
                      onClick={() => goToPage(1)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        currentPage === 1
                          ? "bg-sky-600 text-white shadow-md"
                          : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                      } transition-colors font-medium text-xs`}
                    >
                      1
                    </button>
                  )}

                  {/* Show ellipsis if current page is far from start */}
                  {currentPage > 3 && (
                    <span className="px-1 text-gray-500 dark:text-gray-400">
                      ...
                    </span>
                  )}

                  {/* Show pages around current page */}
                  {[currentPage - 1, currentPage, currentPage + 1]
                    .filter((page) => page > 0 && page <= totalPages)
                    .map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          currentPage === page
                            ? "bg-sky-600 text-white shadow-md"
                            : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        } transition-colors font-medium text-xs`}
                      >
                        {page}
                      </button>
                    ))}

                  {/* Show ellipsis if current page is far from end */}
                  {currentPage < totalPages - 2 && (
                    <span className="px-1 text-gray-500 dark:text-gray-400">
                      ...
                    </span>
                  )}

                  {/* Always show last page if there's more than one page */}
                  {totalPages > 1 && currentPage < totalPages - 1 && (
                    <button
                      onClick={() => goToPage(totalPages)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        currentPage === totalPages
                          ? "bg-sky-600 text-white shadow-md"
                          : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                      } transition-colors font-medium text-xs`}
                    >
                      {totalPages}
                    </button>
                  )}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white disabled:opacity-50 transition-colors flex items-center text-sm"
                >
                  Next
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Page info */}
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages} • {filteredItems.length}{" "}
                items
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowAllItems;
