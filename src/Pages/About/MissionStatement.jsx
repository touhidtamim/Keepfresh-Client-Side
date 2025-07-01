import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const MissionStatement = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-100px" });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-sky-50 dark:bg-gray-900 ">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          Our <span className="text-sky-600 dark:text-sky-400">Mission</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          We built{" "}
          <span className="font-semibold text-sky-600 dark:text-sky-400">
            KeepFresh
          </span>{" "}
          because we believe every bite counts. After seeing our own
          refrigerators waste food while others go hungry, we created a solution
          that helps households reduce food waste effortlessly. Our mission is
          to make sustainable food management accessible to everyone, one
          kitchen at a time.
        </p>
        <div className="w-24 h-1 bg-sky-400 dark:bg-sky-500 mx-auto rounded-full"></div>
      </motion.div>
    </section>
  );
};

export default MissionStatement;
