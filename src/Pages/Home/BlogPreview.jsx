import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const blogs = [
  {
    title: "10 Easy Ways to Cut Food Waste at Home",
    description:
      "Simple habits that make a big difference for the planet and your wallet.",
    image:
      "https://www.easyhomemeals.com/wp-content/uploads/2022/04/10-Easy-Ways-to-Reduce-Food-Waste.png",
    category: "Sustainability",
    readTime: "4 min read",
  },
  {
    title: "Smart Storage Tips for Longer Freshness",
    description:
      "From fridge to pantry - store your food the right way to maximize freshness.",
    image: "https://i.postimg.cc/q7yk9d86/foods-14-00447-ag.png",
    category: "How-To",
    readTime: "6 min read",
  },
  {
    title: "How Our Community Saved 5,000+ Meals",
    description:
      "Real stories from users making a tangible difference together.",
    image:
      "https://i.postimg.cc/kM1dY5kh/Mc-Boat-Photo-PAHClients-Volunteers2015-50.jpg",
    category: "Community",
    readTime: "5 min read",
  },
];

const BlogPreview = () => {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Header with decorative element */}
        <div className="relative mb-12 md:mb-16">
          <div className="absolute -left-4 top-1/2 w-12 md:w-16 h-1 bg-gradient-to-r from-sky-500 to-sky-600 transform -translate-y-1/2"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold pl-16 md:pl-20 text-gray-900 dark:text-white">
            Fresh Perspectives
          </h2>
          <p className="mt-2 pl-16 md:pl-20 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Insights to transform your food habits
          </p>
        </div>

        {/* Featured Blog - Full width */}
        <motion.div
          className="mb-12 md:mb-20 group"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            to="/blog"
            className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center"
          >
            <div className="w-full lg:w-2/3 relative overflow-hidden rounded-xl md:rounded-2xl aspect-video">
              <img
                src={blogs[0].image}
                alt={blogs[0].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white">
                <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-sky-600 text-xs font-medium rounded-full mb-1 md:mb-2">
                  {blogs[0].category}
                </span>
                <h3 className="hidden md:block text-xl sm:text-2xl md:text-3xl font-bold max-w-2xl">
                  {blogs[0].title}
                </h3>
                <p className="text-sky-100 text-sm md:text-base mt-1">
                  {blogs[0].readTime}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                {blogs[0].description}
              </p>
              <div className="mt-4 md:mt-6 inline-flex items-center text-sky-600 dark:text-sky-400 font-medium group-hover:text-sky-500 dark:group-hover:text-sky-300 transition">
                Read full article
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Secondary Blog List - Minimalist layout */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-16">
          {blogs.slice(1).map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to="/blog"
                className="flex flex-col sm:flex-row gap-4 md:gap-6"
              >
                <div className="w-full sm:w-1/3 aspect-square overflow-hidden rounded-lg md:rounded-xl">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="w-full sm:w-2/3">
                  <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                    <span className="text-xs font-medium text-sky-600 dark:text-sky-400">
                      {blog.category}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {blog.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    {blog.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Outline CTA Button */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center px-5 py-2 md:px-6 md:py-2.5 border-2 border-sky-500 text-sky-500 dark:border-sky-400 dark:text-sky-400 font-medium rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all"
          >
            Browse all articles
            <svg
              className="ml-2 w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
