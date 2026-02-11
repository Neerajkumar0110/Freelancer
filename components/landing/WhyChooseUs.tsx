"use client";

import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Zap, Globe, LucideIcon,
  CheckCircle2, Fingerprint, Cpu, Activity,
  Lock, Terminal, Radio, ChevronRight
} from "lucide-react";
import { useState, useEffect, MouseEvent } from "react";

/* ================= STATIC DATA ================= */

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Vetting Protocol",
    desc: "Multi-layered technical assessment designed by ex-FAANG architects.",
    stat: "TOP 1%",
    detail: "Technical + IQ + Culture",
  },
  {
    icon: Zap,
    title: "Neural Matching",
    desc: "Proprietary engine predicts candidate success via historic performance data.",
    stat: "85% FASTER",
    detail: "Predictive Analytics",
  },
  {
    icon: Globe,
    title: "Global Payroll",
    desc: "Automated localized taxes, withholding, and IP assignment globally.",
    stat: "150+ COUNTRIES",
    detail: "Zero-Liability",
  },
  {
    icon: Cpu,
    title: "Dev Infrastructure",
    desc: "Pre-configured cloud environments for immediate project onboarding.",
    stat: "Oms LATENCY",
    detail: "Standardized Stacks",
  }
];

/* ================= MAIN COMPONENT ================= */

export default function AdvancedCyberneticSection() {
  return (
    <section className="relative py-24 lg:py-40 bg-[#020617] overflow-hidden selection:bg-indigo-500/30">
      {/* BACKGROUND ARCHITECTURE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER BLOCK */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 mb-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-12 bg-indigo-500/50" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em]">System Architecture</span>
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.8] mb-8">
              PREDICTIVE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-700">INFRASTRUCTURE.</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
              Bypass traditional recruitment bottlenecks with a self-optimizing talent ecosystem.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <StatPill icon={Activity} label="Matching" value="180ms" />
            <StatPill icon={Lock} label="Compliance" value="SOC2" />
          </div>
        </div>

        {/* MAIN INTERACTIVE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* TERMINAL / LOGS COLUMN */}
          <div className="lg:col-span-4 h-full">
            <div className="sticky top-8 space-y-6">
              <TerminalFeed />
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm group">
                <Radio className="text-indigo-500 mb-6 group-hover:animate-pulse" size={24} />
                <h4 className="text-white font-bold text-lg mb-2">Network Status</h4>
                <div className="space-y-3">
                  <StatusLine label="Global Nodes" value="Active" color="emerald" />
                  <StatusLine label="Encryption" value="AES-256" color="indigo" />
                  <StatusLine label="Vetting Queue" value="Low Latency" color="indigo" />
                </div>
              </div>
            </div>
          </div>

          {/* CARDS GRID COLUMN */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {REASONS.map((r, i) => (
              <InteractiveCard key={r.title} reason={r} index={i} />
            ))}

            {/* LARGE CTA BUTTON */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="md:col-span-2 relative group overflow-hidden rounded-[2.5rem] bg-indigo-600 p-12 flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_5s_infinite] pointer-events-none" />
              <div className="relative z-10 text-left">
                <h3 className="text-3xl font-black text-white mb-2">Initialize Deployment</h3>
                <p className="text-indigo-200 font-medium">Access the top 1% of global engineering talent instantly.</p>
              </div>
              <div className="relative z-10 w-16 h-16 rounded-full bg-white flex items-center justify-center text-indigo-600 transition-transform group-hover:rotate-[-45deg]">
                <ChevronRight size={32} strokeWidth={3} />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= SUB-COMPONENTS ================= */

function TerminalFeed() {
  const [logs, setLogs] = useState<string[]>([
    "SYS: Syncing node_london_01",
    "SYS: Identity verified via biometric hash",
    "MATCH: Dev #9283 linked to Project: Phoenix"
  ]);

  useEffect(() => {
    const rawLogs = [
      "VETTING: Code challenge score: 99.4%",
      "NODE: Singapore shard encrypted",
      "COMPLIANCE: IP transfer signed",
      "MATCH: Rust Expert → FinTech Neo",
      "SYS: Pipeline optimized (+12ms)",
      "VETTING: Cognitive load test: PASS"
    ];

    const interval = setInterval(() => {
      setLogs(prev => [rawLogs[Math.floor(Math.random() * rawLogs.length)], ...prev].slice(0, 6));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#050b1d] rounded-[2rem] border border-white/5 p-6 font-mono text-[11px] h-[280px] flex flex-col shadow-2xl">
      <div className="flex items-center gap-2 mb-6 text-gray-600">
        <Terminal size={14} />
        <span className="uppercase tracking-[0.2em] font-bold">Encrypted_Log_Stream</span>
      </div>
      <div className="flex-1 space-y-4">
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.div
              key={log + i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1 - i * 0.15, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex gap-3"
            >
              <span className="text-indigo-500/50 select-none">❯</span>
              <span className="text-gray-400 leading-tight italic">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InteractiveCard({ reason, index }: { reason: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative h-full bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 transition-all hover:bg-white/[0.04]"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(79, 70, 229, 0.1), transparent 80%)
          `,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-10">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <reason.icon size={26} />
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black text-indigo-500 tracking-widest">{reason.stat}</div>
            <div className="text-[9px] font-bold text-gray-600 uppercase mt-1">{reason.detail}</div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-indigo-400 transition-colors">
          {reason.title}
        </h3>
        <p className="text-gray-500 text-sm font-medium leading-relaxed mb-10">
          {reason.desc}
        </p>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full bg-gray-800 border-2 border-[#020617]" />
            ))}
          </div>
          <CheckCircle2 size={16} className="text-indigo-500/30 group-hover:text-emerald-500 transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

function StatPill({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
      <Icon size={18} className="text-indigo-400" />
      <div>
        <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">{label}</div>
        <div className="text-lg font-black text-white leading-none">{value}</div>
      </div>
    </div>
  );
}

function StatusLine({ label, value, color }: { label: string; value: string; color: string }) {
  const colorMap: any = { emerald: "bg-emerald-500", indigo: "bg-indigo-500" };
  const textMap: any = { emerald: "text-emerald-500", indigo: "text-indigo-500" };

  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-medium text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${colorMap[color]}`} />
        <span className={`text-[11px] font-black uppercase tracking-widest ${textMap[color]}`}>{value}</span>
      </div>
    </div>
  );
}