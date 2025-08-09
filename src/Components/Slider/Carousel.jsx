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
    icon: <FiCheck className="text-blue-600 dark:text-blue-400" size={24} />,
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
    icon: (
      <FiAlertTriangle className="text-blue-600 dark:text-blue-400" size={24} />
    ),
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
    icon: <FiEye className="text-blue-600 dark:text-blue-400" size={24} />,
    images: [
      "https://i.postimg.cc/nzthLw2B/arrangement-different-foods-organized-fridge.jpg",
    ],
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => slide(1), 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = (d) => {
    setDir(d);
    setCurrent((c) =>
      d > 0 ? (c + 1) % slides.length : (c - 1 + slides.length) % slides.length
    );
  };

  const slideVars = {
    enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.6 } },
    exit: (d) => ({
      x: d < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.6 },
    }),
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.1 + 0.2, duration: 0.5 },
    }),
  };

  return (
    <div className="relative w-full h-[70vh] bg-sky-50 dark:bg-gray-900 overflow-hidden">
      {/* Arrows */}
      <button
        onClick={() => slide(-1)}
        className="hidden cursor-pointer sm:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-105 transition z-10"
        aria-label="Prev"
      >
        <FiChevronLeft size={24} className="text-black dark:text-white" />
      </button>
      <button
        onClick={() => slide(1)}
        className="hidden cursor-pointer sm:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-105 transition z-10"
        aria-label="Next"
      >
        <FiChevronRight size={24} className="text-black dark:text-white" />
      </button>

      {/* Slides */}
      <AnimatePresence custom={dir} initial={false} mode="wait">
        <motion.div
          key={slides[current].id}
          custom={dir}
          variants={slideVars}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div
            className="
              flex flex-col md:flex-row items-center 
              justify-between max-w-7xl w-full md:h-full gap-6
            "
          >
            {/* Text */}
            <motion.div
              className="flex-1 max-w-xl text-black dark:text-white"
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              custom={0}
            >
              <motion.h2
                className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight mb-4"
                variants={contentVariants}
                custom={0}
              >
                {slides[current].title}
              </motion.h2>
              <motion.p
                className="text-base md:text-lg lg:text-xl leading-relaxed mb-4"
                variants={contentVariants}
                custom={1}
              >
                {slides[current].subtitle}
              </motion.p>
              <motion.ul
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
                initial="hidden"
                animate="visible"
                className="mb-6 space-y-2"
              >
                {slides[current].list.map((it, i) => (
                  <motion.li
                    key={i}
                    variants={contentVariants}
                    custom={i + 2}
                    className="flex items-center gap-3 text-base md:text-lg"
                  >
                    <span>{slides[current].icon}</span> <span>{it}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.button
                onClick={() => navigate("/dashboard")}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={5}
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                {slides[current].cta}
              </motion.button>
            </motion.div>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[current].id}
                className="hidden md:flex justify-center items-center flex-1 max-w-lg h-full"
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="w-full h-[40vh]  lg:h-[50vh] bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={slides[current].images[0]}
                    alt="Slide Image"
                    loading="lazy"
                    className="w-full h-full object-cover blur-sm transition-all duration-500 ease-out"
                    onLoad={(e) => e.currentTarget.classList.remove("blur-sm")}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDir(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`w-3 h-3 cursor-pointer rounded-full transition-all ${
              i === current
                ? "bg-black dark:bg-white w-6"
                : "bg-gray-400 dark:bg-gray-600 hover:bg-gray-600"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
