import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeartbeat } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";

const BMIPreviewCard = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-white via-[#f4f9fc] to-[#e9f1f7] py-5 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Take Charge of Your{" "}
            <span className="text-sky-600 underline decoration-sky-400 decoration-4 underline-offset-8">
              Health
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your health is directly connected to what you eat. Before organizing
            your fridge, take a moment to understand your body.
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
              <FaHeartbeat />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Know Your Body Before Filling Your Plate
            </h3>

            <p className="text-gray-600 max-w-xl text-base sm:text-lg">
              Understanding your BMI helps you make better food choices and
              avoid unnecessary health risks. Let’s turn your kitchen into a
              health ally — not an enemy.
            </p>

            <HashLink
              to="/dashboard#bmi"
              className="cursor-pointer px-7 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full shadow-md transition-transform duration-300 transform hover:scale-105"
            >
              Calculate My BMI
            </HashLink>

            <p className="text-sm text-gray-400 italic">
              A small step today can lead to a healthier you tomorrow 🌱
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BMIPreviewCard;
