import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";
import { FiBell, FiAlertTriangle, FiInfo, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";

const NotificationAlert = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(
        `https://keep-fresh-server-side.vercel.app/notifications/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setNotifications(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Notification fetch error:", err);
          toast.error("Failed to load notifications");
          setLoading(false);
        });
    }
  }, [user]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "warning":
        return (
          <FiAlertTriangle className="text-yellow-500 dark:text-yellow-400" />
        );
      case "info":
        return <FiInfo className="text-blue-500 dark:text-blue-400" />;
      case "success":
        return <FiCheckCircle className="text-green-500 dark:text-green-400" />;
      default:
        return <FiBell className="text-sky-500 dark:text-sky-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-sky-600 dark:bg-sky-800 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiBell className="text-2xl mr-3" />
                <h2 className="text-2xl font-bold">Notifications</h2>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {notifications.length} alerts
              </span>
            </div>
            <p className="text-sky-100 dark:text-sky-200 mt-1">
              Your recent food item alerts
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500 dark:border-sky-400"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-10">
                <FiBell className="mx-auto text-4xl text-gray-400 dark:text-gray-500 mb-3" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                  No notifications yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  You'll see alerts here when items are expiring soon
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((note, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-5 rounded-lg shadow-sm border-l-4 ${
                      note.priority === "high"
                        ? "border-red-500 dark:border-red-400 bg-red-50/50 dark:bg-red-900/20"
                        : note.priority === "medium"
                        ? "border-yellow-500 dark:border-yellow-400 bg-yellow-50/50 dark:bg-yellow-900/20"
                        : "border-sky-500 dark:border-sky-400 bg-sky-50/50 dark:bg-sky-900/20"
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        {getNotificationIcon(note.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {note.title}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              note.priority === "high"
                                ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                                : note.priority === "medium"
                                ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                                : "bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200"
                            }`}
                          >
                            {note.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {note.message}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <FiClock className="mr-1" />
                            {note.daysLeft > 0
                              ? `${note.daysLeft} days remaining`
                              : "Expired"}
                          </div>
                          <button className="text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300">
                            View item
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationAlert;
