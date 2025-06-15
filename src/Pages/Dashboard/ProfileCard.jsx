import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ProfileCard = () => {
  const { user, updateUser, loading } = useContext(AuthContext);

  // Local state for form inputs
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");

  // Sync local state with user data on load or user change
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Handle update button click
  const handleUpdate = async () => {
    if (!name.trim()) {
      Swal.fire("Oops!", "Name can't be empty", "warning");
      return;
    }

    try {
      await updateUser({ displayName: name, photoURL });
      Swal.fire("✅ Updated!", "Profile updated successfully", "success");
    } catch (error) {
      Swal.fire(
        "❌ Error",
        error.message || "Failed to update profile",
        "error"
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto mt-12 px-6"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-sky-700">
        Your Profile
      </h2>

      <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center gap-8">
        {/* Profile Image */}
        <img
          src={photoURL || "/default-avatar.png"}
          alt="Profile"
          className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-sky-300 shadow-md"
        />

        {/* Form */}
        <div className="flex-1 w-full space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              disabled={loading}
            />
          </div>

          {/* Email - read only */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email (read-only)
            </label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Image URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Paste image URL here"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              disabled={loading}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold text-white ${
              loading
                ? "bg-sky-300 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
            } transition-colors duration-300`}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
