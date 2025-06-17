import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";

const AllMyItems = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/my-items?email=${user?.email}`
      );
      setItems(res.data);
    } catch (error) {
      toast.error("Failed to load items");
    }
  };

  useEffect(() => {
    if (user?.email) fetchItems();
  }, [user]);

  const handleOpenUpdate = (item) => {
    setSelectedItem(item);
    setIsUpdateModalOpen(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      toast.success("Item deleted");
      fetchItems();
    } catch {
      toast.error("Failed to delete");
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">My Food Items</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Expiry Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="p-3 border">{item.title}</td>
                <td className="p-3 border">{item.category}</td>
                <td className="p-3 border">{item.quantity}</td>
                <td className="p-3 border">
                  {new Date(item.expiryDate).toLocaleDateString()}
                </td>
                <td className="p-3 border space-x-2">
                  <button
                    onClick={() => handleOpenUpdate(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleOpenDelete(item)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isUpdateModalOpen && (
        <UpdateModal
          item={selectedItem}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdated={fetchItems}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          item={selectedItem}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => handleDeleteConfirmed(selectedItem._id)}
        />
      )}
    </div>
  );
};

export default AllMyItems;
