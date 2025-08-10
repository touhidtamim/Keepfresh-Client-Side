import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider";

import FoodImageExpiry from "./FoodImageExpiry";
import FoodTitleDescription from "./FoodTitleDescription";
import FoodBasicInfo from "./FoodBasicInfo";
import FoodCountdown from "./FoodCountdown";
import FoodNotes from "./FoodNotes";
import FoodDetailsIntro from "./FoodDetailsIntro";

const FoodDetails = () => {
  const { id } = useParams();
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

  // Add note
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

  // Delete note
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
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>

          {/* Spinner */}
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-t-blue-500 dark:border-t-blue-400 border-transparent rounded-full animate-spin"></div>

          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
          Loading...
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
