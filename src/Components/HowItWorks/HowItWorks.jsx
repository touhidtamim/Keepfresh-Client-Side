import { motion } from "framer-motion";
import {
  Lightbulb,
  ClipboardCheck,
  AlarmClock,
  HeartHandshake,
} from "lucide-react";

const steps = [
  {
    title: "Track Your Food",
    description:
      "Log items and their expiry dates to keep your kitchen organized.",
    icon: <ClipboardCheck className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
  },
  {
    title: "Set Reminders",
    description: "Get notified before food goes bad so you can use it in time.",
    icon: <AlarmClock className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
  },
  {
    title: "Reduce Waste",
    description: "Make smarter decisions and reduce unnecessary food waste.",
    icon: <Lightbulb className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
  },
  {
    title: "Share & Inspire",
    description: "Post your journey and inspire others in the community.",
    icon: <HeartHandshake className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center mb-14 px-4 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          How <span className="text-sky-600">KeepFresh</span> Works
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Just a few simple steps can help you save money, eat smarter, and
          protect the planet.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-0 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow leading-snug">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
