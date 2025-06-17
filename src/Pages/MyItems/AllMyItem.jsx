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
  const [loadingItems, setLoadingItems] = useState(false);

  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  // Fetch items
  const fetchItems = async () => {
    if (!user?.email) return;

    setLoadingItems(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/my-items?email=${user.email}`
      );
      setItems(res.data);
    } catch (error) {
      toast.error("Failed to load items");
      console.error("Fetch items error:", error);
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [user]);

  const handleOpenUpdate = (item) => {
    setSelectedItem(item);
    setModalError(null);
    setIsUpdateModalOpen(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedItem(item);
    setModalError(null);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = async (id) => {
    setModalLoading(true);
    setModalError(null);
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      toast.success("Item deleted successfully");
      setIsDeleteModalOpen(false);
      fetchItems();
    } catch (error) {
      setModalError("Failed to delete item");
      console.error("Delete item error:", error);
    } finally {
      setModalLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        <p className="text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">My Food Items</h2>

      {loadingItems ? (
        <p className="text-center text-gray-600">Loading items...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-600">No items found.</p>
      ) : (
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
                      className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-3 py-1 rounded"
                      disabled={modalLoading}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleOpenDelete(item)}
                      className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded"
                      disabled={modalLoading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isUpdateModalOpen && (
        <UpdateModal
          item={selectedItem}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdated={() => {
            fetchItems();
            setIsUpdateModalOpen(false);
          }}
          setModalLoading={setModalLoading}
          setModalError={setModalError}
          modalLoading={modalLoading}
          modalError={modalError}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          item={selectedItem}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => handleDeleteConfirmed(selectedItem._id)}
          modalLoading={modalLoading}
          modalError={modalError}
        />
      )}

      {/* Show modal error */}
      {modalError && (
        <p className="mt-4 text-center text-red-600 font-semibold">
          {modalError}
        </p>
      )}
    </div>
  );
};

export default AllMyItems;
