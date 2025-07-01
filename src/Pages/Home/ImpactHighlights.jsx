import { motion } from "framer-motion";

const highlights = [
  {
    title: "5,000+ Meals Saved",
    description:
      "Our users have prevented thousands of meals from going to waste.",
    icon: "🍽️",
  },
  {
    title: "800+ Families Helped",
    description:
      "Donations and tips have supported countless families in need.",
    icon: "🏡",
  },
  {
    title: "12,000kg CO₂ Saved",
    description: "Reducing food waste helps reduce greenhouse gases too!",
    icon: "🌱",
  },
  {
    title: "Global Reach",
    description: "KeepFresh is used in 25+ countries around the world.",
    icon: "🌍",
  },
];

const ImpactHighlights = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center mb-14 px-4 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Our <span className="text-sky-600">Collective Impact</span>
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          The KeepFresh community is actively reshaping food habits worldwide.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-0">
        {highlights.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-sky-50 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
          >
            <div className="text-5xl mb-5">{card.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {card.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow leading-snug">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ImpactHighlights;
