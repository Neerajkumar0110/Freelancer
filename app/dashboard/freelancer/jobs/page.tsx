"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, MapPin, Clock, DollarSign,
  ShieldCheck, Star, ChevronRight, Bookmark,
  LayoutGrid, List, Zap, SlidersHorizontal,
  Activity, Target, Globe, Briefcase
} from "lucide-react";

/* ================= TYPES & MOCK DATA ================= */

const JOB_CATEGORIES = ["All", "Development", "Design", "Marketing", "Writing"];
const JOB_TYPES = ["Hourly", "Fixed Price", "Contract"];

const JOBS = [
  {
    id: 1,
    title: "Senior Next.js Architect",
    company: "Vercel Labs",
    location: "Global_Remote",
    type: "Hourly",
    budget: "$80–$120/hr",
    posted: "15M_AGO",
    category: "Development",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    clientRating: 4.9,
    heat: 88, // Competition level
    verified: true,
    description: "Lead the migration of core dashboard infrastructure to edge-runtime patterns. High scalability requirements."
  },
  {
    id: 2,
    title: "Lead Product Designer",
    company: "Stripe",
    location: "Hybrid / SF",
    type: "Fixed Price",
    budget: "$5,000+",
    posted: "02H_AGO",
    category: "Design",
    tags: ["Figma", "Design Systems"],
    clientRating: 5.0,
    heat: 42,
    verified: true,
    description: "Overhaul merchant onboarding flows. Focus on friction reduction and conversion optimization for global markets."
  }
];

/* ================= MAIN COMPONENT ================= */

