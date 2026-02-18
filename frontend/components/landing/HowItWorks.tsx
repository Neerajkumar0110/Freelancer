"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, UserCheck, Rocket, Briefcase } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const HOW_IT_WORKS = {
  client: {
    title: "Hire in 3 simple steps",
    subtitle: "From posting a job to getting work done — fast and easy.",
    cta: {
      label: "Post a job",
      href: "/hire",
    },
    steps: [
      {
        icon: Search,
        title: "Post your requirement",
        desc: "Tell us what you need — skills, budget, and timeline.",
      },
      {
        icon: UserCheck,
        title: "Get matched instantly",
        desc: "We connect you with verified freelancers that fit your needs.",
      },
      {
        icon: Rocket,
        title: "Start working",
        desc: "Collaborate, manage work, and pay securely on the platform.",
      },
    ],
  },

  freelancer: {
    title: "Get work in 3 simple steps",
    subtitle: "Find jobs, get hired, and start earning quickly.",
    cta: {
      label: "Find jobs",
      href: "/jobs",
    },
    steps: [
      {
        icon: Briefcase,
        title: "Create your profile",
        desc: "Showcase your skills, experience, and portfolio.",
      },
      {
        icon: Search,
        title: "Browse jobs",
        desc: "Find projects that match your expertise and interests.",
      },
      {
        icon: Rocket,
        title: "Get hired & paid",
        desc: "Work with clients and receive secure payments.",
      },
    ],
  },
};

export default function HowItWorks() {
  const { user } = useAuth();

  const role = user?.role === "freelancer" ? "freelancer" : "client";
  const content = HOW_IT_WORKS[role];

  return (
    <section className="bg-[#0B0F19] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ===== Header ===== */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
          >
            {content.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-400"
          >
            {content.subtitle}
          </motion.p>
        </div>

        {/* ===== Steps ===== */}
        <div
          role="list"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {content.steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                role="listitem"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="text-center p-6 sm:p-7 rounded-2xl
                           border border-white/10 bg-[#0F1424]
                           hover:border-indigo-500/40
                           hover:-translate-y-1 hover:shadow-xl
                           transition group"
              >
                {/* Step number */}
                <span className="text-xs font-semibold text-indigo-400">
                  STEP {i + 1}
                </span>

                <div
                  className="w-14 h-14 mx-auto mt-4 rounded-xl
                             bg-indigo-500/10 flex items-center justify-center
                             group-hover:bg-indigo-500/20 transition"
                >
                  <Icon
                    aria-hidden="true"
                    size={26}
                    className="text-indigo-400 group-hover:scale-110 transition"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ===== CTA ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-10 sm:mt-14 flex justify-center"
        >
          <Link
            href={content.cta.href}
            className="inline-flex items-center gap-2
                       px-6 py-3 rounded-xl
                       bg-indigo-600 hover:bg-indigo-700
                       text-white text-sm sm:text-base
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                       transition"
          >
            {content.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
