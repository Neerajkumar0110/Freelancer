"use client";

import React from 'react';
import { motion } from "framer-motion";
import {
  User, Mail, MapPin, Globe, Twitter, Github,
  Linkedin, Award, Code2, Cpu, Zap, Star,
  ExternalLink, Edit3, ShieldCheck, Share2
} from 'lucide-react';

/* ================= MOCK DATA ================= */

const PROFILE_DATA = {
  name: "ALEX_DRAKE",
  role: "SENIOR_NEURAL_ARCHITECT",
  location: "NEO_TOKYO // REMOTE",
  bio: "Specializing in high-frequency React ecosystems and decentralized backend protocols. 8+ years of experience in turning abstract concepts into production-grade hardware/software interfaces.",
  experience: "LVL_42",
  completion: 98,
  skills: [
    { name: "NEXT.JS", level: 95 },
    { name: "TYPESCRIPT", level: 90 },
    { name: "TAILWIND_CSS", level: 100 },
    { name: "RUST", level: 75 },
    { name: "FRAMER_MOTION", level: 85 },
  ],
  achievements: [
    { title: "TOP_RATED_PLUS", icon: ShieldCheck, color: "text-emerald-500" },
    { title: "EARNED_$100K+", icon: Zap, color: "text-indigo-500" },
    { title: "STREAK_365D", icon: Star, color: "text-amber-500" },
  ]
};

/* ================= MAIN COMPONENT ================= */

export default function FreelancerProfilePage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* IDENTITY HEADER */}
        <section className="relative p-1 rounded-[3rem] bg-gradient-to-br from-indigo-500/20 via-transparent to-blue-500/20">
          <div className="bg-[#0F1424]/90 backdrop-blur-xl rounded-[2.8rem] p-8 lg:p-12 border border-white/5">
            <div className="flex flex-col lg:flex-row items-center gap-10">

              {/* AVATAR NODE */}
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-indigo-500/20 flex items-center justify-center p-2 relative z-10">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center overflow-hidden">
                    <User size={60} className="text-white opacity-50" />
                  </div>
                </div>
                {/* EXPERIENCE RING */}
                <svg className="absolute inset-0 w-40 h-40 -rotate-90 pointer-events-none">
                  <circle
                    cx="80" cy="80" r="76"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-indigo-500"
                    strokeDasharray={477}
                    strokeDashoffset={477 * (1 - 0.85)}
                  />
                </svg>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest shadow-lg shadow-indigo-500/40">
                  {PROFILE_DATA.experience}
                </div>
              </div>

              {/* CORE INFO */}
              <div className="flex-1 text-center lg:text-left space-y-4">
                <div className="space-y-1">
                  <h2 className="text-[10px] font-mono text-indigo-500 tracking-[0.5em] uppercase">Identity_Verified</h2>
                  <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase">{PROFILE_DATA.name}</h1>
                  <p className="text-lg font-mono text-slate-500">{PROFILE_DATA.role}</p>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><MapPin size={14} className="text-indigo-500" /> {PROFILE_DATA.location}</span>
                  <span className="flex items-center gap-2"><Mail size={14} className="text-indigo-500" /> CONTACT@ALEX_D.OS</span>
                </div>

                <div className="flex justify-center lg:justify-start gap-3 pt-4">
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all">
                    <Edit3 size={14} /> Update_Profile
                  </button>
                  <button className="p-2.5 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.08] transition-all">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* STATS BENTO */}
              <div className="grid grid-cols-2 gap-4 w-full lg:w-72">
                 <StatBox label="Success" value="98%" />
                 <StatBox label="Projects" value="142" />
                 <StatBox label="Earned" value="$120K" />
                 <StatBox label="Rating" value="5.0" />
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: CAPABILITY MATRIX */}
          <main className="lg:col-span-8 space-y-8">
            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Capability_Matrix</h3>
              <div className="space-y-6">
                {PROFILE_DATA.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-widest">
                      <span className="text-slate-400">{skill.name}</span>
                      <span className="text-indigo-400">{skill.level}%_GRADE</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        className="h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BIO TERMINAL */}
            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden">
              <div className="absolute top-4 right-6 text-[10px] font-mono text-slate-800 tracking-tighter uppercase pointer-events-none select-none">
                BIO_PROTOCOL_V.4.0
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-6">Subject_Abstract</h3>
              <div className="p-6 bg-black/40 rounded-2xl border border-white/5 font-mono text-sm leading-relaxed text-indigo-100/70">
                <span className="text-indigo-500 mr-2">{'>'}</span> {PROFILE_DATA.bio}
                <span className="inline-block w-2 h-4 bg-indigo-500 ml-2 animate-pulse align-middle" />
              </div>
            </div>
          </main>

          {/* RIGHT: ACHIEVEMENTS & LINKS */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">System_Achievements</h3>
              <div className="space-y-4">
                {PROFILE_DATA.achievements.map((item) => (
                  <div key={item.title} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-indigo-500/30 transition-all cursor-default">
                    <item.icon className={item.color} size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">External_Nodes</h3>
              <div className="grid grid-cols-2 gap-3">
                 <SocialLink icon={Github} label="Github" />
                 <SocialLink icon={Linkedin} label="LinkedIn" />
                 <SocialLink icon={Twitter} label="Twitter" />
                 <SocialLink icon={Globe} label="Portfolio" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
      <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block mb-1">{label}</span>
      <span className="text-xl font-black text-white italic tracking-tighter">{value}</span>
    </div>
  );
}

function SocialLink({ icon: Icon, label }: any) {
  return (
    <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all gap-2 group">
      <Icon size={18} className="text-slate-500 group-hover:text-indigo-400" />
      <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 group-hover:text-white">{label}</span>
    </button>
  );
}