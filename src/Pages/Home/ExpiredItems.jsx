import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ExpiredItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("https://keep-fresh-server-side.vercel.app/items")
      .then((res) => res.json())
      .then((data) => {
        const expired = data.filter(
          (item) => item.expiryDate && new Date(item.expiryDate) < new Date()
        );
        expired.sort((a, b) => new Date(b.expiryDate) - new Date(a.expiryDate));
        setItems(expired);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Pagination
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = items.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => setCurrentPage(page);
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-[300px]"
      >
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">
            Checking for expired items...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-indigo-50 to-sky-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            <span className="text-red-600">Expired</span> Food Items
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            These items have passed their expiry date. Consider discarding them
            safely.
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
                boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:border-red-100 relative"
            >
              {/* Expired Badge */}
              <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                Expired
              </div>

              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/10 z-0"></div>
                <img
                  src={
                    item.image ||
                    "https://i.postimg.cc/3xQgzDmK/800px-Image-not-available.png"
                  }
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[20%]"
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
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                    {item.title || "Unnamed Item"}
                  </h3>

                  <div className="flex items-center justify-between mt-3 mb-4">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {item.category || "General"}
                    </span>

                    <div className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 text-red-500 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="font-medium text-red-600">
                        {item.expiryDate
                          ? new Date(item.expiryDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

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

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                } transition-colors font-medium`}
              >
                {i + 1}
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

export default ExpiredItems;
