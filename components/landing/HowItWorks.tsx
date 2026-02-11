"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Search, UserCheck, Rocket, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRef } from "react";

/* ================= DATA ================= */

const HOW_IT_WORKS = {
  client: {
    title: "Hire Elite Talent",
    subtitle: "From precision matching to secure deployment in three phases.",
    cta: { label: "Launch a Project", href: "/hire" },
    steps: [
      {
        icon: Search,
        title: "Define Your Scope",
        desc: "Outline your technical requirements and timeline. Our AI parses your needs instantly.",
        color: "bg-blue-500",
      },
      {
        icon: UserCheck,
        title: "Neural Matching",
        desc: "Our engine filters the top 1% of verified experts to find your perfect technical match.",
        color: "bg-indigo-500",
      },
      {
        icon: Rocket,
        title: "Secure Onboarding",
        desc: "Start collaborating immediately with integrated payments and IP protection.",
        color: "bg-purple-500",
      },
    ],
  },
  freelancer: {
    title: "Scale Your Career",
    subtitle: "Access high-ticket projects with the world's most innovative companies.",
    cta: { label: "Browse Open Gigs", href: "/jobs" },
    steps: [
      {
        icon: Briefcase,
        title: "Verified Identity",
        desc: "Complete our rigorous vetting process to join the elite tier of global talent.",
        color: "bg-emerald-500",
      },
      {
        icon: Search,
        title: "Direct Access",
        desc: "Skip the bidding wars. Get directly invited to projects that match your stack.",
        color: "bg-cyan-500",
      },
      {
        icon: Rocket,
        title: "Automated Payouts",
        desc: "Focus on the code. Get paid automatically as milestones are reached.",
        color: "bg-blue-500",
      },
    ],
  },
};

/* ================= COMPONENT ================= */

export default function HowItWorks() {
  const { user } = useAuth();
  const containerRef = useRef(null);

  const role = user?.role === "freelancer" ? "freelancer" : "client";
  const content = HOW_IT_WORKS[role];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative bg-[#020617] py-24 lg:py-32 overflow-hidden">
      {/* 1. AMBIENT BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ===== HEADER ===== */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Sparkles size={12} /> The Protocol
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
          >
            {content.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl font-medium"
          >
            {content.subtitle}
          </motion.p>
        </div>

        {/* ===== STEPS GRID WITH CONNECTING LINE ===== */}
        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[45px] left-0 w-full h-[2px] bg-white/5 z-0">
            <motion.div
              style={{ scaleX, transformOrigin: "left" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10">
            {content.steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Step Number Circle */}
                  <div className="relative mb-8 flex justify-center md:justify-start">
                    <div className="w-24 h-24 rounded-3xl bg-[#0F172A] border border-white/10 flex items-center justify-center relative z-10 group-hover:border-indigo-500/50 transition-colors duration-500">
                      <Icon size={32} className="text-white group-hover:scale-110 transition-transform duration-500" />

                      {/* Floating Index Indicator */}
                      <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-2xl ${step.color} text-white flex items-center justify-center font-black shadow-xl border-4 border-[#020617]`}>
                        {i + 1}
                      </div>
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ===== FOOTER CTA ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 lg:mt-32 flex flex-col items-center p-12 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -z-10" />

          <h4 className="text-2xl md:text-3xl font-black text-white mb-8 text-center tracking-tight">
            Ready to experience the future of work?
          </h4>

          <Link
            href={content.cta.href}
            className="group relative px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/20 flex items-center gap-3"
          >
            {content.cta.label}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}