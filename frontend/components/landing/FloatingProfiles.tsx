"use client";

import { motion } from "framer-motion";

const profiles = [
  {
    name: "Aarav Mehta",
    role: "Full-Stack Developer",
    avatar: "/profiles/dev1.jpg",
    rate: "$45/hr",
    top: "15%",
    left: "8%",
  },
  {
    name: "Sophia Chen",
    role: "UI / UX Designer",
    avatar: "/profiles/designer1.jpg",
    rate: "$40/hr",
    top: "55%",
    left: "6%",
  },
  {
    name: "Daniel Cruz",
    role: "AI Engineer",
    avatar: "/profiles/ai1.jpg",
    rate: "$60/hr",
    top: "20%",
    right: "8%",
  },
  {
    name: "Fatima Noor",
    role: "Digital Marketer",
    avatar: "/profiles/marketing1.jpg",
    rate: "$35/hr",
    bottom: "15%",
    right: "10%",
  },
];

export default function FloatingProfiles() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      {profiles.map((profile, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -12, 0],
          }}
          transition={{
            delay: index * 0.2,
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: profile.top,
            left: profile.left,
            right: profile.right,
            bottom: profile.bottom,
          }}
          className="bg-[#0B0F19]/90 backdrop-blur
                     border border-white/10 rounded-2xl
                     px-4 py-3 w-56 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-white text-sm font-medium">
                {profile.name}
              </p>
              <p className="text-xs text-gray-400">
                {profile.role}
              </p>
            </div>
          </div>

          <div className="mt-3 flex justify-between items-center text-xs">
            <span className="text-gray-400">Starting at</span>
            <span className="text-indigo-400 font-semibold">
              {profile.rate}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
