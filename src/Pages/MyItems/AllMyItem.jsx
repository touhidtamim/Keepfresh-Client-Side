import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import {
  FiEdit,
  FiTrash2,
  FiLoader,
  FiCalendar,
  FiPackage,
} from "react-icons/fi";

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
        `https://keep-fresh-server-side.vercel.app/my-items?email=${user.email}`
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
      await axios.delete(
        `https://keep-fresh-server-side.vercel.app/items/${id}`
      );
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
        <p className="text-lg dark:text-gray-300">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 dark:bg-indigo-800 p-6 text-white">
            <h2 className="text-2xl font-bold">My Food Items</h2>
            <p className="text-indigo-100 dark:text-indigo-200">
              Manage your food inventory
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {loadingItems ? (
              <div className="flex justify-center items-center py-10">
                <FiLoader className="animate-spin text-2xl text-indigo-600 dark:text-indigo-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  Loading items...
                </span>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600 dark:text-gray-300">
                  No items found.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="p-4 text-left text-gray-700 dark:text-gray-300">
                        <div className="flex items-center">
                          <FiPackage className="mr-2" />
                          Title
                        </div>
                      </th>
                      <th className="p-4 text-left text-gray-700 dark:text-gray-300">
                        Category
                      </th>
                      <th className="p-4 text-left text-gray-700 dark:text-gray-300">
                        Quantity
                      </th>
                      <th className="p-4 text-left text-gray-700 dark:text-gray-300">
                        <div className="flex items-center">
                          <FiCalendar className="mr-2" />
                          Expiry Date
                        </div>
                      </th>
                      <th className="p-4 text-left text-gray-700 dark:text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {items.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="p-4 text-gray-800 dark:text-gray-200">
                          <div className="flex items-center">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-10 h-10 rounded-full object-cover mr-3"
                                onError={(e) => {
                                  e.target.src =
                                    "https://i.ibb.co/5GzXkwq/user.png";
                                }}
                              />
                            )}
                            {item.title}
                          </div>
                        </td>
                        <td className="p-4 text-gray-800 dark:text-gray-200">
                          {item.category}
                        </td>
                        <td className="p-4 text-gray-800 dark:text-gray-200">
                          {item.quantity}
                        </td>
                        <td className="p-4 text-gray-800 dark:text-gray-200">
                          {new Date(item.expiryDate).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleOpenUpdate(item)}
                              disabled={modalLoading}
                              className="flex items-center px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/50 hover:bg-indigo-200 dark:hover:bg-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-md transition-colors"
                            >
                              <FiEdit className="mr-1" />
                              Update
                            </button>
                            <button
                              onClick={() => handleOpenDelete(item)}
                              disabled={modalLoading}
                              className="flex items-center px-3 py-1.5 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-md transition-colors"
                            >
                              <FiTrash2 className="mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

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
        <div className="max-w-5xl mx-auto mt-4">
          <p className="text-center text-red-600 dark:text-red-400 font-semibold">
            {modalError}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllMyItems;
