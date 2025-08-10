import React from "react";
import {
  FiClock,
  FiDollarSign,
  FiCoffee,
  FiShield,
  FiBarChart2,
  FiHeart,
  FiBell,
  FiUsers,
} from "react-icons/fi";
import { motion } from "framer-motion";

const iconComponents = {
  clock: <FiClock size={24} />,
  dollar: <FiDollarSign size={24} />,
  food: <FiCoffee size={24} />,
  shield: <FiShield size={24} />,
  chart: <FiBarChart2 size={24} />,
  heart: <FiHeart size={24} />,
  bell: <FiBell size={24} />,
  users: <FiUsers size={24} />,
};

const benefitsData = [
  {
    id: 1,
    title: "Save Precious Time",
    description:
      "Our smart tracking system organizes your fridge automatically, saving you 3+ hours weekly on meal planning and inventory checks.",
    stats: "3.2 hours average weekly time savings",
    icon: "clock",
    color: "from-sky-400 to-sky-600",
    bg: "bg-white dark:bg-gray-800",
  },
  {
    id: 2,
    title: "Cut Food Costs",
    description:
      "Users reduce grocery waste by 40% on average, translating to $1,200+ annual savings for most families.",
    stats: "40% average waste reduction",
    icon: "dollar",
    color: "from-sky-400 to-sky-500",
    bg: "bg-white dark:bg-gray-800",
  },
  {
    id: 3,
    title: "Healthier Eating",
    description:
      "Personalized recipe suggestions help transform leftovers into nutritious meals, reducing takeout dependency.",
    stats: "72% users report healthier eating habits",
    icon: "food",
    color: "from-sky-300 to-sky-500",
    bg: "bg-white dark:bg-gray-800",
  },
  {
    id: 4,
    title: "Smart Analytics",
    description:
      "Visual consumption patterns help optimize shopping habits and meal planning.",
    stats: "60% more efficient grocery shopping",
    icon: "chart",
    color: "from-sky-500 to-sky-700",
    bg: "bg-white dark:bg-gray-800",
  },
];

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
      delay: i * 0.1,
    },
  }),
};

const WhyKeepFresh = () => {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-10 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">
              KeepFresh
            </span>
          </h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Transform how you manage food with our smart solution that saves
            time, money, and reduces waste while keeping your family healthy.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {benefitsData.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700/50"
              whileHover={{
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div
                className={`relative h-full p-6 flex flex-col ${item.bg} z-10`}
              >
                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 rounded-lg mb-5 bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-sm`}
                  whileHover={{
                    scale: 1.05,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {iconComponents[item.icon]}
                </motion.div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300/90 mb-4 flex-grow text-sm">
                  {item.description}
                </p>

                <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 mt-auto pt-3 border-t border-gray-100 dark:border-gray-700/50">
                  <span className="inline-block w-2 h-2 rounded-full mr-2 bg-current animate-pulse" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.stats}
                  </span>
                </div>
              </div>

              {/* Subtle hover border effect */}
              <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent group-hover:border-sky-200/50 dark:group-hover:border-sky-400/20 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Enhanced Stats section */}
        <motion.div
          className="mt-20 bg-gradient-to-br from-sky-600 to-sky-800 rounded-2xl p-8 text-white shadow-xl overflow-hidden relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/5"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/5"></div>
            <div className="absolute right-20 bottom-0 w-24 h-24 rounded-full bg-white/10"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-sky-100 mb-2">
                Proven Results
              </h3>
              <h4 className="text-2xl md:text-3xl font-bold">
                Trusted by Thousands of Households
              </h4>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "95%", label: "User Satisfaction", icon: "❤️" },
                { value: "40%", label: "Waste Reduction", icon: "♻️" },
                { value: "3.2h", label: "Weekly Time Saved", icon: "⏱️" },
                { value: "$1.2k", label: "Annual Savings", icon: "💰" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  whileHover={{
                    y: -3,
                    boxShadow: "0 10px 20px -5px rgba(255, 255, 255, 0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">
                    {stat.value}
                  </div>
                  <div className="text-sky-100/90 text-sm font-medium tracking-wide">
                    {stat.label}
                  </div>
                  {stat.value === "$1.2k" && (
                    <div className="mt-2 text-xs bg-white/20 px-2 py-0.5 rounded-full inline-block">
                      average
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyKeepFresh;
