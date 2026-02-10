"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Brain,
  Megaphone,
  ShieldCheck,
  Clock,
  LucideIcon,
} from "lucide-react";

/* ================= TYPES ================= */

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
};

/* ================= DATA ================= */

const services: Service[] = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Frontend, backend, and full-stack developers for modern web apps.",
    href: "/services/web",
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    desc: "Product designers who craft beautiful, user-friendly experiences.",
    href: "/services/design",
  },
  {
    icon: Brain,
    title: "AI & Automation",
    desc: "Machine learning, chatbots, and workflow automation experts.",
    href: "/services/ai",
  },
  {
    icon: Megaphone,
    title: "Marketing & Growth",
    desc: "SEO, performance marketing, and brand growth specialists.",
    href: "/services/marketing",
  },
  {
    icon: ShieldCheck,
    title: "Verified Talent",
    desc: "All freelancers are vetted for skills, quality, and reliability.",
    href: "/how-it-works",
  },
  {
    icon: Clock,
    title: "Fast Hiring",
    desc: "Hire within hours, not weeks — without long hiring processes.",
    href: "/hire",
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

export default function Services() {
  return (
    <section className="bg-[#0B0F19] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ===== HEADER ===== */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
          >
            Everything you need to hire and get work done
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.1}
            className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-400"
          >
            Browse categories to find the right talent in minutes.
          </motion.p>
        </div>

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.06}
              >
                <Link
                  href={service.href}
                  className="group block h-full p-5 sm:p-6 rounded-2xl
                             border border-white/10 bg-[#0F1424]
                             hover:border-indigo-500/40
                             hover:-translate-y-1 hover:shadow-xl
                             focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                             transition"
                  aria-label={service.title}
                >
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl
                               bg-indigo-500/10 flex items-center justify-center
                               mb-4 group-hover:bg-indigo-500/20 transition"
                  >
                    <Icon
                      aria-hidden="true"
                      size={22}
                      className="text-indigo-400 group-hover:text-indigo-300 transition"
                    />
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-1.5 sm:mt-2 text-sm text-gray-400 leading-relaxed">
                    {service.desc}
                  </p>

                  <span
                    className="mt-3 inline-block text-xs text-indigo-400
                               opacity-0 group-hover:opacity-100
                               group-focus:opacity-100 transition"
                  >
                    Explore →
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* ===== CTA ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0.15}
          className="mt-10 sm:mt-14 flex justify-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2
                       px-6 py-3 rounded-xl text-sm sm:text-base
                       border border-white/15 text-white
                       hover:bg-white/5 hover:border-indigo-500/40
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                       transition"
          >
            View all categories
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
