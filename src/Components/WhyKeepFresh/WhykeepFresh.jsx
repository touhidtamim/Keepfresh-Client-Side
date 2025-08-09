import React, { useEffect, useState } from "react";
import { FiClock, FiDollarSign, FiCoffee } from "react-icons/fi";

const iconMap = {
  clock: <FiClock className="h-8 w-8 text-blue-500" />,
  dollar: <FiDollarSign className="h-8 w-8 text-green-500" />,
  food: <FiCoffee className="h-8 w-8 text-yellow-500" />,
};

const WhyKeepFresh = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/whyKeepFresh.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load whyKeepFresh data", err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Why KeepFresh?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
        {data.map(({ id, title, description, icon }) => (
          <div
            key={id}
            className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-3">{iconMap[icon]}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyKeepFresh;
