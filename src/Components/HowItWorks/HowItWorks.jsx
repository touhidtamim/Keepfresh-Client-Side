import React from "react";
import {
  FiPackage,
  FiSmartphone,
  FiDatabase,
  FiBell,
  FiBarChart2,
  FiShoppingCart,
  FiAward,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  {
    id: 1,
    title: "1. Smart Scanning",
    description:
      "Simply scan your grocery receipts or use our AI-powered image recognition to catalog items entering your fridge.",
    icon: <FiPackage className="text-sky-500" size={24} />,
    color: "bg-sky-100 dark:bg-sky-900/30",
  },
  {
    id: 2,
    title: "2. Real-Time Tracking",
    description:
      "Our system automatically tracks expiration dates and quantities as you use items through integrated smart scales or manual updates.",
    icon: <FiDatabase className="text-sky-500" size={24} />,
    color: "bg-sky-100 dark:bg-sky-900/30",
  },
  {
    id: 3,
    title: "3. Intelligent Alerts",
    description:
      "Get notifications when items are nearing expiration or when you're running low on staples.",
    icon: <FiBell className="text-sky-500" size={24} />,
    color: "bg-sky-100 dark:bg-sky-900/30",
  },
  {
    id: 4,
    title: "4. Personalized Insights",
    description:
      "Receive weekly reports with consumption patterns, savings achieved, and personalized shopping suggestions.",
    icon: <FiBarChart2 className="text-sky-500" size={24} />,
    color: "bg-sky-100 dark:bg-sky-900/30",
  },
];

const features = [
  {
    title: "Seamless Integration",
    description:
      "Works with all major smart home ecosystems and grocery store loyalty programs",
    icon: <FiShoppingCart size={20} />,
  },
  {
    title: "Award-Winning AI",
    description: "Recognized as most innovative food tech solution 2023",
    icon: <FiAward size={20} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full bg-white dark:bg-gray-900 py-10 md:py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">
              KeepFresh
            </span>{" "}
            Works
          </h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our intelligent system makes food management effortless through four
            simple steps
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              <div
                className={`absolute -inset-0.5 rounded-xl ${step.color} opacity-0 group-hover:opacity-100 blur transition duration-500`}
              ></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 h-full border border-gray-100 dark:border-gray-700/50 group-hover:border-transparent transition-all">
                <div
                  className={`w-12 h-12 rounded-lg ${step.color
                    .replace("bg-", "bg-")
                    .replace(
                      "/30",
                      "/20"
                    )} flex items-center justify-center mb-5`}
                >
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300/90">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demo + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
              <img
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="KeepFresh app interface"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">See It In Action</h3>
                <p className="text-sky-100 max-w-md">
                  Our mobile app brings all these features to your fingertips
                  with an intuitive interface.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-md px-4 py-2 border border-gray-100 dark:border-gray-700">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Available on iOS & Android
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Designed for Modern Lifestyles
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                KeepFresh adapts to your unique needs whether you're a busy
                parent, health-conscious individual, or sustainability advocate.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/50"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-sky-500 dark:text-sky-300">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Get Started in 2 Minutes
              </Link>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                No credit card required • Completely Free
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
