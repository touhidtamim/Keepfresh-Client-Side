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

const SlideOne = () => {
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
      className="h-full lg:min-h-screen bg-gradient-to-br from-white via-[#f9fafc] to-[#f1f5fb] py-16 px-4 sm:px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 relative overflow-hidden"
      aria-labelledby="hero-story-title"
    >
      {/* Left Section */}
      <motion.div
        className="flex-1 max-w-md z-10"
        style={{ y: yText, opacity }}
        aria-describedby="hero-story-description"
      >
        <motion.h2
          id="hero-story-title"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl md:text-4xl font-extrabold mb-6 text-gray-900"
        >
          Your kitchen’s{" "}
          <span className="text-sky-600 underline decoration-sky-400 decoration-4 underline-offset-8">
            silent assistant
          </span>
        </motion.h2>

        <motion.p
          id="hero-story-description"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-md md:text-lg text-gray-700 mb-8 leading-relaxed"
        >
          Food doesn’t speak, but it surely expires. Our app makes sure you’re
          always one step ahead of spoilage. With smart tracking, timely
          reminders, and an intuitive dashboard, you’ll save money, time, and
          food—effortlessly.
        </motion.p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4 md:space-y-5"
          role="list"
        >
          {[
            "Organize Your Kitchen Like a Pro",
            "Full Control at Your Fingertips",
            "Smart notifications before items expire",
          ].map((text, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={listItemVariants}
              className="flex items-center gap-3"
              tabIndex={0}
              aria-label={text}
            >
              <div className="p-2 bg-sky-100 rounded-full text-sky-600 shadow-md">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                {text}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Right Section (Image) */}
      <motion.div
        className="flex-1 max-w-xl z-10 w-full hidden lg:block"
        style={{ y: yImage, opacity }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative w-full rounded-xl overflow-hidden shadow-xl border-4 border-white"
        >
          <img
            src="https://i.postimg.cc/ZqsrvDJD/photo-1606787366850-de6330128bfc-ixlib-rb-1-2.jpg"
            alt="Organized fridge with neatly stored food items inside"
            className="w-full h-auto object-cover block"
            loading="lazy"
          />
        </motion.div>
      </motion.div>

      {/* Down Arrow */}
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

export default SlideOne;
