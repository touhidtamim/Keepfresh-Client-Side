import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";

const NotificationAlert = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/notifications/${user.email}`)
        .then((res) => res.json())
        .then((data) => setNotifications(data))
        .catch((err) => console.error("Notification fetch error:", err));
    }
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">📢 Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">No alerts right now.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((note, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl shadow-md bg-white border-l-4 border-sky-500"
            >
              <h3 className="text-xl font-semibold">{note.title}</h3>
              <p className="text-gray-700 mt-1">{note.message}</p>
              <p className="text-sm text-gray-400 mt-1">
                Days Left: {note.daysLeft}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationAlert;
