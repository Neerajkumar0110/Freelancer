"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign, TrendingUp, Calendar, ArrowUpRight,
  ArrowDownLeft, Download, Filter, Search,
  Wallet, PieChart, CreditCard, Clock,
  Activity, ShieldCheck, Zap, ArrowRight
} from "lucide-react";

/* ================= MOCK DATA ================= */

const EARNINGS_STATS = [
  { label: "Available_Liquidity", value: "$1,840.00", sub: "READY_FOR_WITHDRAWAL", color: "emerald" },
  { label: "Pending_Settlement", value: "$620.50", sub: "ETA: 05_DAYS", color: "amber" },
  { label: "Net_Protocol_Yield", value: "$12,450.00", sub: "LIFETIME_REVENUE", color: "indigo" },
];

const TRANSACTIONS = [
  { id: "TX-901", project: "SaaS Dashboard Redesign", client: "Vercel", date: "FEB 10", amount: 1200.00, status: "Settled", type: "FIXED_NODE" },
  { id: "TX-899", project: "API Integration", client: "Supabase", date: "FEB 08", amount: 450.00, status: "Pending", type: "HOURLY_SYNC" },
  { id: "TX-882", project: "Withdrawal to Bank", client: "Chase Bank", date: "FEB 02", amount: -2500.00, status: "Complete", type: "PAYOUT_EXT" },
];

/* ================= MAIN COMPONENT ================= */

export default function AdvancedEarningsPage() {
  const [activeRange, setActiveRange] = useState("Last 30D");

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER SECTION */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h2 className="text-[10px] font-mono text-indigo-500 tracking-[0.5em] uppercase mb-2">Financial_Core</h2>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Asset<span className="text-indigo-600">.</span>Vault</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/[0.08] transition-all">
              <Download size={14} /> Export_Log
            </button>
            <button className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-white/5">
              <Wallet size={16} /> Withdraw_Funds
            </button>
          </div>
        </header>

        {/* ASSET NODES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EARNINGS_STATS.map((stat, idx) => (
            <AssetNode key={idx} {...stat} index={idx} />
          ))}
        </div>

        {/* REVENUE ANALYTICS */}
        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4 relative z-10">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white flex items-center gap-2">
                <Activity size={16} className="text-indigo-500" /> Yield_Projection
              </h3>
              <p className="text-[10px] font-mono text-slate-500 mt-1">VOLATILITY: LOW // GROWTH: STABLE</p>
            </div>

            <div className="flex gap-1 bg-black/40 p-1 rounded-xl">
              {["Last 7D", "Last 30D", "All Time"].map((range) => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all ${activeRange === range ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="h-48 w-full flex items-end gap-3 px-2 relative z-10">
            {[40, 70, 45, 90, 65, 80, 50, 85, 100, 75, 60, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="flex-1 bg-gradient-to-t from-indigo-500/10 via-indigo-500/40 to-indigo-400 rounded-t-lg hover:brightness-125 transition-all cursor-crosshair group relative"
              >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl">
                  + ${(h * 15.2).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between mt-6 pt-6 border-t border-white/5 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
            <span>Cycle_Start: JAN_26</span>
            <span className="text-indigo-500/50 italic">Live_Feed_Active</span>
            <span>Cycle_End: FEB_26</span>
          </div>
        </div>

        {/* LEDGER STREAM */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Transaction_Ledger</h3>
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500" />
                <input type="text" placeholder="SCAN_TX_ID..." className="pl-11 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-mono tracking-widest focus:outline-none focus:border-indigo-500/40 w-48 sm:w-64" />
              </div>
              <button className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-500"><Filter size={16} /></button>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01]">
                  <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
                  <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Protocol_Description</th>
                  <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Value_Offset</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-indigo-500/[0.02] transition-colors group">
                    <td className="px-8 py-6 text-[10px] font-mono text-slate-500">{tx.date} // 2026</td>
                    <td className="px-8 py-6">
                      <div className="text-[11px] font-black text-white group-hover:text-indigo-400 transition-colors uppercase italic">{tx.project}</div>
                      <div className="text-[9px] font-mono text-slate-600 mt-1 uppercase tracking-tighter">{tx.client} // {tx.type}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${
                        tx.status === 'Settled' || tx.status === 'Complete' ? 'text-emerald-500' : 'text-amber-500'
                      }`}>
                        <div className={`w-1 h-1 rounded-full animate-pulse bg-current`} />
                        {tx.status}
                      </span>
                    </td>
                    <td className={`px-8 py-6 text-right font-mono text-xs font-bold ${tx.amount < 0 ? 'text-rose-500' : 'text-white'}`}>
                      {tx.amount < 0 ? `- $${Math.abs(tx.amount).toFixed(2)}` : `+ $${tx.amount.toFixed(2)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function AssetNode({ label, value, sub, color, index }: any) {
  const themes: any = {
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    indigo: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
  };

  const Icons = [ShieldCheck, Clock, TrendingUp];
  const Icon = Icons[index];

  return (
    <div className="relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 group hover:border-white/20 transition-all overflow-hidden">
      {/* Decorative Glow */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity bg-${color}-500`} />

      <div className="relative z-10 space-y-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${themes[color]}`}>
          <Icon size={22} />
        </div>
        <div>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</p>
          <h2 className="text-3xl font-black text-white mt-1 italic tracking-tighter">{value}</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[8px] font-mono text-slate-600 tracking-tighter uppercase">{sub}</span>
          </div>
        </div>
      </div>
    </div>
  );
}