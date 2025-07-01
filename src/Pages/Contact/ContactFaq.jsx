import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "How quickly can I expect a response?",
    answer:
      "Our team typically responds within 24 hours during business days. For urgent matters, please use our phone support.",
  },
  {
    question: "Do you offer enterprise solutions?",
    answer:
      "Yes! We work with restaurants, cafeterias, and grocery stores to reduce food waste at scale. Contact our sales team for details.",
  },
  {
    question: "Can I suggest a feature for the app?",
    answer:
      "Absolutely! We love hearing from our users about how we can improve. Use our feedback form or email suggestions@keepfresh.app",
  },
];

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="border-b border-gray-200 dark:border-gray-700 py-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left focus:outline-none"
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {faq.question}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="ml-4 text-sky-600"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2"
        >
          <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

const ContactFAQ = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Frequently Asked{" "}
          <span className="text-sky-600 dark:text-sky-400">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ContactFAQ;
