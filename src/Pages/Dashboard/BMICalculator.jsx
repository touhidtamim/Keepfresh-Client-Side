import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiX, FiBarChart2, FiInfo, FiTrendingUp } from "react-icons/fi";

// Health Guidelines (unchanged)
const GUIDELINES = {
  Underweight: {
    description: "Your BMI suggests you're underweight...",
    recommendations: [
      "Increase calorie intake with nutrient-dense foods...",
      "Incorporate strength training...",
      "Eat smaller, more frequent meals...",
      "Consider consulting a dietitian...",
    ],
    tip: "Healthy weight gain is a gradual process - aim for 0.5kg per week.",
  },
  Normal: {
    description: "Congratulations! Your BMI is in the healthy range.",
    recommendations: [
      "Maintain your balanced diet...",
      "Continue regular physical activity...",
      "Monitor your weight monthly...",
      "Stay hydrated and prioritize sleep...",
    ],
    tip: "Variety is key - rotate different protein sources...",
  },
  Overweight: {
    description: "Your BMI indicates you're carrying excess weight...",
    recommendations: [
      "Focus on portion control...",
      "Increase daily movement...",
      "Reduce processed foods...",
      "Set realistic short-term goals...",
    ],
    tip: "Small changes add up - swapping soda for water...",
  },
  Obese: {
    description: "Your BMI falls in the obese category...",
    recommendations: [
      "Seek professional guidance...",
      "Start with achievable exercise goals...",
      "Keep a food diary...",
      "Prioritize whole foods...",
    ],
    tip: "Sustainable weight loss is about progress, not perfection.",
  },
};

// Modal Component with dark mode
const GuidelinesModal = ({ status, onClose }) => {
  if (!status) return null;
  const { description, recommendations, tip } = GUIDELINES[status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70">
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl relative max-h-[80vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <FiX size={24} />
        </button>
        <h3 className="text-2xl font-extrabold text-center mb-4 dark:text-white">
          Your Health Report:{" "}
          <span className="text-sky-600 dark:text-sky-400 capitalize">
            {status}
          </span>
        </h3>
        <div className="bg-sky-50 dark:bg-sky-900/30 p-4 rounded-lg mb-5">
          <p className="text-gray-800 dark:text-gray-200 mb-3">{description}</p>
          <p className="text-sm font-semibold text-sky-700 dark:text-sky-400">
            💡 Pro Tip: {tip}
          </p>
        </div>
        <h4 className="text-lg font-bold mb-3 dark:text-white">
          Recommended Actions:
        </h4>
        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-6">
          {recommendations.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="w-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-800 text-white py-2 rounded-lg font-semibold transition-colors"
        >
          Got It - Let's Get Healthier!
        </button>
      </div>
    </div>
  );
};

// Main Component with dark mode
const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  const calculateBMI = () => {
    if (!height || !weight || !age || !gender) {
      toast.error("Please complete all fields.");
      return;
    }

    const h = parseFloat(height) / 100;
    const bmiVal = parseFloat(weight) / (h * h);
    const bmiRounded = bmiVal.toFixed(1);
    setBmi(bmiRounded);

    const category =
      bmiVal < 18.5
        ? "Underweight"
        : bmiVal < 24.9
        ? "Normal"
        : bmiVal < 29.9
        ? "Overweight"
        : "Obese";

    setStatus(category);
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setAge("");
    setGender("");
    setBmi(null);
    setStatus("");
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Left Section: Inputs */}
          <div className="p-6 md:p-8 md:w-1/2 flex flex-col">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 dark:text-white">
              Smart BMI Calculator
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Understand your body & get personalized tips
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                type="number"
                placeholder="Age"
                min="2"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="space-y-3 mb-6">
              <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex space-x-3 mt-auto">
              <button
                onClick={calculateBMI}
                className="flex-1 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-800 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Calculate BMI
              </button>
              <button
                onClick={reset}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300 py-2 px-4 rounded-lg font-semibold transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Right Section: Results */}
          <div className="bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-900/50 dark:to-indigo-900/50 p-6 md:p-8 md:w-1/2 flex flex-col">
            {bmi ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">
                      Your Results
                    </h3>
                    {age && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Age: {age}
                      </p>
                    )}
                    {gender && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Gender: {gender[0].toUpperCase() + gender.slice(1)}
                      </p>
                    )}
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow">
                    <FiBarChart2 className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  </div>
                </div>

                <div className="text-center my-auto">
                  <p className="text-5xl font-extrabold text-sky-600 dark:text-sky-400 mb-1">
                    {bmi}
                  </p>
                  <p
                    className={`text-xl font-semibold capitalize ${
                      status === "Normal"
                        ? "text-green-600 dark:text-green-400"
                        : status === "Underweight"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : status === "Overweight"
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {status} Range
                  </p>
                </div>

                <div className="flex space-x-3 mt-auto pt-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex-1 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-800 text-white py-2 rounded-lg font-semibold text-sm transition-colors"
                  >
                    View Guidelines
                  </button>
                  <button className="flex-1 border-2 border-sky-600 dark:border-sky-400 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/30 py-2 rounded-lg font-semibold text-sm transition-colors">
                    Track Progress
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                <FiInfo className="h-12 w-12 mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-lg">Enter your details</p>
                <p className="text-sm">to calculate your BMI</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <GuidelinesModal status={status} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BMICalculator;
