import React from "react";

const DeleteModal = ({ item, onClose, onConfirm }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backdropFilter: "blur(6px)" }}
    >
      <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-200 p-6 rounded-lg shadow-xl max-w-sm w-full space-y-4 relative z-10">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          Confirm Delete
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to delete{" "}
          <strong className="text-gray-800 dark:text-white">
            {item.title}
          </strong>
          ?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
