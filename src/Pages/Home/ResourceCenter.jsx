import { motion } from "framer-motion";
import {
  FiPackage,
  FiFileText,
  FiClipboard,
  FiVideo,
  FiDownload,
} from "react-icons/fi";

const resources = [
  {
    title: "Food Storage Guide",
    description:
      "Download our printable PDF guide to learn how to store your food smartly.",
    link: "/resources/storage-guide.pdf",
    icon: <FiPackage className="text-sky-600" />,
    fileType: "PDF",
  },
  {
    title: "Waste Tracking Template",
    description:
      "Use our weekly tracker to measure and minimize your food waste.",
    link: "/resources/waste-tracker.xlsx",
    icon: <FiFileText className="text-sky-600" />,
    fileType: "XLSX",
  },
  {
    title: "Meal Planning Toolkit",
    description:
      "Plan your meals efficiently and save money with our free toolkit.",
    link: "/resources/meal-planner.pdf",
    icon: <FiClipboard className="text-sky-600" />,
    fileType: "PDF",
  },
  {
    title: "App Walkthrough Video",
    description:
      "A step-by-step video tutorial to help you get started with KeepFresh.",
    link: "/resources/app-video.mp4",
    icon: <FiVideo className="text-sky-600" />,
    fileType: "MP4",
  },
];

const ResourceCenter = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center mb-14 px-4 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Resource <span className="text-sky-600">Center</span>
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Tools and templates to help you succeed in your food-saving journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-0">
        {resources.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            whileHover={{ scale: 1.02 }}
            className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg text-left p-6 flex flex-col relative"
            download
          >
            {/* Top Icon Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
                {item.icon}
                {item.title}
              </div>

              {/* Download Badge */}
              <span className="flex items-center gap-1 bg-sky-100 dark:bg-sky-700 text-sky-600 dark:text-white text-xs font-medium px-2 py-1 rounded-full">
                <FiDownload size={14} />
                {item.fileType}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow leading-snug">
              {item.description}
            </p>

            {/* Hover Label */}
            <span className="absolute bottom-3 right-4 text-xs text-gray-400 dark:text-gray-500 group-hover:text-sky-500 transition">
              Click to download
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ResourceCenter;
