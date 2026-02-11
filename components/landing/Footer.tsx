"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Linkedin, Github, Twitter, Send, Globe2,
  Command, Sparkles, ArrowUpRight, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PremiumFooter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <footer className="relative bg-[#020617] overflow-hidden border-t border-white/5">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">

        {/* ===== HERO SECTION: BRAND & NEWSLETTER ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
                  <Command size={22} strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter uppercase italic">
                  Freelancer Lab<span className="text-indigo-500 not-italic">.</span>
                </span>
              </Link>
              <p className="mt-8 text-slate-400 text-lg leading-relaxed max-w-sm">
                Engineering the future of work by connecting the top <span className="text-white">1% of global talent</span> with world-class engineering teams.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-10">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "X" },
                { icon: Github, label: "GitHub" }
              ].map((social) => (
                <Link
                  key={social.label}
                  href="#"
                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <social.icon size={16} className="text-slate-400 group-hover:text-white" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                    {social.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Bento Box */}
          <div className="lg:col-span-7">
            <div className="relative group p-1 rounded-[32px] bg-gradient-to-br from-white/10 to-transparent">
              <div className="relative bg-[#0b1120] rounded-[30px] p-8 md:p-10 overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Sparkles size={80} className="text-indigo-500" />
                </div>

                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">Stay ahead of the curve.</h4>
                <p className="text-slate-500 mb-8 max-w-md font-medium">Join 50,000+ founders and engineers receiving our weekly brief on AI, hiring, and tech stack evolution.</p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter work email"
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                  <button
                    type="submit"
                    className="relative overflow-hidden px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all bg-white text-black hover:bg-indigo-500 hover:text-white active:scale-95"
                  >
                    <AnimatePresence mode="wait">
                      {isSubscribed ? (
                        <motion.div
                          key="success"
                          initial={{ y: 20 }} animate={{ y: 0 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 size={16} /> Subscribed
                        </motion.div>
                      ) : (
                        <motion.div
                          key="submit"
                          initial={{ y: -20 }} animate={{ y: 0 }}
                          className="flex items-center gap-2"
                        >
                          Join Brief <Send size={14} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ===== LINK GRID ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 py-20 border-t border-white/5">
          {[
            { title: "Platform", links: ["Talent Cloud", "Vetting Process", "Enterprise", "Pricing"] },
            { title: "Network", links: ["Community", "Referral Program", "Events", "Leaderboard"] },
            { title: "Company", links: ["Our Mission", "Careers", "Newsroom", "Contact"] },
            { title: "Support", links: ["Documentation", "Hiring Guide", "Help Center", "Legal"] }
          ].map((col) => (
            <div key={col.title}>
              <h5 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-8 opacity-50">{col.title}</h5>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="group flex items-center text-slate-500 hover:text-white text-[13px] font-bold transition-all">
                      {link}
                      <ArrowUpRight size={12} className="ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ===== FOOTER BOTTOM ===== */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Reserved
            </span>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_infinite]" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Career Lab Company</span>
              </div>
              <div className="h-4 w-[1px] bg-white/5 hidden md:block" />
              <Link href="#" className="text-slate-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Privacy Policy</Link>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
            <Globe2 size={14} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">English (Global)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}