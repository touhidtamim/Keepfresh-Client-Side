import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider";
import { FiArrowLeft } from "react-icons/fi";

import FoodImageExpiry from "./FoodImageExpiry";
import FoodTitleDescription from "./FoodTitleDescription";
import FoodBasicInfo from "./FoodBasicInfo";
import FoodCountdown from "./FoodCountdown";
import FoodNotes from "./FoodNotes";
import FoodDetailsIntro from "./FoodDetailsIntro";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email || "";

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    expired: false,
  });

  useEffect(() => {
    fetch(`https://keep-fresh-server-side.vercel.app/items/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load item.");
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!item?.expiryDate) return;

    const updateCountdown = () => {
      const now = new Date();
      const expiry = new Date(item.expiryDate);
      const diff = expiry - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, expired: true });
        return true;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        expired: false,
      });
      return false;
    };

    if (updateCountdown()) return;

    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [item]);

  const isOwner = userEmail === item?.addedBy;
  const isExpired = countdown.expired;

  const handleNoteAddOrUpdate = async (noteText) => {
    const res = await fetch(
      `https://keep-fresh-server-side.vercel.app/items/${id}/note`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, text: noteText }),
      }
    );

    const data = await res.json();
    if (!data.success) throw new Error("Failed to save note.");

    setItem((prev) => ({
      ...prev,
      note: {
        text: noteText,
        createdAt: new Date().toISOString(),
      },
    }));
  };

  const handleNoteDelete = async () => {
    const res = await fetch(
      `https://keep-fresh-server-side.vercel.app/items/${id}/note`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail }),
      }
    );

    const data = await res.json();
    if (!data.success) throw new Error("Failed to delete note.");

    setItem((prev) => ({
      ...prev,
      note: null,
    }));
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="relative flex items-center justify-center">
          {/* Enhanced spinner with gradient */}
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="absolute w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
          <div className="absolute w-10 h-10 rounded-full border-4 border-transparent border-b-blue-400 border-l-blue-400 animate-spin animation-delay-200"></div>
        </div>
        <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300">
          Loading food details...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 dark:text-red-400 mt-10 text-xl">
        {error}
      </div>
    );

  if (!item)
    return (
      <div className="text-center text-red-600 dark:text-red-400 mt-10 text-xl">
        Item not found.
      </div>
    );

  return (
    <div className="md:pb-20 bg-white dark:bg-gray-900">
      <FoodDetailsIntro />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md mt-10 space-y-8"
      >
        {/* Simple Go Back button above the image */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        <FoodImageExpiry
          foodImage={item.image}
          foodTitle={item.title}
          isExpired={isExpired}
        />

        <FoodTitleDescription
          foodTitle={item.title}
          description={item.description}
        />

        <FoodBasicInfo
          category={item.category}
          quantity={item.quantity}
          expiryDate={item.expiryDate}
          userEmail={item.addedBy}
        />

        <FoodCountdown isExpired={isExpired} countdown={countdown} />

        <FoodNotes
          isOwner={isOwner}
          note={item.note}
          onNoteAddOrUpdate={handleNoteAddOrUpdate}
          onNoteDelete={handleNoteDelete}
        />
      </motion.div>
    </div>
  );
};

export default FoodDetails;
