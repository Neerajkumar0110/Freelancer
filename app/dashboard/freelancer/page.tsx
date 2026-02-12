"use client";

import React, { useState, useMemo } from "react";
import RoleProtectedRoute from "@/components/auth/RoleProtectedRoute";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, DollarSign, Send, Eye, Clock, Zap, CheckCircle2,
  MessageSquare, Star, Search, Filter, Bookmark, ArrowUpRight,
  TrendingUp, Target, Activity, Shield
} from "lucide-react";

/* ================= TYPES & MOCK DATA ================= */

const stats = [
  { icon: DollarSign, label: "Revenue_Flow", value: "$2,450", trend: "+12%", color: "indigo", chart: [20, 40, 35, 50, 45, 70] },
  { icon: Briefcase, label: "Active_Nodes", value: "03", trend: "Stable", color: "cyan", chart: [10, 10, 15, 12, 20, 18] },
  { icon: Send, label: "Proposals_Sent", value: "12", trend: "+02", color: "blue", chart: [30, 45, 20, 60, 50, 80] },
  { icon: Eye, label: "Signal_Reach", value: "148", trend: "+18%", color: "emerald", chart: [15, 25, 35, 30, 45, 40] },
];

const allJobs = [
  { id: 1, title: "Full-stack Neural Architect", skills: ["React", "Node", "MongoDB"], rate: 60, type: "Fixed", description: "Looking for an experienced developer to build and maintain a high-frequency SaaS platform.", posted: "2h ago", match: 98 },
  { id: 2, title: "Frontend Systems Engineer", skills: ["Next.js", "Tailwind"], rate: 45, type: "Hourly", description: "Implement a modern dashboard UI with advanced motion physics and real-time data hooks.", posted: "5h ago", match: 92 },
  { id: 3, title: "Identity Designer (Web3)", skills: ["Figma", "Tailwind"], rate: 55, type: "Hourly", description: "Design a high-converting landing protocol for a decentralized startup.", posted: "1d ago", match: 85 },
];

/* ================= MAIN COMPONENT ================= */

export default function AdvancedFreelancerDashboard() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("feed");

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  return (
    <RoleProtectedRoute allowedRoles={["freelancer"]}>
      <div className="min-h-screen bg-[#020617] text-slate-300 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* HEADER SECTION */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-[10px] font-mono text-indigo-500 tracking-[0.5em] uppercase mb-2">Command_Center</h2>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Operations<span className="text-indigo-600">.</span>HUD</h1>
            </div>

            <div className="flex items-center gap-4">
               <div className="relative group w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={16} />
                  <input
                    type="text"
                    placeholder="SCAN_FOR_JOBS_"
                    className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-indigo-500/50 transition-all text-[11px] font-mono tracking-widest text-white placeholder:text-slate-700"
                    onChange={(e) => setSearch(e.target.value)}
                  />
               </div>
               <button className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 transition-all">
                 <Filter size={18} className="text-slate-400" />
               </button>
            </div>
          </header>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatModule key={stat.label} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* PRIMARY FEED */}
            <main className="lg:col-span-8 space-y-8">
              <div className="flex items-center gap-8 border-b border-white/5">
                {['feed', 'saved', 'applied'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${
                      activeTab === tab ? "text-white" : "text-slate-600 hover:text-slate-400"
                    }`}
                  >
                    {tab}_Archive
                    {activeTab === tab && (
                      <motion.div layoutId="tab-bar" className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 shadow-[0_0_15px_#6366f1]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredJobs.map((job, idx) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <JobPacket job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </main>

            {/* SIDEBAR ANALYTICS */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="p-1 rounded-[2.5rem] bg-gradient-to-b from-indigo-500/20 to-transparent">
                <div className="p-8 rounded-[2.3rem] bg-[#0F1424]/90 backdrop-blur-xl border border-white/5 space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Identity_Metrics</h3>
                    <Shield size={16} className="text-emerald-500/50" />
                  </div>

                  <div className="space-y-6">
                    <MetricRow label="Success_Rate" value={98} color="bg-emerald-500" />
                    <MetricRow label="Neural_Match" value={92} color="bg-indigo-500" />
                    <MetricRow label="Response_Time" value={45} color="bg-blue-500" />
                  </div>

                  <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center justify-center p-4 rounded-3xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all group">
                      <Zap size={20} className="mb-2 group-hover:scale-125 transition-transform" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Push_Gig</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 rounded-3xl bg-white/[0.03] border border-white/5 text-slate-400 hover:text-white transition-all">
                      <MessageSquare size={20} className="mb-2" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Inbound</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </RoleProtectedRoute>
  );
}

/* ================= SUB-COMPONENTS ================= */

function StatModule({ icon: Icon, label, value, trend, color, chart }: any) {
  const colorMap: any = {
    indigo: "text-indigo-400 border-indigo-500/20",
    cyan: "text-cyan-400 border-cyan-500/20",
    blue: "text-blue-400 border-blue-500/20",
    emerald: "text-emerald-400 border-emerald-500/20",
  };

  return (
    <div className="group relative p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={48} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
           <span className={`text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${colorMap[color]}`}>
             {label}
           </span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-3xl font-black text-white italic tracking-tighter">{value}</h3>
            <p className={`text-[10px] font-bold mt-1 ${trend.startsWith('+') ? 'text-emerald-500' : 'text-slate-500'}`}>
              {trend} <span className="opacity-40 tracking-normal ml-1">v. prev_period</span>
            </p>
          </div>
          <Sparkline data={chart} color={color} />
        </div>
      </div>
    </div>
  );
}

function JobPacket({ job }: any) {
  return (
    <div className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Col: The "Core" */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse" />
             <h3 className="text-xl font-black text-white uppercase italic tracking-tight group-hover:text-indigo-400 transition-colors">
               {job.title}
             </h3>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {job.skills.map((s: string) => (
              <span key={s} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono text-slate-400">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Right Col: Data & Actions */}
        <div className="flex flex-col justify-between items-end min-w-[140px]">
          <div className="text-right">
            <div className="text-2xl font-black text-white italic">${job.rate}<span className="text-[10px] text-slate-600 not-italic uppercase tracking-widest">/hr</span></div>
            <div className="flex items-center justify-end gap-2 mt-1 text-slate-500">
               <Clock size={12} />
               <span className="text-[10px] font-mono">{job.posted}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 w-full">
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div
                 initial={{ width: 0 }}
                 animate={{ width: `${job.match}%` }}
                 className="h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"
               />
            </div>
            <button className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-indigo-500 hover:text-white transition-all">
              Initiate_Link <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/[0.02] rounded-tr-[2rem] pointer-events-none group-hover:border-indigo-500/20 transition-colors" />
    </div>
  );
}

function MetricRow({ label, value, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
        <span className="text-slate-500">{label}</span>
        <span className="text-white">{value}%</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}

function Sparkline({ data, color }: { data: number[], color: string }) {
  const colors: any = {
    indigo: "#6366f1",
    cyan: "#22d3ee",
    blue: "#3b82f6",
    emerald: "#10b981"
  };

  return (
    <svg className="w-20 h-10 overflow-visible">
      <polyline
        fill="none"
        stroke={colors[color] || "#6366f1"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={data.map((val: number, i: number) => `${(i / (data.length - 1)) * 80},${40 - (val / 100) * 40}`).join(' ')}
      />
    </svg>
  );
}