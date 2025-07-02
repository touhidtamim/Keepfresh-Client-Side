import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FiPackage,
  FiClock,
  FiCalendar,
  FiImage,
  FiEdit3,
  FiX,
} from "react-icons/fi";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "",
    quantity: "",
    expiryDate: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (formData.image) {
      setImagePreview(formData.image);
    } else {
      setImagePreview("");
    }
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { title, image, category, quantity, expiryDate } = formData;

    if (!title.trim()) {
      toast.error("Please enter the Food Title");
      return false;
    }

    if (!image.trim()) {
      toast.error("Please provide an Image URL");
      return false;
    }

    try {
      new URL(image);
    } catch (e) {
      toast.error("Please provide a valid Image URL");
      return false;
    }

    if (!category.trim()) {
      toast.error("Please select a Category");
      return false;
    }

    if (!quantity || Number(quantity) <= 0) {
      toast.error("Please enter a valid Quantity");
      return false;
    }

    if (!expiryDate.trim()) {
      toast.error("Please select an Expiry Date");
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(expiryDate);

    if (selectedDate < today) {
      toast.error("Expiry date cannot be in the past");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!user?.email) {
      toast.error("You must be logged in to add food");
      return;
    }

    setIsSubmitting(true);

    const foodItem = {
      ...formData,
      quantity: parseInt(formData.quantity) || 1,
      addedDate: new Date().toISOString(),
      addedBy: user.email,
      description: formData.description?.trim() || "No description provided",
      status: "available",
    };

    try {
      const res = await axios.post(
        "https://keep-fresh-server-side.vercel.app/items",
        foodItem,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.insertedId) {
        toast.success("Food item added successfully!");
        setFormData({
          title: "",
          image: "",
          category: "",
          quantity: "",
          expiryDate: "",
          description: "",
        });

        setTimeout(() => {
          navigate("/dashboard/my-foods");
        }, 1200);
      } else {
        throw new Error("Failed to add food");
      }
    } catch (error) {
      console.error("Error while adding food:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 dark:bg-indigo-800 p-6 text-white">
            <h1 className="text-2xl font-bold">Add New Food Item</h1>
            <p className="text-indigo-100 dark:text-indigo-200">
              Track your food items and prevent waste
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Food Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <FiEdit3 className="mr-2 text-indigo-600" />
                  Food Title *
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Fresh Apples"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  disabled={isSubmitting}
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <FiImage className="mr-2 text-indigo-600" />
                  Image URL *
                </label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  disabled={isSubmitting}
                />
                {imagePreview && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Image Preview:
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, image: "" });
                          setImagePreview("");
                        }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <FiX />
                      </button>
                    </div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-40 w-full object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      onError={() => setImagePreview("")}
                    />
                  </div>
                )}
              </div>

              {/* Category and Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <FiPackage className="mr-2 text-indigo-600" />
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    disabled={isSubmitting}
                  >
                    <option value="">Select a category</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Meat">Meat</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="e.g., 2"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <FiClock className="mr-2 text-indigo-600" />
                  Expiry Date *
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  disabled={isSubmitting}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Additional details about the food item..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  disabled={isSubmitting}
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg transition-colors flex items-center"
                >
                  <FiX className="mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition-colors flex items-center ${
                    isSubmitting
                      ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <FiPackage className="mr-2" />
                      Add Food Item
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
