import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router";

const SlideTwo = () => {
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
      className="min-h-screen bg-gradient-to-br from-white via-[#f9fafc] to-[#f1f5fb] py-16 px-4 sm:px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 relative overflow-hidden"
    >
      {/* Background emoji */}
      <div className="absolute text-6xl opacity-10 -top-10 right-5 animate-pulse">
        💸
      </div>

      {/* Left side */}
      <motion.div
        className="flex-1 max-w-md z-10"
        style={{ y: yText, opacity }}
      >
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl md:text-4xl font-extrabold mb-6 text-gray-800"
        >
          You’re throwing <span className="text-rose-600">money</span> in the
          trash.
        </motion.h2>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-md md:text-lg text-gray-600 mb-8 leading-relaxed"
        >
          Every week, good food rots in your fridge — silently draining your
          budget and damaging the planet.
        </motion.p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-2 md:space-y-4 mb-4 md:mb-10"
        >
          {[
            { icon: "🗑️", text: "₹8,000/year lost per family" },
            { icon: "🥶", text: "Forgotten food in the fridge" },
            { icon: "🌍", text: "Methane from waste is 30x worse than CO₂" },
          ].map((fact, i) => (
            <motion.li
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 + 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="text-2xl">{fact.icon}</span>
              <span className="text-gray-700 font-medium">{fact.text}</span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/my-items">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-rose-600 cursor-pointer hover:bg-rose-700 text-white px-6 py-2 md:py-2.5 text-md md:text-lg font-medium rounded-lg shadow-md w-full sm:w-auto"
            >
              Stop the Waste Now
            </motion.button>
          </Link>

          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white cursor-pointer border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 md:py-2.5 text-md md:text-lg font-medium rounded-lg shadow-sm w-full sm:w-auto"
            >
              See the Impact
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Right side */}
      <motion.div
        className="flex-1 max-w-xl z-10 w-full hidden sm:block"
        style={{ y: yImage, opacity }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative w-full rounded-xl overflow-hidden shadow-xl border-4 border-white"
        >
          <img
            src="https://i.postimg.cc/sfYw1Qjh/azg3-c7c7-220309.jpg"
            alt="Moldy food in fridge"
            className="w-full h-auto object-cover block"
            loading="lazy"
          />
        </motion.div>
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

export default SlideTwo;
