import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const FoodNotes = ({
  isOwner,
  noteText,
  setNoteText,
  handleNoteSubmit,
  note,
}) => {
  const handleSubmitWithToast = async () => {
    try {
      await handleNoteSubmit();
      toast.success(note?.text ? "Note updated successfully!" : "Note added!");
      setNoteText("");
    } catch (error) {
      toast.error("Failed to submit note. Try again.");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Your Note</h3>

      {note?.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 p-4 rounded border border-blue-200"
        >
          <p className="text-gray-800">{note.text}</p>
          <p className="text-xs text-gray-500 mt-1">
            Posted on: {new Date(note.createdAt).toLocaleString()}
          </p>
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
        className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!isOwner}
      />

      <motion.button
        whileHover={{ scale: isOwner && noteText.trim() ? 1.05 : 1 }}
        whileTap={{ scale: isOwner && noteText.trim() ? 0.95 : 1 }}
        onClick={handleSubmitWithToast}
        disabled={!isOwner || !noteText.trim()}
        className={`px-5 py-2 rounded text-white font-semibold transition-all ${
          isOwner && noteText.trim()
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {note?.text ? "Update Note" : "Add Note"}
      </motion.button>
    </div>
  );
};

export default FoodNotes;
