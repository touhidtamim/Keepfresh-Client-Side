import React from "react";
import { motion } from "framer-motion";

const HeroHighlights = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#f9fbfc] to-[#eef2f5] min-h-[45vh] text-center overflow-hidden px-4">
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border border-black px-3 py-1 md:px-4 lg:px-6 md:py-2 rounded-full mb-4 text-md font-medium tracking-wide shadow-md bg-white"
      >
        Expiry doesn’t knock
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-2xl md:text-3xl lg:text-4xl sm:text-5xl font-semibold leading-tight max-w-3xl"
      >
        But <span className="text-sky-700">we’ll alert you</span> before it
        enters.
      </motion.p>
    </div>
  );
};

export default HeroHighlights;
