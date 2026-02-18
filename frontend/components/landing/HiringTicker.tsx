"use client";

import { motion } from "framer-motion";

const events = [
  "Aarav just got hired",
  "Sophia completed a project",
  "Daniel earned $120",
  "Fatima received 5★ review",
];

export default function HiringTicker() {
  return (
    <div className="absolute bottom-6 left-6 hidden md:block">
      <motion.div
        animate={{ y: [0, -40] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="bg-[#0F1424]/90 backdrop-blur
                   border border-white/10 rounded-xl
                   px-4 py-2 text-sm text-gray-300"
      >
        {events[Math.floor(Math.random() * events.length)]}
      </motion.div>
    </div>
  );
}
