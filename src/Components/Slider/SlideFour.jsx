import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router";

const SlideFour = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), {
    stiffness: 50,
    damping: 20,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-tl from-white via-indigo-50 to-white py-16 px-4 sm:px-8 md:px-16 flex flex-col items-center justify-center text-center"
    >
      <motion.div style={{ y }} className="max-w-xl sm:max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-gray-800"
        >
          Be part of a{" "}
          <span className="text-indigo-600 underline decoration-indigo-400 decoration-4 underline-offset-8">
            smarter world
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 px-2 sm:px-0"
        >
          Join thousands of mindful users who are reducing food waste, saving
          money, and making impact—one meal at a time.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link
            to="/add-food"
            className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white px-6 sm:px-7 py-2 md:py-3 text-base sm:text-lg font-medium rounded-lg shadow transition"
          >
            Get Started Now
          </Link>
        </motion.div>
      </motion.div>

      {/* Indicator Arrow  */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="text-indigo-600"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="text-indigo-600 font-medium mt-2 text-sm"
        >
          Scroll down
        </motion.p>
      </motion.div>
    </section>
  );
};

export default SlideFour;
