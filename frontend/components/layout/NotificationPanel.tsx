"use client";

import { motion } from "framer-motion";

export default function NotificationPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="absolute right-10 top-12 w-72 bg-[#0F1424]
                 border border-white/10 rounded-xl shadow-xl"
    >
      <div className="px-4 py-3 border-b border-white/10 text-sm text-white">
        Notifications
      </div>
      <div className="px-4 py-3 text-sm text-gray-300">
        Aarav just got hired
      </div>
      <div className="px-4 py-3 text-sm text-gray-300">
        Sophia completed a project
      </div>
    </motion.div>
  );
}
