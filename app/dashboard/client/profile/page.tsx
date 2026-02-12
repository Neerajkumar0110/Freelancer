"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  Mail,
  Globe,
  Lock,
  Camera,
  Bell,
  CreditCard,
  CheckCircle2,
  Terminal,
  Activity,
  ChevronRight
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("identity");

  const sidebarItems = [
    { id: "identity", label: "IDENTITY_VAULT", icon: Building2 },
    { id: "security", label: "SECURITY_PROTOCOL", icon: Lock },
    { id: "billing", label: "PAYMENT_GATEWAY", icon: CreditCard },
    { id: "notifications", label: "COMMS_CONFIG", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER: OPERATOR IDENTITY */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border-2 border-dashed border-emerald-500/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-emerald-500">
                <img
                  src="/api/placeholder/96/96"
                  alt="Org Logo"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                  <Camera size={20} className="text-emerald-500" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 p-1.5 bg-emerald-500 rounded-lg shadow-[0_0_15px_#10b981]">
                <ShieldCheck size={16} className="text-black" strokeWidth={3} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Authorized_Client</span>
              </div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Quantum_Nexus_Labs</h1>
              <p className="text-xs font-mono text-emerald-500/60 tracking-widest uppercase">ID: QN-8821-X99</p>
            </div>
          </div>

          <div className="flex gap-3">
             <div className="px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <Activity size={16} className="text-emerald-500 animate-pulse" />
                <div className="flex flex-col">
                   <span className="text-[8px] font-black text-slate-500 uppercase">Trust_Score</span>
                   <span className="text-xs font-black text-white">99.2%</span>
                </div>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* NAV RAIL */}
          <aside className="lg:col-span-3 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${
                  activeTab === item.id
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-white"
                  : "hover:bg-white/[0.02] border border-transparent text-slate-500"
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={18} className={activeTab === item.id ? "text-emerald-500" : "group-hover:text-slate-300"} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                </div>
                {activeTab === item.id && <ChevronRight size={14} className="text-emerald-500" />}
              </button>
            ))}
          </aside>

          {/* MAIN CONFIG PANEL */}
          <main className="lg:col-span-9">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0F1424]/40 border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                 <ShieldCheck size={180} className="text-emerald-500" />
              </div>

              {activeTab === "identity" && (
                <div className="space-y-8 relative z-10">
                  <h3 className="text-lg font-black uppercase tracking-widest text-white italic border-l-4 border-emerald-500 pl-4">Core_Parameters</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Field label="Org_Name" value="Quantum Nexus Labs" icon={Building2} />
                    <Field label="Contact_Uplink" value="ops@quantumnexus.tech" icon={Mail} />
                    <Field label="Operational_HQ" value="Neo-Tokyo, JP" icon={Globe} />
                    <Field label="Verification_Level" value="Tier_3 (Encrypted)" icon={CheckCircle2} verified />
                  </div>

                  <div className="pt-8 space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Org_Bio_Directive</label>
                    <textarea
                      className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 text-sm font-medium text-slate-300 focus:border-emerald-500/50 outline-none transition-all resize-none"
                      rows={4}
                      defaultValue="Leading the frontier of decentralized AI distribution and high-performance computing node management."
                    />
                  </div>
                </div>
              )}

              {/* ACTION FOOTER */}
              <div className="mt-12 pt-8 border-t border-white/5 flex justify-end">
                 <button className="bg-emerald-500 text-black px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition-all active:scale-95">
                    Sync_Changes
                 </button>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, icon: Icon, verified }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">{label}</label>
      <div className="relative group">
        <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
        <input
          type="text"
          defaultValue={value}
          className={`w-full bg-black/30 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-xs font-bold text-white focus:border-emerald-500/50 outline-none transition-all ${verified ? "text-emerald-400" : ""}`}
        />
      </div>
    </div>
  );
}