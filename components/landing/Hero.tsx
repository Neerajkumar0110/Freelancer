"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Globe,
  Search,
  Briefcase,
  Users,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";

/* ================= DATA ================= */

const TALENT_TAGS = ["React", "Solidity", "AI Architect", "UI/UX", "Python"];
const JOB_TAGS = ["Remote", "Smart Contracts", "FinTech", "GenAI", "Series A"];

/* ================= ANIMATION VARIANTS ================= */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

/* ================= COMPONENT ================= */

export default function PremiumHero() {
  const [mode, setMode] = useState<"talent" | "jobs">("talent");
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const talentPlaceholders = [
    "Search for 'Senior Blockchain Engineer'...",
    "Search for 'Lead Product Designer'...",
    "Search for 'AI Architect'...",
  ];

  const jobPlaceholders = [
    "Search for 'React Developer Jobs'...",
    "Search for 'Remote UX Design Gigs'...",
    "Search for 'Solidity Architect Roles'...",
  ];

  const currentPlaceholders =
    mode === "talent" ? talentPlaceholders : jobPlaceholders;

  /* ===== FIXED INTERVAL (No dependency warning) ===== */
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) =>
        prev === currentPlaceholders.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [mode]); // Only depend on mode

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] py-20">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center"
      >
        {/* LIVE STATUS */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">
              Real-time Matching Active
            </span>
          </div>
        </motion.div>

        {/* HEADING */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white leading-[1.1] mb-6">
            Scale your <br />
            <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent">
              Digital Ambition.
            </span>
          </h1>
        </motion.div>

        {/* SEARCH HUB */}
        <motion.div variants={itemVariants} className="w-full max-w-3xl mb-16">
          {/* TOGGLE */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
              <button
                onClick={() => {
                  setMode("talent");
                  setSearchValue("");
                  setPlaceholderIndex(0);
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  mode === "talent"
                    ? "bg-white text-black shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Users size={14} /> Find Talent
              </button>

              <button
                onClick={() => {
                  setMode("jobs");
                  setSearchValue("");
                  setPlaceholderIndex(0);
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  mode === "jobs"
                    ? "bg-white text-black shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Briefcase size={14} /> Find Work
              </button>
            </div>
          </div>

          {/* SEARCH BOX */}
          <div
            className={`relative flex items-center bg-[#0a0f1e] border transition-all duration-300 rounded-2xl p-1.5 ${
              isFocused
                ? "border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.1)]"
                : "border-white/10"
            }`}
          >
            <div className="pl-5 pr-3 text-gray-500">
              {mode === "talent" ? (
                <Search size={20} />
              ) : (
                <Briefcase size={20} />
              )}
            </div>

            <div className="relative flex-1">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-transparent outline-none text-white font-medium py-4 text-lg"
              />

              {/* FIXED PLACEHOLDER ANIMATION */}
              <AnimatePresence mode="wait">
                {searchValue === "" && !isFocused && (
                  <motion.div
                    key={`${mode}-${placeholderIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center pointer-events-none text-gray-500 font-medium text-lg pl-0"
                  >
                    {currentPlaceholders[placeholderIndex]}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
            >
              {mode === "talent" ? "Search Talent" : "Search Jobs"}
            </motion.button>
          </div>

          {/* TAGS */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-2.5">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest mr-2">
              {mode === "talent" ? "Popular Roles:" : "Top Categories:"}
            </span>

            {(mode === "talent" ? TALENT_TAGS : JOB_TAGS).map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchValue(tag)}
                className="px-4 py-1.5 rounded-lg border border-white/5 bg-white/[0.03] text-xs font-semibold text-gray-400 hover:text-white hover:border-white/20 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl pt-12 border-t border-white/5">
          <StatEntry
            label="Pre-Vetted"
            value="Top 1%"
            icon={<CheckCircle2 size={14} className="text-emerald-400" />}
          />
          <StatEntry
            label="Match Time"
            value="24 Hours"
            icon={<Zap size={14} className="text-yellow-400" />}
          />
          <StatEntry
            label="Reach"
            value="Global"
            icon={<Globe size={14} className="text-blue-400" />}
          />
          <StatEntry
            label="Infrastructure"
            value="Enterprise"
            icon={<ShieldCheck size={14} className="text-indigo-400" />}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ================= STAT COMPONENT ================= */

function StatEntry({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="text-center md:text-left">
      <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
        {icon}
        <p className="text-2xl font-black text-white tracking-tight">
          {value}
        </p>
      </div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
        {label}
      </p>
    </div>
  );
}
