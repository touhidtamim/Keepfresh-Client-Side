import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {
  FiX,
  FiEdit,
  FiCalendar,
  FiPackage,
  FiImage,
  FiAlignLeft,
} from "react-icons/fi";

const UpdateModal = ({
  item,
  onClose,
  onUpdated,
  modalLoading,
  setModalLoading,
  modalError,
  setModalError,
}) => {
  const [formData, setFormData] = useState({
    title: item.title || "",
    category: item.category || "",
    quantity: item.quantity || 1,
    expiryDate: item.expiryDate
      ? new Date(item.expiryDate).toISOString().slice(0, 10)
      : "",
    description: item.description || "",
    image: item.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setModalError(null);
  };

  const validate = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.category.trim()) return "Category is required";
    if (!formData.quantity || formData.quantity <= 0)
      return "Quantity must be greater than 0";
    if (!formData.expiryDate) return "Expiry date is required";
    if (new Date(formData.expiryDate) < new Date().setHours(0, 0, 0, 0))
      return "Expiry date cannot be in the past";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validate();
    if (errorMsg) {
      setModalError(errorMsg);
      return;
    }

    setModalLoading(true);
    setModalError(null);

    try {
      const res = await axios.put(
        `https://keep-fresh-server-side.vercel.app/items/${item._id}`,
        formData
      );
      if (res.status === 200) {
        toast.success("Item updated successfully");
        onUpdated();
        onClose();
      } else {
        setModalError("Failed to update item");
      }
    } catch (err) {
      setModalError("Error updating item");
      console.error("Update error:", err);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backdropFilter: "blur(6px)" }}
    >
      {/* Mobile: Card layout (single column) */}
      <div className="md:hidden w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl">
        <div className="bg-indigo-600 dark:bg-indigo-800 p-4 rounded-t-xl flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Update Item</h3>
          <button onClick={onClose} className="text-white">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FiEdit className="inline mr-2" /> Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FiImage className="inline mr-2" /> Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FiPackage className="inline mr-2" /> Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
            >
              <option value="">Select Category</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Vegetables">Vegetables</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FiCalendar className="inline mr-2" /> Expiry Date *
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FiAlignLeft className="inline mr-2" /> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
            ></textarea>
          </div>

          {modalError && (
            <p className="text-red-500 dark:text-red-400">{modalError}</p>
          )}

          <div className="flex space-x-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              {modalLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet: 2-column layout */}
      <div className="hidden md:block w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-xl">
        <div className="bg-indigo-600 dark:bg-indigo-800 p-4 rounded-t-xl flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Update Food Item</h3>
          <button onClick={onClose} className="text-white">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Column 1 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <FiEdit className="inline mr-2" /> Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <FiImage className="inline mr-2" /> Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <FiPackage className="inline mr-2" /> Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Meat">Meat</option>
                    <option value="Vegetables">Vegetables</option>
                  </select>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <FiCalendar className="inline mr-2" /> Expiry Date *
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <FiAlignLeft className="inline mr-2" /> Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>
              </div>
            </div>

            {modalError && (
              <p className="text-red-500 dark:text-red-400 mt-4">
                {modalError}
              </p>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {modalLoading ? "Updating..." : "Update Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
