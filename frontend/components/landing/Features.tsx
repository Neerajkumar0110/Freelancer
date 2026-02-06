"use client";

import { motion } from "framer-motion";
import { Briefcase, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Hiring",
    desc: "Post jobs and get proposals instantly.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    desc: "Escrow-based secure transactions.",
  },
  {
    icon: Briefcase,
    title: "Top Talent",
    desc: "Hire verified professionals worldwide.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <f.icon className="h-10 w-10 text-indigo-400" />
            <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-gray-400">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
