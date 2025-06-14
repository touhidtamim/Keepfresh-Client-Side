import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const SlideThree = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yText = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80]), {
    stiffness: 50,
    damping: 20,
  });
  const yImage = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), {
    stiffness: 50,
    damping: 20,
  });
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.6]),
    { stiffness: 50, damping: 20 }
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-teal-50 to-white py-16 px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20"
    >
      {/* Left Content */}
      <motion.div className="flex-1 max-w-md" style={{ y: yText, opacity }}>
        <motion.h2
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800"
        >
          Your food,{" "}
          <span className="text-teal-600 underline decoration-teal-400 decoration-3 underline-offset-8">
            perfectly organized
          </span>
        </motion.h2>

        <motion.p
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 mb-8 leading-relaxed"
        >
          No more spoiled leftovers. Our smart dashboard helps you track
          everything in your kitchen—fresh, sorted, and under control.
        </motion.p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4 mb-10"
        >
          {[
            "Visual fridge inventory",
            "Automatic category sorting",
            "See what's expiring soon",
          ].map((item, i) => (
            <motion.li
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 + 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="p-1.5 bg-teal-100 rounded-full text-teal-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">{item}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 md:py-3 text-md md:text-lg font-medium rounded-lg shadow-md transition"
        >
          Try Dashboard Demo
        </motion.button>
      </motion.div>

      {/* Right Content - HIDDEN on mobile */}
      <motion.div
        className="flex-1 max-w-xl relative hidden sm:block"
        style={{ y: yImage, opacity }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl overflow-hidden shadow-xl border-4 border-white"
        >
          <img
            src="https://i.postimg.cc/nzthLw2B/arrangement-different-foods-organized-fridge.jpg"
            alt="Smart food organization dashboard"
            className="w-[60%] mx-auto"
            loading="lazy"
          />
        </motion.div>

        {/* Floating icons */}
        {[
          { icon: "🧀", pos: "top-8 -left-8", delay: 0.1 },
          { icon: "🥬", pos: "top-1/2 -right-6", delay: 0.3 },
          { icon: "🍗", pos: "bottom-16 -left-4", delay: 0.5 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: item.delay }}
            viewport={{ once: true }}
            className={`absolute text-4xl ${item.pos}`}
          >
            {item.icon}
          </motion.div>
        ))}
      </motion.div>

      {/* Indicator Arrow  */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.svg
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="#4f46e5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
};

export default SlideThree;
