"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { useRef } from "react";

/* ================= ANIMATION VARIANTS ================= */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function PremiumHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects for depth
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] pt-20"
    >
      {/* 1. ADVANCED BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px]" />

        {/* Animated Grid Mesh */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ y: y1, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center"
      >
        {/* 2. FLOATING TOP BADGE */}
        <motion.div
          variants={itemVariants}
          className="group relative inline-flex items-center gap-3 px-4 py-2 mb-10
                     rounded-full border border-white/10 bg-white/5 backdrop-blur-md
                     hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-500 cursor-default"
        >
          <div className="flex -space-x-3 group-hover:-space-x-1 transition-all duration-500">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative w-8 h-8 rounded-full border-2 border-[#020617] overflow-hidden">
                <Image
                  src={`https://i.pravatar.cc/150?u=${i + 10}`}
                  alt="Talent profile"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] ml-2">
            Elite Talent Network
          </span>
          <div className="h-4 w-px bg-white/20 mx-1" />
          <span className="text-xs font-medium text-gray-400">
            Top 1% Global Vetted
          </span>
        </motion.div>

        {/* 3. DYNAMIC HEADING WITH TEXT MASK */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05]"
        >
          Build Faster with <br />
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              Autonomous Talent
            </span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-2 left-0 h-3 bg-indigo-600/30 -z-10 rounded-full"
            />
          </span>
        </motion.h1>

        {/* 4. SUBTEXT */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed mb-12 font-medium"
        >
          Skip the recruitment cycle. Instantly deploy top-tier developers, designers,
          and AI architects through our <span className="text-white">AI-matching neural engine.</span>
        </motion.p>

        {/* 5. MAGNETIC CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center mb-24"
        >
          <Link
            href="/hire"
            className="group relative px-8 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest
                       overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Hiring <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            href="/freelancers"
            className="group px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
                       text-gray-300 font-black text-sm uppercase tracking-widest hover:text-white
                       hover:border-white/20 transition-all active:scale-95"
          >
            Find High-End Gigs
          </Link>
        </motion.div>

        {/* 6. ADVANCED BENTO STATS container */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-1 p-2 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-2xl"
        >
          <StatCard
            icon={<ShieldCheck className="text-indigo-400" size={20} />}
            value="100% Vetted"
            label="Technical proficiency guaranteed"
          />
          <StatCard
            icon={<Zap className="text-yellow-400" size={20} />}
            value="24h Match"
            label="Average time to first interview"
          />
          <StatCard
            icon={<Globe className="text-blue-400" size={20} />}
            value="$450M+"
            label="Volume processed globally"
          />
        </motion.div>
      </motion.div>

      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#020617] to-transparent z-20" />
    </section>
  );
}

/* ================= COMPONENT: STAT CARD ================= */

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="px-10 py-8 flex flex-col items-center md:items-start text-center md:text-left hover:bg-white/5 transition-colors rounded-[24px]">
      <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
        {icon}
      </div>
      <p className="text-3xl font-black text-white tracking-tight mb-1">{value}</p>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</p>
    </div>
  );
}