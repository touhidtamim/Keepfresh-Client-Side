import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import {
  FiCalendar,
  FiClock,
  FiPackage,
  FiAlertTriangle,
} from "react-icons/fi";
import { BsDropletHalf } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const OverviewPage = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Fetch items data
    fetch("https://keep-fresh-server-side.vercel.app/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch recent activities (you'll need to create this endpoint)
    fetch("https://keep-fresh-server-side.vercel.app/activities")
      .then((res) => res.json())
      .then((data) => setRecentActivities(data))
      .catch(() => setRecentActivities([]));
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

  // Calculate stats from items data
  const stats = [
    {
      title: "Total Items",
      value: items.length,
      icon: <FiPackage className="text-blue-500" />,
      change: "+0%",
      trend: "up",
    },
    {
      title: "Expiring Soon",
      value: items.filter((i) => isNearlyExpired(i.expiryDate)).length,
      icon: <FiClock className="text-yellow-500" />,
      change: "+0",
      trend: "up",
    },
    {
      title: "Expired Items",
      value: items.filter((i) => isExpired(i.expiryDate)).length,
      icon: <FiAlertTriangle className="text-red-500" />,
      change: "+0",
      trend: "up",
    },
    {
      title: "Fresh Items",
      value: items.filter(
        (i) => !isExpired(i.expiryDate) && !isNearlyExpired(i.expiryDate)
      ).length,
      icon: <BsDropletHalf className="text-green-500" />,
      change: "+0",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6">
      {/* User Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={
                user?.photoURL ||
                "https://i.postimg.cc/0QTwptyd/png-transparent-default-avatar-thumbnail.png"
              }
              alt={user?.displayName || "User"}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
              onError={(e) => {
                e.target.src = "https://i.ibb.co/5GzXkwq/user.png";
              }}
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
              <FaRegSmile className="text-white text-lg" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {user?.displayName || "User"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {user?.email}
            </p>
            <div className="flex items-center justify-center md:justify-start text-sm text-gray-500 dark:text-gray-400">
              <FiCalendar className="mr-1" />
              <span>
                Member since{" "}
                {new Date(user?.metadata?.creationTime).toLocaleDateString() ||
                  "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                  {loading ? (
                    <span className="inline-block w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
                  ) : (
                    <CountUp end={stat.value} duration={1.5} />
                  )}
                </h3>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                {stat.icon}
              </div>
            </div>
            <p
              className={`text-sm mt-3 ${
                stat.trend === "up" ? "text-blue-500" : "text-red-500"
              }`}
            >
              {stat.change} {stat.trend === "up" ? "↑" : "↓"} from last week
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Recent Activities
        </h3>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse flex items-start pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
              >
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2 mr-3 mt-1 h-8 w-8"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : recentActivities.length > 0 ? (
          <div className="space-y-4">
            {recentActivities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
              >
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3 mt-1">
                  <FiCalendar className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.date).toLocaleDateString()} •{" "}
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No recent activities found
          </p>
        )}
      </div>

      {/* Quick Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Food Storage Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-teal-50 dark:bg-teal-900/30 rounded-lg p-4">
            <h4 className="font-medium text-teal-600 dark:text-teal-400 mb-2">
              Dairy Products
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Store milk and cheese in the coldest part of the fridge, not the
              door.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
            <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
              Vegetables
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Keep leafy greens in airtight containers with a paper towel to
              absorb moisture.
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4">
            <h4 className="font-medium text-yellow-600 dark:text-yellow-400 mb-2">
              Meat Storage
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Store raw meat on the bottom shelf to prevent cross-contamination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
