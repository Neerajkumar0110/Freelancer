"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import FloatingProfiles from "@/components/landing/FloatingProfiles";

/* ================= ANIMATION VARIANTS ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] pt-16 pb-20">
      {/* Background layers */}
      <AnimatedBackground />
      <FloatingProfiles />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* ================= BADGE ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-3 px-4 py-2 mb-12
                     rounded-full border border-white/15
                     text-sm text-gray-300"
        >
          {/* Avatars */}
          <div className="flex -space-x-2">
            {[
              "/profiles/dev1.jpg",
              "/profiles/designer1.jpg",
              "/profiles/ai1.jpg",
            ].map((src, i) => (
              <Image
                key={i}
                src={src}
                alt="Freelancer profile"
                width={24}
                height={24}
                className="rounded-full border border-[#0B0F19] object-cover"
              />
            ))}
          </div>

          <span className="h-4 w-px bg-white/20" />

          <span className="text-gray-200 tracking-wide whitespace-nowrap">
            The future of freelancing is autonomous
          </span>

          <span
            aria-hidden
            className="inline-flex h-2.5 w-2.5 rounded-full bg-indigo-500
                       animate-[pulse_3s_ease-in-out_infinite]"
          />
        </motion.div>

        {/* ================= HEADING ================= */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white"
        >
          Hire & Work with
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Top Freelancers
          </span>
        </motion.h1>

        {/* ================= SUBTEXT ================= */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="mt-6 max-w-2xl mx-auto text-gray-400 text-base md:text-lg"
        >
          Find verified talent, manage projects seamlessly, and get work done
          faster — without hiring friction.
        </motion.p>

        {/* ================= CTAs ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/hire"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3
                       rounded-xl text-white font-medium transition"
          >
            Hire Freelancers →
          </Link>
          <Link
            href="/freelancers"
            className="px-6 py-3 rounded-xl border border-white/10
                       text-gray-300 hover:bg-white/5 transition"
          >
            Find Work
          </Link>
        </motion.div>

        {/* ================= STATS ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.45}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          <Stat value="10K+" label="Verified Freelancers" />
          <Stat value="95%" label="Client Satisfaction" />
          <Stat value="2× Faster" label="Hiring Speed" />
        </motion.div>
      </div>
    </section>
  );
}

/* ================= STAT ================= */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
}
