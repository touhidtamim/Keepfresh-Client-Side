import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const blogs = [
  {
    title: "10 Easy Ways to Cut Food Waste at Home",
    description:
      "Learn how simple habits can make a big difference for the planet and your wallet.",
    image:
      "https://www.easyhomemeals.com/wp-content/uploads/2022/04/10-Easy-Ways-to-Reduce-Food-Waste.png",
  },
  {
    title: "Smart Storage Tips for Longer Freshness",
    description:
      "From the fridge to the pantry, here’s how to store your food the right way.",
    image: "https://i.postimg.cc/q7yk9d86/foods-14-00447-ag.png",
  },
  {
    title: "How Our Community Saved 5,000+ Meals",
    description:
      "Real stories from real users — together we're making a difference.",
    image:
      "https://i.postimg.cc/kM1dY5kh/Mc-Boat-Photo-PAHClients-Volunteers2015-50.jpg",
  },
  {
    title: "The Science of Food Expiration Dates",
    description:
      "Understand what 'best before' really means and avoid throwing away perfectly good food.",
    image:
      "https://i.postimg.cc/KckyVbxG/Expiry-date-Understanding-the-Significance-of-Expiry-Dates-Understanding-the-science-behind-expira.webp",
  },
];

const VlogPreview = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-sky-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14 px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Explore Our <span className="text-sky-600">Smart Food Habits</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Dive into tips, insights, and stories that help you reduce waste and
            live sustainably.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-0">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg flex flex-col"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow leading-snug">
                  {blog.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-14 text-center">
          <Link
            to="/blog"
            className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-semibold shadow-md transition duration-300"
          >
            Read All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VlogPreview;
