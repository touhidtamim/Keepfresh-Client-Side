import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

const BlogPreviewCard = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-sky-50 via-white to-white py-5 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Discover Insights That{" "}
            <span className="text-sky-600 underline decoration-sky-400 decoration-4 underline-offset-8">
              Matter
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Read powerful tips and stories that help you build a healthier,
            smarter, and more mindful kitchen life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gradient-to-br from-white to-sky-50 p-10 sm:p-12 rounded-2xl shadow-2xl hover:shadow-sky-200 transition-shadow duration-300"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-5xl text-sky-600"
            >
              <FaBookOpen />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Explore Our Latest Health-Focused Blog
            </h3>

            <p className="text-gray-600 max-w-xl text-base sm:text-lg">
              Whether it’s food storage hacks or wellness advice — our blog
              gives you practical knowledge to transform your habits one post at
              a time.
            </p>

            <Link
              to="/blog"
              className="cursor-pointer px-7 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full shadow-md transition-transform duration-300 transform hover:scale-105"
            >
              Visit Blog
            </Link>

            <p className="text-sm text-gray-400 italic">
              Start learning, start living better 📘
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreviewCard;
