import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Our <span className="text-sky-600">Story</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 mb-4">
              FoodSave began in 2025 when our founder noticed how much perfectly
              good food was being thrown away in his own home simply because it
              got forgotten in the fridge.
            </p>
            <p className="text-gray-600 mb-4">
              What started as a simple spreadsheet to track expiration dates
              evolved into this app after realizing how many families face the
              same problem.
            </p>
          </div>
          <div className="bg-sky-100 p-6 rounded-xl border border-sky-200">
            <h3 className="text-xl font-bold text-sky-800 mb-3">
              Did You Know?
            </h3>
            <p className="text-gray-700">
              The average family throws away about{" "}
              <span className="font-bold">$1,500 worth of food</span> each year.
              That's like tossing one grocery bag out of every five you bring
              home.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default OurStory;
