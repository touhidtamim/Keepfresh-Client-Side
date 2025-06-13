import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const listItemVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.2, type: "spring", stiffness: 50 },
  }),
};

const HeroStory = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring animation for parallax effects
  const yTextRaw = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yText = useSpring(yTextRaw, { stiffness: 50, damping: 20 });

  const yImageRaw = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yImage = useSpring(yImageRaw, { stiffness: 50, damping: 20 });

  const opacityRaw = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.5]);
  const opacity = useSpring(opacityRaw, { stiffness: 50, damping: 20 });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center md:gap-16"
      aria-labelledby="hero-story-title"
    >
      <motion.div
        className="flex-1 max-w-xl"
        style={{ y: yText, opacity }}
        aria-describedby="hero-story-description"
      >
        <motion.h2
          id="hero-story-title"
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 text-gray-900"
        >
          Your kitchen’s{" "}
          <span className="text-sky-600 underline decoration-sky-400 decoration-4 underline-offset-8">
            silent assistant
          </span>
        </motion.h2>

        <motion.p
          id="hero-story-description"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-lg text-gray-700 mb-10 leading-relaxed"
        >
          Food doesn’t speak, but it surely expires. Our app makes sure you’re
          always one step ahead of spoilage. With smart tracking, timely
          reminders, and an intuitive dashboard, you’ll save money, time, and
          food—effortlessly.
        </motion.p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
          role="list"
        >
          {[
            "Smart notifications before items expire",
            "Easy scanning and manual entry options",
            "Organize by categories and storage locations",
          ].map((text, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={listItemVariants}
              className="flex items-center gap-4 cursor-pointer group"
              tabIndex={0}
              aria-label={text}
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
            >
              <motion.div
                className="p-2 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 shadow-md"
                whileHover={{ scale: 1.3, rotate: 10, color: "#0284c7" }}
                whileFocus={{ scale: 1.3, rotate: 10, color: "#0284c7" }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <p className="text-gray-800 font-medium group-hover:text-sky-700 transition-colors duration-300">
                {text}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        className="flex-1 max-w-md lg:max-w-lg cursor-pointer"
        style={{ y: yImage, opacity }}
        tabIndex={0}
        aria-label="Organized fridge with food items image"
        role="img"
        title="Organized fridge with food items"
        whileHover={{
          scale: 1.05,
          rotate: 2,
          boxShadow: "0 15px 25px rgba(14, 116, 144, 0.3)",
        }}
        whileFocus={{
          scale: 1.05,
          rotate: 2,
          boxShadow: "0 15px 25px rgba(14, 116, 144, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute -inset-6 bg-sky-100 rounded-3xl rotate-3 filter blur-xl opacity-30"></div>
          <img
            src="https://i.postimg.cc/ZqsrvDJD/photo-1606787366850-de6330128bfc-ixlib-rb-1-2.jpg"
            alt="Organized fridge with neatly stored food items inside"
            className="relative rounded-xl w-full h-auto object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroStory;
