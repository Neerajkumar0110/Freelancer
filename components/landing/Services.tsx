"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Code2,
  Palette,
  Brain,
  Megaphone,
  ShieldCheck,
  Clock,
  ArrowRight,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { MouseEvent } from "react";

/* ================= TYPES & DATA ================= */

const services = [
  {
    icon: Code2,
    title: "Engineering",
    desc: "Frontend, backend, and full-stack developers specialized in Next.js & AI.",
    href: "/services/web",
    color: "from-blue-500/20",
  },
  {
    icon: Palette,
    title: "Product Design",
    desc: "Crafting high-conversion interfaces and premium branding experiences.",
    href: "/services/design",
    color: "from-purple-500/20",
  },
  {
    icon: Brain,
    title: "AI Integration",
    desc: "LLMs, workflow automation, and custom neural search implementation.",
    href: "/services/ai",
    color: "from-indigo-500/20",
  },
  {
    icon: Megaphone,
    title: "Growth Ops",
    desc: "Performance marketing and SEO strategies for high-scale startups.",
    href: "/services/marketing",
    color: "from-emerald-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Vetted Only",
    desc: "Rigorous 5-step screening process ensures only the top 1% join.",
    href: "/how-it-works",
    color: "from-orange-500/20",
  },
  {
    icon: Clock,
    title: "Flash Hiring",
    desc: "Our matching engine delivers qualified candidates in under 24 hours.",
    href: "/hire",
    color: "from-rose-500/20",
  },
];

/* ================= COMPONENT: SERVICE CARD ================= */

function ServiceCard({ service, index }: { service: any; index: number }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative h-full rounded-[32px] border border-white/10 bg-[#020617] p-8 overflow-hidden"
    >
      {/* 1. SPOTLIGHT EFFECT */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(79, 70, 229, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* 2. ICON BLOCK */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} to-transparent border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
          <service.icon size={28} className="text-white" />
        </div>

        {/* 3. CONTENT */}
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
          {service.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
          {service.desc}
        </p>

        {/* 4. INTERACTIVE FOOTER */}
        <Link
          href={service.href}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-400 group-hover:text-white transition-colors"
        >
          Explore expertise <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
    </motion.div>
  );
}

/* ================= MAIN SECTION ================= */

export default function Services() {
  return (
    <section className="relative bg-[#020617] py-24 lg:py-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ===== HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-indigo-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4"
            >
              <Zap size={12} className="fill-indigo-500" />
              Capabilities
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]"
            >
              Elite Infrastructure for <br />
              <span className="text-gray-500">Modern Performance.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
             <Link
                href="/services"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
            >
                View Network <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* ===== BENTO GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* ===== BOTTOM TRUST BAR ===== */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-20 p-8 rounded-[40px] bg-gradient-to-r from-indigo-500/10 via-transparent to-transparent border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-[#020617] bg-gray-800" />
                    ))}
                </div>
                <div className="text-center md:text-left">
                    <p className="text-white font-bold">Trusted by 2,500+ scale-ups</p>
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">Global payment & compliance handled</p>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <span className="text-xl font-black text-white italic tracking-tighter">STRIPE</span>
                <span className="text-xl font-black text-white italic tracking-tighter">AIRBNB</span>
                <span className="text-xl font-black text-white italic tracking-tighter">LINEAR</span>
            </div>
        </motion.div>
      </div>
    </section>
  );
}