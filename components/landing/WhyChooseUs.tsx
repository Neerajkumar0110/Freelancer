"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, LucideIcon, CheckCircle2, Trophy, BarChart3 } from "lucide-react";

/* ================= TYPES ================= */

type Reason = {
  icon: LucideIcon;
  title: string;
  desc: string;
  stat?: string;
};

/* ================= DATA ================= */

const reasons: Reason[] = [
  {
    icon: ShieldCheck,
    title: "Vetting Protocol",
    desc: "Our 5-stage technical screening is designed by ex-FAANG engineers to ensure only the top 1% enter.",
    stat: "1% Acceptance"
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    desc: "Proprietary AI matching bypasses the traditional recruiter bottlenecks, cutting hire time by 85%.",
    stat: "< 24h Match"
  },
  {
    icon: Globe,
    title: "Compliance-First",
    desc: "Global contracts, localized taxes, and intellectual property protection handled automatically.",
    stat: "150+ Countries"
  },
];

/* ================= COMPONENT ================= */

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#020617] overflow-hidden">
      {/* 1. DECORATIVE GRADIENT MESH */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ===== HEADER ===== */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6"
            >
              <Trophy size={14} /> The Platform Edge
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]"
            >
              Engineered for <br />
              <span className="text-gray-500">Uncompromising Quality.</span>
            </motion.h2>
          </div>

          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="hidden lg:block pb-2"
          >
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <BarChart3 className="text-indigo-400" />
                <div>
                    <p className="text-white font-bold text-sm">$450M+</p>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-black">Payments Secured</p>
                </div>
            </div>
          </motion.div>
        </div>

        {/* ===== REASONS GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-[32px] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-indigo-500/30 transition-all duration-500"
            >
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/[0.02] rounded-[32px] transition-colors" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <r.icon size={26} className="text-indigo-400" />
                </div>

                <div className="mb-6">
                    <span className="text-[10px] font-black text-indigo-500/80 uppercase tracking-[0.2em]">{r.stat}</span>
                    <h3 className="text-2xl font-bold text-white tracking-tight mt-1">{r.title}</h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed font-medium mb-8">
                  {r.desc}
                </p>

                <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 size={14} className="text-emerald-500" /> System Verified
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ===== BOTTOM STRIP ===== */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-20 pt-12 border-t border-white/5 flex flex-wrap justify-center md:justify-between items-center gap-8"
        >
            <p className="text-gray-500 text-sm font-medium">
                Protected by military-grade AES-256 encryption & SOC2 Type II compliance.
            </p>
            <div className="flex items-center gap-6 opacity-30">
                <div className="h-6 w-20 bg-gray-500 rounded animate-pulse" /> {/* Placeholder for Security Badge */}
                <div className="h-6 w-20 bg-gray-500 rounded animate-pulse" /> {/* Placeholder for Compliance Badge */}
            </div>
        </motion.div>
      </div>
    </section>
  );
}