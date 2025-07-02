import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiAlertTriangle,
  FiEye,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const ExpiryTable = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    setLoading(true);
    fetch("https://keep-fresh-server-side.vercel.app/items")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(today.getDate() - 15);

        const recentlyExpired = data.filter((item) => {
          if (!item.expiryDate) return false;
          const expiryDate = new Date(item.expiryDate);
          return expiryDate >= fifteenDaysAgo && expiryDate <= today;
        });

        recentlyExpired.sort(
          (a, b) => new Date(b.expiryDate) - new Date(a.expiryDate)
        );
        setItems(recentlyExpired);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

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
          <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-700 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Loading recently expired items...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <FiClock className="text-yellow-500 text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Recently Expired Items
          </h2>
        </motion.div>
        <p className="text-gray-500 dark:text-gray-400">
          {items.length} items expired in last 15 days
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left text-gray-600 dark:text-gray-300 font-medium">
                Item
              </th>
              <th className="p-3 text-left text-gray-600 dark:text-gray-300 font-medium">
                Category
              </th>
              <th className="p-3 text-left text-gray-600 dark:text-gray-300 font-medium">
                Quantity
              </th>
              <th className="p-3 text-left text-gray-600 dark:text-gray-300 font-medium">
                Expired On
              </th>
              <th className="p-3 text-left text-gray-600 dark:text-gray-300 font-medium">
                Days Ago
              </th>
              <th className="p-3 text-left text-gray-600 dark:text-gray-300 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentItems.map((item) => {
              const expiryDate = new Date(item.expiryDate);
              const today = new Date();
              const daysAgo = Math.floor(
                (today - expiryDate) / (1000 * 60 * 60 * 24)
              );

              return (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="p-3">
                    <div className="flex items-center">
                      <img
                        src={
                          item.image ||
                          "https://i.postimg.cc/3xQgzDmK/800px-Image-not-available.png"
                        }
                        alt={item.title}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                        onError={(e) => {
                          e.target.src =
                            "https://i.postimg.cc/3xQgzDmK/800px-Image-not-available.png";
                        }}
                      />
                      <span className="font-medium text-gray-800 dark:text-white">
                        {item.title || "Unnamed Item"}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full">
                      {item.category || "General"}
                    </span>
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">
                    {item.quantity || 1} {item.quantity > 1 ? "units" : "unit"}
                  </td>
                  <td className="p-3 text-red-600 dark:text-red-400 font-medium">
                    {expiryDate.toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        daysAgo <= 3
                          ? "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200"
                          : daysAgo <= 7
                          ? "bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200"
                          : "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200"
                      }`}
                    >
                      {daysAgo === 0
                        ? "Today"
                        : `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link to={`/items/${item._id}`}>
                      <button className="flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300">
                        <FiEye className="mr-1" /> View
                      </button>
                    </Link>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {indexOfFirst + 1}-{Math.min(indexOfLast, items.length)} of{" "}
            {items.length} items
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              <FiChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                } transition-colors`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpiryTable;
