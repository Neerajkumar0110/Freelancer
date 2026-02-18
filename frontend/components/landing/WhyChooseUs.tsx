"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, LucideIcon } from "lucide-react";

/* ================= TYPES ================= */

type Reason = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

/* ================= DATA ================= */

const reasons: Reason[] = [
  {
    icon: ShieldCheck,
    title: "Verified professionals",
    desc: "Every freelancer is vetted for skills, quality, and reliability.",
  },
  {
    icon: Zap,
    title: "Fast hiring",
    desc: "Skip long hiring cycles and start working immediately.",
  },
  {
    icon: Globe,
    title: "Global talent",
    desc: "Access top freelancers from around the world, anytime.",
  },
];

/* ================= ANIMATION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

/* ================= COMPONENT ================= */

export default function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-24 bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-6">
        {/* ===== HEADER ===== */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
          >
            Why choose our platform
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.1}
            className="mt-3 text-sm sm:text-base text-gray-400"
          >
            Built to help you hire faster, work smarter, and scale globally.
          </motion.p>
        </div>

        {/* ===== REASONS GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {reasons.map((r, i) => {
            const Icon = r.icon;

            return (
              <motion.article
                key={r.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.08}
                className="p-6 rounded-2xl border border-white/10 bg-[#0F1424]
                           hover:border-indigo-500/40 hover:-translate-y-1
                           hover:shadow-xl transition"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-indigo-500/10
                             flex items-center justify-center mb-4"
                >
                  <Icon
                    aria-hidden="true"
                    size={24}
                    className="text-indigo-400"
                  />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {r.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {r.desc}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
