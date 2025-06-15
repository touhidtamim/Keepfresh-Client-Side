import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const DashboardIntro = () => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f9fbfc] to-[#eef2f5] h-[30vh] lg:min-h-[45vh] text-center px-4 overflow-hidden">
      {/* Tagline */}
      <motion.h1
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border border-gray-300 px-3 py-1 md:px-5 md:py-2 rounded-full mb-3 text-sm md:text-base font-medium tracking-wide shadow-sm bg-white text-gray-700"
      >
        Track smarter. Waste less.
      </motion.h1>

      {/* Main Title */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight max-w-3xl text-gray-900"
      >
        Master your <span className="text-sky-700">kitchen data</span> with
        clarity.
      </motion.p>

      {/* Scroll Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="animate-bounce w-6 h-6 text-gray-500 opacity-70" />
      </motion.div>
    </div>
  );
};

export default DashboardIntro;
