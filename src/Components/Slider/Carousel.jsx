import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiAlertTriangle,
  FiEye,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Your kitchen's silent assistant",
    subtitle:
      "KeepFresh tracks expiry dates, suggests recipes, and alerts you before food goes bad.",
    list: [
      "Organize your fridge like a pro",
      "Stay ahead with smart notifications",
      "Waste less, save more",
    ],
    cta: "Get Started Today",
    icon: <FiCheck className="text-blue-500" size={24} />,
    images: [
      "https://www.wur.nl/upload/77dd7d70-e5e5-4669-a1bc-5a94ea540be2_shutterstock_1305900268.jpg",
    ],
  },
  {
    id: 2,
    title: "Stop throwing money in the trash",
    subtitle:
      "Good food rots silently, draining your budget and harming the planet every week.",
    list: [
      "$3,000+ lost every year by the average family",
      "Forgotten food hiding in the fridge",
      "Food waste methane is 30× more harmful than CO₂",
    ],
    cta: "Take Action Now",
    icon: <FiAlertTriangle className="text-blue-500" size={24} />,
    images: ["https://i.postimg.cc/sfYw1Qjh/azg3-c7c7-220309.jpg"],
  },
  {
    id: 3,
    title: "Smart fridge. Smarter habits.",
    subtitle:
      "KeepFresh gives you a real-time overview of your food, expiration dates, and personalized recipe suggestions.",
    list: [
      "Live fridge inventory updates",
      "Recipe suggestions from leftovers",
      "Visual expiry dashboard with alerts",
    ],
    cta: "Explore Dashboard",
    icon: <FiEye className="text-blue-500" size={24} />,
    images: [
      "https://i.postimg.cc/nzthLw2B/arrangement-different-foods-organized-fridge.jpg",
    ],
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) slide(1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, current]);

  const slide = (d) => {
    setDir(d);
    setCurrent((c) =>
      d > 0 ? (c + 1) % slides.length : (c - 1 + slides.length) % slides.length
    );
  };

  // Unified animation for slide container
  const containerVariants = {
    enter: (d) => ({
      x: d > 0 ? "50%" : "-50%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    exit: (d) => ({
      x: d < 0 ? "50%" : "-50%",
      opacity: 0,
      transition: {
        duration: 1,
        ease: [0.33, 1, 0.68, 1],
      },
    }),
  };

  // Content animation that syncs with slide
  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.3,
      },
    },
  };

  return (
    <div
      className="relative pt-16 w-full h-[50vh] md:h-[60vh] lg:h-[70vh] bg-sky-50 dark:bg-gray-900 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background elements */}
      <motion.div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-sky-100 dark:bg-sky-900/20 rounded-full filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      {/* Navigation arrows */}
      <button
        onClick={() => slide(-1)}
        className="hidden sm:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl z-10 group"
        aria-label="Previous slide"
      >
        <motion.div
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <FiChevronLeft
            size={24}
            className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-300"
          />
        </motion.div>
      </button>
      <button
        onClick={() => slide(1)}
        className="hidden sm:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl z-10 group"
        aria-label="Next slide"
      >
        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <FiChevronRight
            size={24}
            className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-300"
          />
        </motion.div>
      </button>

      {/* Slides container */}
      <AnimatePresence custom={dir} initial={false} mode="popLayout">
        <motion.div
          key={slides[current].id}
          custom={dir}
          variants={containerVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl w-full h-full gap-6 md:gap-12">
            {/* Text content */}
            <motion.div
              className="flex-1 max-w-xl space-y-6"
              initial="hidden"
              animate="visible"
              variants={contentVariants}
            >
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white"
                variants={contentVariants}
              >
                {slides[current].title}
                <motion.span
                  className="block h-1 w-20 bg-blue-500 mt-2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                variants={contentVariants}
              >
                {slides[current].subtitle}
              </motion.p>

              <motion.ul className="space-y-3">
                {slides[current].list.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                    className="flex items-start gap-3 text-base md:text-lg"
                  >
                    <motion.span
                      className="shrink-0 mt-1"
                      whileHover={{ scale: 1.1 }}
                    >
                      {slides[current].icon}
                    </motion.span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.button
                  onClick={() => navigate("/dashboard")}
                  className="relative overflow-hidden px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg shadow-md"
                  whileHover={{
                    y: -3,
                    boxShadow: "0 10px 20px -5px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span className="relative z-10">{slides[current].cta}</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="hidden md:flex flex-1 h-full max-w-lg items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.div
                className="w-full h-[40vh] lg:h-[50vh] rounded-xl overflow-hidden shadow-xl relative"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={slides[current].images[0]}
                  alt="Slide visual"
                  loading="lazy"
                  className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDir(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className="relative h-2 rounded-full overflow-hidden"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div className="w-4 h-full bg-gray-300 dark:bg-gray-600 relative">
              {i === current && (
                <motion.div
                  className="absolute inset-0 bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
