import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FoodDetailsIntro = () => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f9fbfc] to-[#eef2f5] dark:from-gray-900 dark:to-gray-950 h-[30vh] lg:min-h-[45vh] text-center overflow-hidden px-4">
      {/* Tagline */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border border-black dark:border-gray-300 px-3 py-1 md:px-4 lg:px-6 md:py-2 rounded-full mb-4 text-md font-medium tracking-wide shadow-md bg-white dark:bg-gray-800 dark:text-white"
      >
        Detailed view of your food
      </motion.h1>

      {/* Main Title */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-2xl md:text-3xl lg:text-4xl sm:text-5xl font-semibold leading-tight max-w-3xl text-gray-900 dark:text-white"
      >
        Get <span className="text-sky-600">all the details</span> and keep track
        smartly
      </motion.p>

      {/* Scroll Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="animate-bounce w-6 h-6 text-gray-500 dark:text-gray-400 opacity-70" />
      </motion.div>
    </div>
  );
};

export default FoodDetailsIntro;
