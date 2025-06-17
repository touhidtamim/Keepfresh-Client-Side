import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CreateNewItem = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleAddFood = async (e) => {
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
      description: formData.description?.trim() || "No description",
    };

    try {
      const res = await axios.post("http://localhost:5000/items", foodItem);

      if (res.data?.insertedId) {
        toast.success("✅ Food item added successfully!");

        setFormData({
          title: "",
          image: "",
          category: "",
          quantity: "",
          expiryDate: "",
          description: "",
        });

        setTimeout(() => {
          navigate("/my-items");
        }, 1200);
      } else {
        toast.error("❌ Failed to add food. Try again.");
      }
    } catch (error) {
      console.error("Error while adding food:", error);
      toast.error("❌ Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-2xl mx-auto px-4 py-10 bg-white rounded shadow-md mt-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Add New Food Item
        </h2>
        <form onSubmit={handleAddFood} className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Food Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-sky-500"
            disabled={isSubmitting}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-sky-500"
            disabled={isSubmitting}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full cursor-pointer border border-gray-300 p-3 rounded focus:ring-2 focus:ring-sky-500"
            disabled={isSubmitting}
          >
            <option value="">Select Category</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Snacks">Snacks</option>
            <option value="Others">Others</option>
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-sky-500"
            disabled={isSubmitting}
          />

          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border  border-gray-300 p-3 rounded focus:ring-2 focus:ring-sky-500"
            disabled={isSubmitting}
          />

          <textarea
            name="description"
            placeholder="Description (Optional)"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-sky-500"
            disabled={isSubmitting}
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full cursor-pointer text-white font-semibold py-3 rounded transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            {isSubmitting ? "Adding Food..." : "Add Food"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateNewItem;
