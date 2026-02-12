"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Clock, MessageCircle, FileText,
  MoreVertical, CheckCircle2, XCircle, AlertCircle,
  Filter, Search, ArrowUpRight, History,
  Activity, Zap, Target, Shield
} from "lucide-react";

/* ================= MOCK DATA ================= */

const PROPOSALS = [
  {
    id: "prop-1",
    jobTitle: "Senior Next.js Architect",
    client: "Vercel Labs",
    date: "Feb 10, 2026",
    amount: "$120/hr",
    status: "Interviewing",
    signal: 85,
    lastActivity: "CLIENT_MESSAGE_RECEIVED",
  },
  {
    id: "prop-2",
    jobTitle: "Product Designer (FinTech)",
    client: "Stripe",
    date: "Feb 08, 2026",
    amount: "$5,000",
    status: "Pending",
    signal: 32,
    lastActivity: "INITIAL_SUBMISSION",
  },
  {
    id: "prop-3",
    jobTitle: "Backend API Specialist",
    client: "Supabase",
    date: "Jan 25, 2026",
    amount: "$90/hr",
    status: "Declined",
    signal: 10,
    lastActivity: "NODE_CLOSED_BY_CLIENT",
  }
];

/* ================= MAIN COMPONENT ================= */

export default function AdvancedProposalsPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER & TELEMETRY */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h2 className="text-[10px] font-mono text-indigo-500 tracking-[0.5em] uppercase mb-2">Protocol_Tracking</h2>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Bidding<span className="text-indigo-600">.</span>Pipeline</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <header className="px-6 py-4 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center gap-4">
               <div className="p-2 bg-emerald-500/10 rounded-xl">
                 <Target size={20} className="text-emerald-500" />
               </div>
               <div>
                 <span className="text-[9px] text-slate-500 block uppercase font-black tracking-widest">Win_Rate</span>
                 <span className="text-xl font-mono font-bold text-white">64.2%</span>
               </div>
            </header>
            <header className="px-6 py-4 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center gap-4">
               <div className="p-2 bg-indigo-500/10 rounded-xl">
                 <Activity size={20} className="text-indigo-500" />
               </div>
               <div>
                 <span className="text-[9px] text-slate-500 block uppercase font-black tracking-widest">Active_Nodes</span>
                 <span className="text-xl font-mono font-bold text-white">08</span>
               </div>
            </header>
          </div>
        </header>

        {/* CONTROLS HUB */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/[0.02] p-2 rounded-[2rem] border border-white/5">
          <div className="flex gap-1 bg-black/40 p-1.5 rounded-2xl w-full sm:w-auto">
            {["All", "Pending", "Interviewing", "Hired"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 sm:flex-none px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === tab
                    ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72 pr-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
            <input
              type="text"
              placeholder="SCAN_PROTOCOL_ID..."
              className="w-full bg-black/20 border border-white/5 rounded-xl pl-11 pr-4 py-2.5 text-[10px] font-mono tracking-widest text-white focus:outline-none focus:border-indigo-500/40"
            />
          </div>
        </div>

        {/* PROPOSALS LOG */}
        <div className="space-y-4">
          <AnimatePresence>
            {PROPOSALS.map((proposal, idx) => (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProtocolRow proposal={proposal} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function ProtocolRow({ proposal }: { proposal: any }) {
  const statusConfig: any = {
    Interviewing: { color: "indigo", icon: MessageCircle, shadow: "shadow-indigo-500/20" },
    Pending: { color: "amber", icon: Clock, shadow: "shadow-amber-500/20" },
    Declined: { color: "slate", icon: XCircle, shadow: "shadow-slate-500/20" },
    Accepted: { color: "emerald", icon: CheckCircle2, shadow: "shadow-emerald-500/20" },
  };

  const config = statusConfig[proposal.status] || statusConfig.Pending;

  const colorClasses: any = {
    indigo: "text-indigo-400 border-indigo-400/20 bg-indigo-400/5",
    amber: "text-amber-400 border-amber-400/20 bg-amber-400/5",
    slate: "text-slate-500 border-slate-500/20 bg-slate-500/5",
    emerald: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  };

  return (
    <div className={`group relative bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all rounded-[2rem] p-6 overflow-hidden`}>
      {/* Status Accent Line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${config.color}-500/40`} />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

        {/* LEFT: IDENTITY & CORE DATA */}
        <div className="flex gap-6 flex-1">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${colorClasses[config.color]} ${config.shadow} shadow-lg transition-transform group-hover:scale-110`}>
            <config.icon size={24} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-black text-white italic tracking-tight group-hover:text-indigo-400 transition-colors uppercase">
                {proposal.jobTitle}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono uppercase tracking-[0.1em]">
              <span className="text-white font-bold">{proposal.client}</span>
              <span className="text-slate-600 hidden sm:inline">/</span>
              <span className="text-slate-500 flex items-center gap-1.5">
                <Shield size={12} className="text-indigo-500/50" />
                Authored: {proposal.date}
              </span>
            </div>
          </div>
        </div>

        {/* CENTER: SIGNAL STRENGTH (Interest) */}
        <div className="hidden xl:block w-56 px-8 border-x border-white/5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Signal_Strength</span>
            <span className={`text-[10px] font-mono font-bold text-${config.color}-400`}>{proposal.signal}%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${proposal.signal}%` }}
              className={`h-full bg-${config.color}-500 shadow-[0_0_10px_currentColor]`}
            />
          </div>
        </div>

        {/* RIGHT: VALUATION & EXECUTION */}
        <div className="flex items-center justify-between lg:justify-end gap-10">
          <div className="text-right space-y-1 min-w-[120px]">
            <span className="block text-2xl font-black text-white italic tracking-tighter">{proposal.amount}</span>
            <span className="block text-[8px] text-slate-600 font-mono uppercase tracking-tighter">
              {proposal.lastActivity}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-2xl transition-all text-slate-500 hover:text-white">
              <History size={18} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-white/5">
              Protocol_Link <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
    </div>
  );
}