import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiShoppingBag,
  FiCoffee,
  FiBarChart2,
  FiDollarSign,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const features = [
  {
    id: 1,
    title: "Smart Expiry Tracking",
    description:
      "Get alerts before your food expires so you never waste anything.",
    icon: <FiCalendar />,
    color: "from-blue-500 to-indigo-600",
    darkColor: "from-blue-600 to-indigo-700",
  },
  {
    id: 2,
    title: "Automated Inventory",
    description:
      "Items are tracked automatically via receipt scanning or photos.",
    icon: <FiShoppingBag />,
    color: "from-emerald-500 to-teal-600",
    darkColor: "from-emerald-600 to-teal-700",
  },
  {
    id: 3,
    title: "Waste Reduction Recipes",
    description:
      "Get meal ideas based on what's about to expire in your fridge.",
    icon: <FiCoffee />,
    color: "from-amber-500 to-orange-600",
    darkColor: "from-amber-600 to-orange-700",
  },
  {
    id: 4,
    title: "Consumption Analytics",
    description: "See your food usage patterns and savings over time.",
    icon: <FiBarChart2 />,
    color: "from-rose-500 to-pink-600",
    darkColor: "from-rose-600 to-pink-700",
  },
  {
    id: 5,
    title: "Smart Shopping Lists",
    description: "AI-generated lists optimize your grocery trips.",
    icon: <FiDollarSign />,
    color: "from-purple-500 to-violet-600",
    darkColor: "from-purple-600 to-violet-700",
  },
];

const FeatureTimeline = () => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-10 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Advanced{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
              Features
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover how KeepFresh helps you save time and reduce waste
          </p>
        </div>

        {/* Mobile Navigation (Carousel) */}
        {isMobile && (
          <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex space-x-3 w-max">
              {features.map((feature, i) => (
                <button
                  key={feature.id}
                  onClick={() => setActive(i)}
                  className={`flex-shrink-0 p-3 rounded-lg transition-all ${
                    active === i
                      ? "bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700"
                      : "bg-gray-100 dark:bg-gray-800/50"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2 w-28">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} dark:${feature.darkColor} flex items-center justify-center text-white`}
                    >
                      {React.cloneElement(feature.icon, { size: 20 })}
                    </div>
                    <span className="text-sm font-medium text-center text-gray-800 dark:text-gray-200">
                      {feature.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="lg:w-1/4">
              <div className="sticky top-28 space-y-3">
                {features.map((feature, i) => (
                  <button
                    key={feature.id}
                    onClick={() => setActive(i)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      active === i
                        ? "bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700"
                        : "bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} dark:${feature.darkColor} flex items-center justify-center text-white`}
                      >
                        {React.cloneElement(feature.icon, { size: 20 })}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {feature.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feature Content */}
          <div className={`${isMobile ? "w-full" : "lg:w-3/4"}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 border border-gray-100 dark:border-gray-700/50">
              {features.map((feature, i) => (
                <div
                  key={feature.id}
                  className={`${active === i ? "block" : "hidden"}`}
                >
                  <div className="flex items-center space-x-4 mb-6 lg:hidden">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} dark:${feature.darkColor} flex items-center justify-center text-white`}
                    >
                      {React.cloneElement(feature.icon, { size: 20 })}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>

                  {!isMobile && (
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  )}

                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    {feature.description}
                  </p>

                  <div
                    className={`bg-gradient-to-br ${feature.color}/10 dark:${feature.darkColor}/20 rounded-lg border border-gray-100 dark:border-gray-700/50 p-6`}
                  >
                    <div className="flex items-center justify-center h-48">
                      <div className="text-center">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} dark:${feature.darkColor} flex items-center justify-center text-white mx-auto mb-4`}
                        >
                          {React.cloneElement(feature.icon, { size: 24 })}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Interactive {feature.title.toLowerCase()}{" "}
                          visualization
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Mobile Dots */}
              {isMobile && (
                <div className="flex justify-center space-x-2 mt-8">
                  {features.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        active === i
                          ? `bg-gradient-to-r ${features[active].color} dark:${features[active].darkColor}`
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/dashboard"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureTimeline;
