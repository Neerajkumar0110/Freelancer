"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Filter, Search, ChevronRight,
  MessageSquare, UserCheck, Timer, AlertCircle,
  MoreVertical, Download, ExternalLink, Zap,
  Briefcase, BarChart4, Terminal
} from "lucide-react";

/* ================= MOCK PROPOSAL DATA ================= */

const incomingProposals = [
  {
    id: "PRP-7721",
    freelancer: "Alex Rivers",
    role: "Senior Full-Stack",
    bid: 4200,
    delivery: "14 Days",
    matchScore: 98,
    status: "In_Review",
    avatar: "/api/placeholder/40/40",
    skills: ["React", "Node.js", "AWS"],
    excerpt: "I can optimize your SaaS architecture by implementing a more robust edge-caching layer..."
  },
  {
    id: "PRP-8804",
    freelancer: "Elena Kovic",
    role: "DevOps Architect",
    bid: 3800,
    delivery: "10 Days",
    matchScore: 92,
    status: "Shortlisted",
    avatar: "/api/placeholder/40/40",
    skills: ["Docker", "K8s", "Terraform"],
    excerpt: "Proposing a serverless deployment pipeline that reduces OPEX by approximately 22%..."
  }
];

/* ================= MAIN COMPONENT ================= */

export default function ProposalsPage() {
  const [activeFilter, setActiveFilter] = useState("ALL_BIDS");

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-10 space-y-10">

      {/* HEADER: OPERATIONAL INTELLIGENCE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500">
            <BarChart4 size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Procurement_Log</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">Proposal_Deck</h1>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Awaiting Command: {incomingProposals.length} Directives</p>
        </div>

        <div className="flex gap-2">
          {["ALL_BIDS", "SHORTLISTED", "PENDING"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                activeFilter === f
                ? "bg-emerald-500 text-black border-emerald-500"
                : "bg-white/5 border-white/5 text-slate-500 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* PIPELINE OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT: PROPOSAL CARDS */}
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence>
            {incomingProposals.map((proposal, i) => (
              <ProposalBrief key={proposal.id} proposal={proposal} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* RIGHT: SELECTION ANALYTICS */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-[#0F1424]/40 border border-white/5 rounded-[2rem] p-8 space-y-6">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-l-2 border-emerald-500 pl-4">Market_Metrics</h3>

            <div className="space-y-4">
               <MetricRow label="Avg_Bid_Payload" value="$4,000" />
               <MetricRow label="Market_Competitiveness" value="High" color="text-amber-400" />
               <MetricRow label="Top_Skill_Node" value="TypeScript" />
            </div>

            <div className="pt-6 border-t border-white/5">
               <div className="flex items-center gap-3 text-emerald-500 mb-2">
                  <Zap size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">AI_Assistant_Insight</span>
               </div>
               <p className="text-[10px] text-slate-500 leading-relaxed italic">
                 "Agent_Alex shows a 98% technical match with your directive. Recommend immediate Uplink_Comms."
               </p>
            </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/5">
             <div className="flex items-center gap-3 mb-4">
                <Terminal size={18} className="text-indigo-400" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Protocol_Reminder</h3>
             </div>
             <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
               Selection must be finalized within <span className="text-indigo-400">48 hours</span> to maintain network priority.
             </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function ProposalBrief({ proposal, index }: { proposal: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-[#0F1424]/30 border border-white/5 rounded-[2rem] p-6 hover:bg-[#0F1424]/60 hover:border-emerald-500/30 transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row justify-between gap-6">

        {/* AGENT IDENTITY */}
        <div className="flex items-start gap-4 flex-1">
          <div className="relative">
            <img src={proposal.avatar} alt="agent" className="w-12 h-12 rounded-xl grayscale group-hover:grayscale-0 transition-all" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#020617] border border-white/10 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h4 className="text-lg font-black text-white uppercase tracking-tight italic group-hover:text-emerald-400 transition-colors">
                {proposal.freelancer}
              </h4>
              <span className="text-[8px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-500 font-bold tracking-widest">
                ID: {proposal.id}
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{proposal.role}</p>
          </div>
        </div>

        {/* DATA HUD */}
        <div className="flex gap-8 items-center border-l border-white/5 pl-8">
          <DataPoint label="PAYLOAD" value={`$${proposal.bid}`} />
          <DataPoint label="TIMELINE" value={proposal.delivery} />
          <DataPoint label="MATCH" value={`${proposal.matchScore}%`} color="text-emerald-400" />
        </div>
      </div>

      {/* EXCERPT */}
      <div className="mt-6 p-4 rounded-xl bg-black/20 border border-white/5 relative group-hover:border-emerald-500/10 transition-colors">
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
          "{proposal.excerpt}"
        </p>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex gap-2">
          {proposal.skills.map((s: string) => (
            <span key={s} className="text-[8px] font-black uppercase bg-emerald-500/5 text-emerald-500/70 border border-emerald-500/10 px-2 py-1 rounded">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
           <button className="p-2.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <Download size={18} />
           </button>
           <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-xl active:scale-95">
              Review_Full_Brief <ChevronRight size={14} />
           </button>
        </div>
      </div>
    </motion.div>
  );
}

function DataPoint({ label, value, color = "text-white" }: any) {
  return (
    <div className="flex flex-col">
      <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">{label}</span>
      <span className={`text-sm font-black tracking-tighter ${color}`}>{value}</span>
    </div>
  );
}

function MetricRow({ label, value, color = "text-slate-300" }: any) {
  return (
    <div className="flex justify-between items-center group cursor-default">
       <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">{label}</span>
       <span className={`text-[10px] font-black uppercase tracking-tighter ${color}`}>{value}</span>
    </div>
  );
}