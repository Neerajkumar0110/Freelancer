"use client";

import { motion } from "framer-motion";

export default function ProfileModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur
                 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-[#0F1424] w-96 rounded-xl p-6 border border-white/10"
      >
        <h2 className="text-white font-semibold mb-4">
          Profile Photo
        </h2>
        <div className="border border-dashed border-white/20 rounded-lg p-6 text-gray-400 text-center">
          Upload coming soon
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 rounded-lg bg-indigo-600 text-white"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
