import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ShowAllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const isExpired = (expiryDate) => new Date(expiryDate) < new Date();

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleShowLess = () => {
    setVisibleCount(6);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto mb-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {[
          {
            label: "Total Items",
            count: items.length,
            color: "blue",
            iconPath:
              "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
          },
          {
            label: "Fresh Items",
            count: items.filter((i) => !isExpired(i.expiryDate)).length,
            color: "green",
            iconPath: "M5 13l4 4L19 7",
          },
          {
            label: "Expired Items",
            count: items.filter((i) => isExpired(i.expiryDate)).length,
            color: "red",
            iconPath: "M6 18L18 6M6 6l12 12",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow rounded-lg flex items-center"
          >
            <div className={`bg-${stat.color}-500 p-3 rounded-md text-white`}>
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
                {stat.count}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {items.slice(0, visibleCount).map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={
                      item.foodImage ||
                      "https://i.postimg.cc/3xQgzDmK/800px-Image-not-available.png"
                    }
                    alt={item.foodTitle}
                    className="w-full h-48 object-cover"
                  />
                  {isExpired(item.expiryDate) && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-md font-semibold px-3 py-1 rounded-full">
                      Expired
                    </span>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.foodTitle}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-700">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      isExpired(item.expiryDate)
                        ? "text-red-600"
                        : "text-gray-700"
                    }`}
                  >
                    Expiry: {new Date(item.expiryDate).toLocaleDateString()}
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

          {/* Show More / Show Less Buttons */}
          {items.length > 6 && (
            <div className="text-center mt-10">
              {visibleCount < items.length ? (
                <button
                  onClick={handleShowMore}
                  className="bg-sky-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-all"
                >
                  Show More
                </button>
              ) : (
                <button
                  onClick={handleShowLess}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all"
                >
                  Show Less
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowAllItems;
