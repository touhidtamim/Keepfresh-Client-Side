import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ContactHero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-100px" });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f9fbfc] to-[#eef2f5]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          We'd <span className="text-sky-600">Love to Hear</span> From You
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Have questions about{" "}
          <span className="font-semibold text-sky-600">KeepFresh</span>? Want to
          share your success story? Our team is here to help.
        </p>
        <div className="w-24 h-1 bg-sky-400 mx-auto rounded-full"></div>
      </motion.div>
    </section>
  );
};

export default ContactHero;