export default function AdvancedJobsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-4 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* 1. QUANTUM SEARCH HEADER */}
        <header className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-[10px] font-mono text-indigo-500 tracking-[0.5em] uppercase">Market_Interface</h2>
              <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Grid<span className="text-indigo-600">.</span>Explorer</h1>
            </div>

            <div className="flex bg-white/[0.03] p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:text-slate-300"}`}
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:text-slate-300"}`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 p-2 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input
                type="text"
                placeholder="SCAN_FOR_CONTRACTS_OR_KEYWORDS..."
                className="w-full pl-16 pr-6 py-5 bg-black/40 border border-white/5 rounded-[2rem] focus:outline-none focus:border-indigo-500/40 transition-all text-xs font-mono tracking-widest text-white uppercase"
              />
            </div>
            <button className="flex items-center justify-center gap-3 px-8 py-5 bg-white/[0.03] border border-white/5 rounded-[2rem] hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-widest">
              <SlidersHorizontal size={16} /> Filters
            </button>
            <button className="px-12 py-5 bg-white text-black rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-white/5">
              Execute_Search
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* 2. SIDEBAR SENSORS */}
          <aside className="hidden lg:block lg:col-span-3 space-y-10 sticky top-10 h-fit">
            <FilterGroup title="Market_Segments">
              {JOB_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center justify-between w-full group transition-all px-2 py-1 rounded-lg ${activeCategory === cat ? 'bg-indigo-500/10' : ''}`}
                >
                  <span className={`text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                    {cat}
                  </span>
                  <div className={`w-1 h-1 rounded-full ${activeCategory === cat ? 'bg-indigo-400' : 'bg-slate-800'}`} />
                </button>
              ))}
            </FilterGroup>

            <FilterGroup title="Protocol_Type">
              {JOB_TYPES.map(type => (
                <label key={type} className="flex items-center gap-4 group cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer appearance-none w-4 h-4 rounded border border-white/10 bg-black/40 checked:bg-indigo-600 checked:border-indigo-600 transition-all" />
                    <Zap size={8} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-slate-300">{type}</span>
                </label>
              ))}
            </FilterGroup>

            {/* UPGRADE CARD */}
            <div className="relative p-8 rounded-[2rem] bg-indigo-600 overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20 rotate-12 group-hover:rotate-45 transition-transform">
                <Target size={80} />
              </div>
              <div className="relative z-10 space-y-4">
                <h4 className="text-xl font-black text-white italic tracking-tighter uppercase leading-tight">Priority_Signal</h4>
                <p className="text-indigo-100 text-[9px] font-mono leading-relaxed uppercase tracking-widest opacity-80">Gain 24h lead time on all verified protocols.</p>
                <button className="w-full py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all">
                  Upgrade_Access
                </button>
              </div>
            </div>
          </aside>

          {/* 3. CONTRACT FEED */}
          <main className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                <span className="text-indigo-500">124</span>_Available_Contracts
              </h3>
              <div className="flex items-center gap-2 text-[9px] font-mono uppercase text-slate-600">
                SORT_BY:
                <select className="bg-transparent border-none text-white focus:ring-0 cursor-pointer font-black tracking-widest">
                  <option>NEWEST_FIRST</option>
                  <option>HIGHEST_BUDGET</option>
                </select>
              </div>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}>
              {JOBS.map((job) => (
                <JobCard key={job.id} job={job} viewMode={viewMode} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function JobCard({ job, viewMode }: { job: any, viewMode: "list" | "grid" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group relative bg-white/[0.02] border border-white/5 hover:border-indigo-500/40 transition-all duration-500 rounded-[2.5rem] overflow-hidden ${viewMode === "list" ? "p-8" : "p-6 flex flex-col h-full"}`}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] pointer-events-none" />

      <div className="flex items-start justify-between gap-6 mb-6">
        <div className="flex gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <span className="font-black text-indigo-500 text-2xl italic">{job.company[0]}</span>
          </div>
          <div>
            <h3 className="text-xl font-black text-white italic tracking-tighter uppercase group-hover:text-indigo-400 transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-mono text-slate-500 tracking-widest">{job.company}</span>
              {job.verified && <ShieldCheck size={14} className="text-indigo-400 animate-pulse" />}
            </div>
          </div>
        </div>
        <button className="p-3 bg-white/[0.03] border border-white/5 rounded-xl text-slate-600 hover:text-indigo-400 hover:bg-white/[0.08] transition-all">
          <Bookmark size={20} />
        </button>
      </div>

      {/* METRICS HUD */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 ${viewMode === "grid" ? "flex-1" : ""}`}>
        <Metric icon={Globe} label="Loc" value={job.location} />
        <Metric icon={DollarSign} label="Val" value={job.budget} />
        <Metric icon={Clock} label="Age" value={job.posted} />
        <div className="space-y-1">
          <span className="text-[8px] font-mono text-slate-600 uppercase">Market_Heat</span>
          <div className="flex items-center gap-2">
            <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500" style={{ width: `${job.heat}%` }} />
            </div>
            <span className="text-[9px] font-black text-white">{job.heat}%</span>
          </div>
        </div>
      </div>

      {viewMode === "list" && (
        <p className="text-xs text-slate-500 font-mono leading-relaxed mb-8 border-l border-indigo-500/30 pl-4">
          {job.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex gap-2">
          {job.tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 rounded-lg bg-indigo-500/5 text-indigo-400 text-[9px] font-black uppercase tracking-widest border border-indigo-500/10">
              {tag}
            </span>
          ))}
        </div>
        <button className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.2em] group/btn">
          Initialize_Handshake
          <div className="p-2 bg-indigo-600 rounded-lg group-hover/btn:translate-x-1 transition-transform">
            <ChevronRight size={14} />
          </div>
        </button>
      </div>
    </motion.div>
  );
}

function Metric({ icon: Icon, label, value }: any) {
  return (
    <div className="space-y-1">
      <span className="text-[8px] font-mono text-slate-600 uppercase flex items-center gap-1">
        <Icon size={10} className="text-indigo-500" /> {label}
      </span>
      <span className="text-[10px] font-black text-slate-200 uppercase tracking-tighter">{value}</span>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
        <Activity size={12} className="text-indigo-500" /> {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}