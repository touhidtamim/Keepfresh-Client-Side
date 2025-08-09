import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FiClock,
  FiDollarSign,
  FiCoffee,
  FiBell,
  FiSettings,
} from "react-icons/fi";

const features = [
  {
    id: 1,
    title: "Real-time Expiry Alerts",
    description:
      "Get notified before your food expires so you never waste a bite.",
    icon: <FiBell size={28} />,
  },
  {
    id: 2,
    title: "Smart Inventory Tracking",
    description:
      "Automatically track and organize your fridge items effortlessly.",
    icon: <FiSettings size={28} />,
  },
  {
    id: 3,
    title: "Recipe Suggestions",
    description:
      "Use leftovers creatively with personalized recipe recommendations.",
    icon: <FiCoffee size={28} />,
  },
  {
    id: 4,
    title: "Detailed Dashboard",
    description:
      "Visualize your food data with charts, expiry timelines, and stats.",
    icon: <FiClock size={28} />,
  },
  {
    id: 5,
    title: "Save Money & Reduce Waste",
    description:
      "Cut grocery bills and reduce environmental impact with smart planning.",
    icon: <FiDollarSign size={28} />,
  },
];

const FeatureTimeline = () => {
  const [active, setActive] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef(null);

  // Scroll into view effect (optional)
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Handle scroll to highlight active feature (optional advanced)
  // For simplicity, here active changes on hover or click

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900 dark:text-white">
        Features That Make KeepFresh Unique
      </h2>

      <div className="flex flex-col md:flex-row md:space-x-16">
        {/* Sidebar icons */}
        <div className="hidden md:flex flex-col space-y-8 sticky top-28">
          {features.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActive(i)}
              className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
                active === i
                  ? "bg-blue-600 text-white shadow-lg scale-110"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white"
              }`}
              aria-label={`Select feature ${f.title}`}
            >
              {f.icon}
            </button>
          ))}
        </div>

        {/* Timeline & content */}
        <div className="relative flex-1 pl-12 md:pl-0">
          {/* Vertical dotted line */}
          <div className="hidden md:block absolute top-8 left-10 w-1 h-[calc(100%-4rem)] bg-gradient-to-b from-blue-500 via-transparent to-blue-500 rounded-full" />
          <div className="hidden md:block absolute top-8 left-10 w-1 h-[calc(100%-4rem)] bg-[length:8px_8px] bg-[radial-gradient(circle,_#3b82f6_2px,_transparent_2px)] bg-repeat-y rounded-full" />

          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: active === i ? 1 : 0.4,
                x: active === i ? 0 : -50,
              }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
              className="relative mb-16 md:mb-24 cursor-pointer"
            >
              {/* Circle with number */}
              <div
                className={`absolute left-[-60px] top-2 w-10 h-10 rounded-full border-4 ${
                  active === i
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white dark:bg-gray-900 text-gray-500"
                } flex items-center justify-center font-semibold select-none`}
              >
                {feature.id}
              </div>

              {/* Content */}
              <h3
                className={`text-2xl font-semibold mb-2 ${
                  active === i
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-gray-700 dark:text-gray-300 ${
                  active === i ? "opacity-100" : "opacity-60"
                }`}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureTimeline;
