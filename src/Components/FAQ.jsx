import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How does KeepFresh work?",
    answer:
      "KeepFresh lets you track food items, set expiry dates, and receive smart alerts so you never waste food again.",
  },
  {
    question: "What is expiry tracking?",
    answer:
      "It means monitoring your food’s shelf life. You input expiry dates, and we remind you before it’s too late.",
  },
  {
    question: "Will I get expiry alerts?",
    answer:
      "Yes. You’ll get visual countdowns and optional notifications as expiry dates approach.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. Your data is stored securely and never shared. We prioritize your privacy and safety.",
  },
  {
    question: "Can I use KeepFresh in a shared kitchen?",
    answer:
      "Yes! You can organize by fridge sections or users, making it ideal for roommates or family kitchens.",
  },
  {
    question: "What happens when an item expires?",
    answer:
      "Expired items will be flagged clearly in your dashboard so you can discard or review them.",
  },
  {
    question: "Can I track non-edible items like medicine or skincare?",
    answer:
      "Definitely! KeepFresh works for anything with an expiry date — medicine, skincare, even supplements.",
  },
  {
    question: "Does KeepFresh work offline?",
    answer:
      "Currently, an internet connection is needed. Offline tracking is planned for future updates.",
  },
  {
    question: "Is KeepFresh free to use?",
    answer:
      "Yes! All core features including tracking, notifications, and analytics are completely free.",
  },
  {
    question: "How can I suggest a feature?",
    answer:
      "We’d love to hear from you! You can send feature requests from the 'Contact' section in the app footer.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-white to-[#f1f6fa] dark:from-gray-900 dark:to-gray-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
        >
          Frequently Asked <span className="text-sky-600">Questions</span>
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
          Everything you need to know about using KeepFresh smartly and safely.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left text-gray-800 dark:text-white font-medium text-lg"
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-sky-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-sky-600" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                {faq.answer}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
