import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const FoodNotes = ({ isOwner, note, onNoteAddOrUpdate, onNoteDelete }) => {
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    setNoteText(note?.text || "");
  }, [note]);

  const handleSubmit = async () => {
    if (!noteText.trim()) return;
    try {
      await onNoteAddOrUpdate(noteText.trim());
      toast.success(note ? "Note updated successfully!" : "Note added!");
    } catch (error) {
      toast.error("Failed to submit note. Try again.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the note?")) return;
    try {
      await onNoteDelete();
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete note. Try again.");
    }
  };

  const inputEmpty = !noteText.trim();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Your Note
      </h3>

      {note?.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded border border-blue-200 dark:border-blue-700 relative"
        >
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {note.text}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Posted on: {new Date(note.createdAt).toLocaleString()}
          </p>
          {isOwner && (
            <button
              onClick={handleDelete}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 dark:hover:text-red-400 font-bold"
              title="Delete Note"
              aria-label="Delete Note"
            >
              &times;
            </button>
          )}
        </motion.div>
      )}

      <textarea
        rows={4}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder={
          isOwner
            ? "Write your note here (e.g., 'Use first', 'Store in freezer')"
            : "Only the owner can add a note"
        }
        disabled={!isOwner}
        className={`w-full rounded p-3 focus:outline-none transition-all resize-none
          ${
            isOwner
              ? inputEmpty
                ? "border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-300"
                : "border border-blue-500 dark:border-blue-500 bg-white dark:bg-gray-800 placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              : "border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
          }
        `}
      />

      <motion.button
        whileHover={{ scale: isOwner && !inputEmpty ? 1.05 : 1 }}
        whileTap={{ scale: isOwner && !inputEmpty ? 0.95 : 1 }}
        onClick={handleSubmit}
        disabled={!isOwner || inputEmpty}
        className={`px-5 py-2 rounded text-white font-semibold transition-all
          ${
            isOwner && !inputEmpty
              ? "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/50"
              : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-70"
          }
        `}
      >
        {note?.text ? "Update Note" : "Add Note"}
      </motion.button>
    </div>
  );
};

export default FoodNotes;
