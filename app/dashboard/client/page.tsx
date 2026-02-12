"use client";

import React from "react";
import RoleProtectedRoute from "@/components/auth/RoleProtectedRoute";
import {
  Briefcase, Users, FileText, DollarSign, Plus,
  ArrowUpRight, MoreHorizontal, MessageSquare,
  ShieldCheck, TrendingUp, Clock, Target, Zap
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= MOCK DATA ================= */

const stats = [
  { icon: Target, label: "OPEN_DIRECTIVES", value: "04", sub: "Active Listings", color: "text-emerald-400" },
  { icon: Zap, label: "INCOMING_BIDS", value: "26", sub: "+5 Priority", color: "text-amber-400" },
  { icon: Users, label: "DEPLOYED_TALENT", value: "03", sub: "Active Nodes", color: "text-indigo-400" },
  { icon: DollarSign, label: "OPEX_TOTAL", value: "$3,120", sub: "Within Budget", color: "text-emerald-500" },
];

const recentJobs = [
  {
    id: 1,
    title: "UI/UX Designer for SaaS App",
    proposals: 12,
    status: "Active",
    posted: "1 day ago",
    applicants: ["/api/placeholder/32/32", "/api/placeholder/32/32", "/api/placeholder/32/32"]
  },
  {
    id: 2,
    title: "Full-stack Next.js Developer",
    proposals: 8,
    status: "Reviewing",
    posted: "3 days ago",
    applicants: ["/api/placeholder/32/32", "/api/placeholder/32/32"]
  }
];

/* ================= MAIN COMPONENT ================= */

export default function ClientDashboard() {
  return (
    <RoleProtectedRoute allowedRoles={["client"]}>
      <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-emerald-500/30">


        <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-10">

          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-emerald-500/70 uppercase">System_Overview</span>
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                Project_Command
              </h1>
              <p className="text-slate-500 text-sm font-medium max-w-md">
                Orchestrate your workspace, monitor project nodes, and manage financial flow.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-white transition-all shadow-2xl shadow-emerald-500/20 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Plus size={18} className="group-hover:rotate-180 transition-transform duration-500" />
              Post_New_Directive
            </motion.button>
          </div>

          {/* TELEMETRY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* CENTRAL FEED: JOB DIRECTIVES */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-3">
                  Active_Directives
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {recentJobs.length}
                  </span>
                </h2>
                <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition">History_Log</button>
              </div>

              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <ClientJobCard key={job.id} job={job} />
                ))}
              </div>
            </div>

            {/* SIDEBAR OPS */}
            <div className="lg:col-span-4 space-y-6">

              <Panel title="TALENT_NETWORK">
                <div className="space-y-5">
                  <TalentRow name="Aarav Mehta" role="Full-Stack Dev" status="Uplink_Active" />
                  <TalentRow name="Sophia Chen" role="UI/UX Designer" status="Review_Req" />
                  <TalentRow name="Daniel Cruz" role="AI Engineer" status="Standby" />
                </div>
                <button className="w-full mt-8 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-[9px] font-black hover:bg-white/[0.05] transition uppercase tracking-[0.2em] text-slate-500 hover:text-emerald-400">
                  Network_Protocol
                </button>
              </Panel>

              {/* SECURITY MODULE */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent border border-emerald-500/10 relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:scale-110 transition-transform text-emerald-500">
                  <ShieldCheck size={120} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="font-black text-[10px] uppercase tracking-widest text-white">Escrow_Vault</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Assets are locked in high-security escrow. Milestone verification required for fund distribution.
                </p>
              </div>

              <Panel title="SYSTEM_LOG">
                <div className="space-y-6 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/5" />
                  <ActivityItem text="New bid from Operator_Alex received" time="12m ago" />
                  <ActivityItem text="Talent_Mehta submitted milestone #4" time="2h ago" />
                  <ActivityItem text="Job 'UI Designer' integrity verified" time="5h ago" />
                </div>
              </Panel>

            </div>
          </div>
        </main>
      </div>
    </RoleProtectedRoute>
  );
}

/* ================= SUB-COMPONENTS ================= */

function StatCard({ icon: Icon, label, value, sub, color }: any) {
  return (
    <div className="p-6 rounded-[2rem] bg-[#0F1424]/40 border border-white/5 hover:border-emerald-500/20 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all">
        <Icon size={40} className={color} />
      </div>
      <div className="flex flex-col relative z-10">
        <div className={`w-fit p-3 rounded-2xl bg-white/5 mb-4 ${color}`}>
          <Icon size={18} />
        </div>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</p>
        <div className="flex items-end gap-2 mt-1">
          <h3 className="text-3xl font-black tracking-tighter text-white">{value}</h3>
          <TrendingUp size={14} className="text-emerald-500 mb-2" />
        </div>
        <p className="text-[10px] text-slate-600 mt-2 font-mono uppercase">{sub}</p>
      </div>
    </div>
  );
}

function ClientJobCard({ job }: any) {
  return (
    <div className="p-7 rounded-[2.5rem] bg-[#0F1424]/30 border border-white/5 hover:border-emerald-500/20 hover:bg-[#0F1424]/50 transition-all group relative">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-black text-white italic group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
              {job.title}
            </h3>
            <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest border ${
              job.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
            }`}>
              {job.status}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span className="flex items-center gap-2">
              <FileText size={14} className="text-emerald-500" />
              <span className="text-slate-200">{job.proposals}</span> Bids_Received
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-slate-600" />
              {job.posted}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {job.applicants.map((src: string, i: number) => (
                <div key={i} className="w-9 h-9 rounded-xl border-2 border-[#0B0F19] bg-slate-800 overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
                   <img src={src} alt="talent" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                </div>
              ))}
            </div>
            <div className="h-px w-8 bg-white/10" />
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
              + {job.proposals - job.applicants.length} Data_Points
            </span>
          </div>
        </div>

        <div className="flex md:flex-col justify-between items-end gap-3 min-w-[160px]">
          <button className="p-2.5 text-slate-600 hover:text-white transition rounded-xl hover:bg-white/5">
            <MoreHorizontal size={20} />
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_10px_30px_-10px_rgba(255,255,255,0.2)]">
            Review_Directives <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TalentRow({ name, role, status }: any) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="relative w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-sm group-hover:border-emerald-500/50 transition-all">
          {name.charAt(0)}
          {status === 'Uplink_Active' && (
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0F1424] animate-pulse" />
          )}
        </div>
        <div>
          <p className="text-xs font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{name}</p>
          <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.1em] mt-0.5">{role}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
         <button className="p-2 text-slate-600 hover:text-emerald-400 hover:bg-emerald-500/5 rounded-xl transition-all">
          <MessageSquare size={16} />
         </button>
      </div>
    </div>
  );
}

function ActivityItem({ text, time }: any) {
  return (
    <div className="flex items-start gap-4 relative z-10 group cursor-default">
      <div className="w-[23px] h-[23px] rounded-full bg-[#020617] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-emerald-500 transition-all shadow-[0_0_10px_transparent] group-hover:shadow-emerald-500/20">
        <div className={`w-1.5 h-1.5 rounded-full transition-all ${
          text.includes('integrity') ? 'bg-blue-500' : 'bg-emerald-500'
        }`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors leading-relaxed">
          {text}
        </p>
        <p className="text-[9px] text-slate-600 mt-1 font-mono uppercase tracking-tighter">{time}</p>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-8 rounded-[2rem] bg-[#0F1424]/40 border border-white/5 shadow-2xl">
      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8 border-l-2 border-emerald-500 pl-4">{title}</h3>
      {children}
    </div>
  );
}