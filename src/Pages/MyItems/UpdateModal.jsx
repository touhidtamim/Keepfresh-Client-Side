import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateModal = ({ item, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    title: item.title,
    category: item.category,
    quantity: item.quantity,
    expiryDate: item.expiryDate,
    description: item.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/items/${item._id}`, formData);
      toast.success("Item updated");
      onUpdated();
      onClose();
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md space-y-4">
        <h3 className="text-xl font-bold">Update Item</h3>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="expiryDate"
          type="date"
          value={formData.expiryDate.split("T")[0]}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="text-gray-600">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
