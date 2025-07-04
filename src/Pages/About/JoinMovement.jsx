import { motion } from "framer-motion";
import { Link } from "react-router";

const JoinMovement = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          Join the{" "}
          <span className="text-sky-600 dark:text-sky-400">Movement</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Together, we're creating a community of conscious consumers who
          believe small daily actions can lead to big environmental change.
        </p>
        <Link to="/dashboard/add-foods">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300"
          >
            Start Saving Food Today
          </motion.button>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Already part of our community?{" "}
          <Link
            to="/blog"
            className="text-sky-600 dark:text-sky-400 hover:underline"
          >
            Share your story
          </Link>
        </p>
      </div>
    </motion.section>
  );
};

export default JoinMovement;
