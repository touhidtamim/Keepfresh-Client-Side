import { motion } from "framer-motion";

const TeamPrinciples = () => {
  const principles = [
    {
      title: "Make it Simple",
      description:
        "We believe sustainability should be effortless, not another chore.",
    },
    {
      title: "Lead with Empathy",
      description:
        "We design for real people with busy lives, not perfect users.",
    },
    {
      title: "Think Global",
      description: "Every small action adds up to big environmental impact.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-sky-50 dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-12 text-center">
          Our <span className="text-sky-600 dark:text-sky-400">Principles</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-black/40 hover:shadow-lg dark:hover:shadow-black/60 transition-shadow"
            >
              <div className="text-sky-600 dark:text-sky-400 text-2xl font-bold mb-2">
                0{index + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {principle.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TeamPrinciples;
