import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ContactMethods = () => {
  const methods = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email Us",
      details: "support@keepfresh.app",
      action: "mailto:support@keepfresh.app",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Call Us",
      details: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
      ),
      title: "Live Chat",
      details: "Available 9AM-5PM EST",
      action: "#chat",
    },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-100px" });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Contact{" "}
          <span className="text-sky-600 dark:text-sky-400">Options</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {methods.map((method, index) => (
            <motion.a
              key={index}
              href={method.action}
              whileHover={{ y: -5 }}
              className="bg-sky-50 dark:bg-gray-800 hover:bg-sky-100 dark:hover:bg-gray-700 p-6 rounded-xl border border-sky-200 dark:border-gray-700 transition-colors duration-300 text-center"
            >
              <div className="text-sky-600 dark:text-sky-400 mb-4 flex justify-center">
                {method.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {method.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {method.details}
              </p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ContactMethods;
