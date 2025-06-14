import { motion } from "framer-motion";

const MissionStatement = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50 to-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
          Our <span className="text-sky-600">Mission</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          We built FoodSave because we believe every bite counts. After seeing
          our own refrigerators waste food while others go hungry, we created a
          solution that helps households reduce food waste effortlessly. Our
          mission is to make sustainable food management accessible to everyone,
          one kitchen at a time.
        </p>
        <div className="w-24 h-1 bg-sky-400 mx-auto rounded-full"></div>
      </div>
    </motion.section>
  );
};

export default MissionStatement;
