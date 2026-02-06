"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-black" />

      {/* Glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-40 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm text-gray-300"
        >
          <span className="text-indigo-400">⚡</span>
          The future of freelancing is autonomous
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight text-white"
        >
          Build Your <br />
          <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            Freelance Empire
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-gray-400"
        >
          Hire elite freelancers or deploy your own AI-powered workforce.
          Scale faster without scaling headcount.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center gap-4"
        >
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition"
          >
            Get Started
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-gray-300 backdrop-blur hover:bg-white/10 transition"
          >
            Watch Demo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
