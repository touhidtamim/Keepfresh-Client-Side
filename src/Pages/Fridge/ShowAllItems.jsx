import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const ShowAllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("https://keep-fresh-server-side.vercel.app/items")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
        );
        setItems(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
    return matchesSearch && matchesCategory;
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
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full sm:w-1/2 flex">
          <input
            type="text"
            placeholder="Search by title or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-l-md"
          />
          <button
            onClick={handleSearch}
            className="bg-sky-600 text-white px-4 rounded-r-md hover:bg-sky-700 transition"
          >
            Search
          </button>
        </div>
        <select
          className="w-full sm:w-1/4 px-4 py-2 border rounded-md"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Snacks">Snacks</option>
          <option value="Others">Others</option>
        </select>
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
            color: "bg-blue-500",
            iconPath:
              "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
          },
          {
            label: "Expired Items",
            count: filteredItems.filter((i) => isExpired(i.expiryDate)).length,
            color: "bg-red-500",
            iconPath: "M6 18L18 6M6 6l12 12",
          },
          {
            label: "Nearly Expiring",
            count: filteredItems.filter((i) => isNearlyExpired(i.expiryDate))
              .length,
            color: "bg-yellow-500",
            iconPath: "M5 13l4 4L19 7",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow rounded-lg flex items-center"
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
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">
                <CountUp end={stat.count} duration={1} />
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-blue-500 border-solid" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-20">
          No items found.
        </div>
      ) : (
        <>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentItems.map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
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
                  {isExpired(item.expiryDate) && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Expired
                    </span>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.title || "Unnamed Item"}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {item.category || "Uncategorized"}
                    </span>
                    <span className="text-sm text-gray-700">
                      Qty: {item.quantity ?? "N/A"}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      isExpired(item.expiryDate)
                        ? "text-red-600"
                        : "text-gray-700"
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
                      className="w-full cursor-pointer bg-gradient-to-r from-sky-500 to-sky-800 text-white py-2 rounded-lg"
                    >
                      See Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-sky-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowAllItems;
