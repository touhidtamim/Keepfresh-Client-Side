import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const BlogIntro = () => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f9fbfc] to-[#eef2f5] min-h-[30vh] lg:min-h-[45vh] text-center px-4 overflow-hidden">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border border-gray-300 px-4 py-1 md:px-6 md:py-2 rounded-full mb-4 text-sm md:text-base font-medium tracking-wider shadow-sm bg-white text-gray-700"
      >
        Knowledge today, less waste tomorrow
      </motion.h1>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight max-w-3xl text-gray-900"
      >
        Your guide to <span className="text-sky-700">smart food habits</span> &
        mindful living
      </motion.p>

      {/* Scroll Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="animate-bounce w-6 h-6 text-gray-500 opacity-70" />
      </motion.div>
    </div>
  );
};

export default BlogIntro;
