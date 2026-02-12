"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Star, ShieldCheck,
  MapPin, Zap, MessageSquare, ExternalLink,
  Cpu, Terminal, SlidersHorizontal
} from "lucide-react";

/* ================= MOCK TALENT DATA ================= */

const talentData = [
  {
    id: "OP_01",
    name: "Aarav Mehta",
    role: "Full-Stack Engineer",
    rate: 85,
    rating: 4.9,
    jobs: 42,
    location: "Mumbai, IN",
    skills: ["Next.js", "Rust", "Solidity"],
    status: "Available",
    avatar: "/api/placeholder/64/64",
    verified: true
  },
  {
    id: "OP_02",
    name: "Sophia Chen",
    role: "UI/UX Architect",
    rate: 95,
    rating: 5.0,
    jobs: 38,
    location: "Singapore",
    skills: ["Figma", "Design Systems", "Framer"],
    status: "In_Assignment",
    avatar: "/api/placeholder/64/64",
    verified: true
  },
  {
    id: "OP_03",
    name: "Marcus Thorne",
    role: "AI/ML Specialist",
    rate: 120,
    rating: 4.8,
    jobs: 15,
    location: "London, UK",
    skills: ["Python", "PyTorch", "LLMs"],
    status: "Available",
    avatar: "/api/placeholder/64/64",
    verified: false
  }
];

/* ================= MAIN COMPONENT ================= */

export default function FreelancersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-8 space-y-8">

      {/* HEADER: GRID_CONTROL */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Terminal className="text-emerald-500" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Talent_Uplink</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Operations_Grid</h1>
        </div>

        <div className="flex items-center gap-4 bg-[#0F1424]/60 border border-white/5 p-2 rounded-2xl w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            <input
              type="text"
              placeholder="SCAN_FOR_SKILLS..."
              className="w-full bg-black/40 border-none rounded-xl py-3 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* TALENT FEED */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {talentData.map((talent, i) => (
            <TalentCard key={talent.id} talent={talent} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* FOOTER_TELEMETRY */}
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 grayscale">
        <p className="text-[8px] font-mono uppercase tracking-[0.2em]">Active_Agents: 12,402</p>
        <p className="text-[8px] font-mono uppercase tracking-[0.2em]">Network_Sync: 100%_Operational</p>
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function TalentCard({ talent, index }: { talent: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-[#0F1424]/40 border border-white/5 rounded-[2.5rem] p-8 overflow-hidden hover:border-emerald-500/30 hover:bg-[#0F1424]/60 transition-all duration-500"
    >
      {/* STATUS HUD */}
      <div className="absolute top-6 right-8 flex items-center gap-2">
        <span className={`text-[8px] font-black uppercase tracking-widest ${talent.status === 'Available' ? 'text-emerald-500' : 'text-amber-500'}`}>
          {talent.status}
        </span>
        <div className={`w-2 h-2 rounded-full ${talent.status === 'Available' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 animate-pulse'}`} />
      </div>

      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 overflow-hidden border border-white/10 group-hover:border-emerald-500/50 transition-all">
            <img src={talent.avatar} alt={talent.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
          </div>
          {talent.verified && (
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black p-1 rounded-lg border-2 border-[#0B0F19]">
              <ShieldCheck size={12} strokeWidth={3} />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-black italic uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            {talent.name}
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{talent.role}</p>
        </div>
      </div>

      {/* STATS_BAR */}
      <div className="grid grid-cols-3 gap-2 my-8 p-4 bg-black/20 rounded-2xl border border-white/5">
        <StatNode label="Rate" value={`$${talent.rate}/hr`} />
        <StatNode label="Rating" value={talent.rating} icon={<Star size={8} className="fill-emerald-500 text-emerald-500" />} />
        <StatNode label="Jobs" value={talent.jobs} />
      </div>

      {/* SKILL_STACK */}
      <div className="flex flex-wrap gap-2 mb-8">
        {talent.skills.map((skill: string) => (
          <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-300 group-hover:border-emerald-500/20 transition-all">
            {skill}
          </span>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-3">
        <button className="flex-1 bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-[0_10px_30px_-10px_rgba(255,255,255,0.1)] active:scale-95 flex items-center justify-center gap-2">
          Uplink_Comms <MessageSquare size={14} />
        </button>
        <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all">
          <ExternalLink size={18} />
        </button>
      </div>
    </motion.div>
  );
}

function StatNode({ label, value, icon }: { label: string; value: any; icon?: any }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[7px] font-black uppercase tracking-widest text-slate-600 mb-1">{label}</span>
      <div className="flex items-center gap-1 text-[11px] font-black text-slate-200">
        {value} {icon}
      </div>
    </div>
  );
}