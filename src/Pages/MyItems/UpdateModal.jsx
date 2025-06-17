import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

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
      return "Quantity must be > 0";
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
      className="fixed inset-0 flex items-center justify-center"
      style={{ backdropFilter: "blur(6px)" }}
    >
      <div className="bg-white rounded p-6 max-w-md w-full shadow-lg relative">
        <h3 className="text-xl font-semibold mb-4">Update Food Item</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Food Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            disabled={modalLoading}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            disabled={modalLoading}
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            disabled={modalLoading}
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
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            disabled={modalLoading}
          />
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            disabled={modalLoading}
          />
          <textarea
            name="description"
            placeholder="Description (Optional)"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 p-2 rounded"
            disabled={modalLoading}
          ></textarea>

          {modalError && (
            <p className="text-red-600 font-medium">{modalError}</p>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2  rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
              disabled={modalLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer ${
                modalLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={modalLoading}
            >
              {modalLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
