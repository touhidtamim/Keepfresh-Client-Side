import React from "react";

const DeleteModal = ({ item, onClose, onConfirm }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backdropFilter: "blur(6px)" }}
    >
      <div className="bg-white p-6 rounded shadow max-w-sm w-full space-y-4 relative z-10">
        <h2 className="text-lg font-bold">Confirm Delete</h2>
        <p>
          Are you sure you want to delete <strong>{item.title}</strong>?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="text-gray-600 cursor-pointer px-4 py-1 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 cursor-pointer text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
