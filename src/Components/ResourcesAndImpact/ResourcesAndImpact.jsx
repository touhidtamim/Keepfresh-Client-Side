import { motion } from "framer-motion";
import React from "react";
import {
  FiPackage,
  FiFileText,
  FiClipboard,
  FiVideo,
  FiDownload,
  FiUsers,
  FiGlobe,
  FiPieChart,
  FiHeart,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const ResourcesAndImpact = () => {
  const resources = [
    {
      title: "Food Storage Guide",
      description:
        "Learn optimal storage methods to extend your food's freshness.",
      link: "#",
      icon: <FiPackage />,
      fileType: "PDF",
    },
    {
      title: "Waste Tracker",
      description: "Monitor and reduce your household food waste weekly.",
      link: "#",
      icon: <FiFileText />,
      fileType: "XLSX",
    },
    {
      title: "Meal Planner",
      description: "Smart templates for efficient weekly meal planning.",
      link: "#",
      icon: <FiClipboard />,
      fileType: "PDF",
    },
    {
      title: "App Tutorial",
      description: "Video guide to master KeepFresh's features.",
      link: "#",
      icon: <FiVideo />,
      fileType: "MP4",
    },
  ];

  const highlights = [
    {
      title: "Meals Saved",
      value: "5K+",
      description: "Prevented from going to waste",
      icon: <FiHeart className="text-sky-500" />,
    },
    {
      title: "Families Supported",
      value: "800+",
      description: "Through food donations",
      icon: <FiUsers className="text-sky-500" />,
    },
    {
      title: "CO₂ Reduced",
      value: "12K kg",
      description: "Lowered emissions",
      icon: <FiPieChart className="text-sky-500" />,
    },
    {
      title: "Global Reach",
      value: "25+",
      description: "Countries using KeepFresh",
      icon: <FiGlobe className="text-sky-500" />,
    },
  ];

  return (
    <section className="w-full bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* Unified Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Resources &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">
              Impact
            </span>
          </h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Tools to maximize your food-saving potential and see our global
            impact
          </motion.p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {resources.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              download
            >
              <div className="relative h-full p-6 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-500 shadow-sm">
                    {React.cloneElement(item.icon, { size: 20 })}
                  </div>
                  <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium px-3 py-1.5 rounded-full">
                    <FiDownload size={12} />
                    {item.fileType}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow">
                  {item.description}
                </p>
                <span className="text-xs font-medium text-sky-500 dark:text-sky-400 transition">
                  Download resource →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-700/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700/50"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-5 text-sky-500">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.value}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-auto">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our community of food waste warriors and make a difference
              today
            </p>
            <Link
              to="dashboard"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
            >
              Join Our Community
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesAndImpact;
