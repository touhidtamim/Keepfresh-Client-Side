import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NearlyExpiryItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        const fiveDaysLater = new Date();
        fiveDaysLater.setDate(today.getDate() + 5);

        const nearlyExpiry = data.filter((item) => {
          if (!item.expiryDate) return false;
          const expiry = new Date(item.expiryDate);
          return expiry >= today && expiry <= fiveDaysLater;
        });

        nearlyExpiry.sort(
          (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
        );

        setItems(nearlyExpiry);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page) => setCurrentPage(page);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-[300px]"
      >
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your items...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="w-full bg-gradient-to-b from-[#f8fafc] via-[#f8fafc] to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Items <span className="text-sky-600">Nearing Expiry</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            These items will expire within the next 5 days. Take action to
            prevent waste!
          </p>
        </motion.div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:border-indigo-100"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={
                    item.image ||
                    "https://i.postimg.cc/3xQgzDmK/800px-Image-not-available.png"
                  }
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://i.postimg.cc/3xQgzDmK/800px-Image-not-available.png";
                  }}
                />
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                  {item.quantity || 1} {item.quantity > 1 ? "units" : "unit"}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-grow flex flex-col">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                      {item.title || "Unnamed Item"}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {item.category || "General"}
                    </span>

                    <div className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 text-amber-500 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium text-amber-600">
                        {item.expiryDate
                          ? new Date(item.expiryDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <Link to={`/items/${item._id}`} className="mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full cursor-pointer bg-gradient-to-r from-sky-600 to-sky-400 hover:from-sky-700 hover:to-sky-600 text-white font-medium py-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Details
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="mx-auto w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No items expiring soon
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              When items approach their expiry date (within 5 days), they'll
              appear here automatically.
            </p>
            <Link
              to="/add-food"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              <svg
                className="-ml-1 mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Items
            </Link>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 flex justify-center items-center gap-2"
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors flex items-center"
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

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                } transition-colors font-medium`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors flex items-center"
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
          </motion.div>
        )}
      </div>{" "}
    </section>
  );
};

export default NearlyExpiryItems;
