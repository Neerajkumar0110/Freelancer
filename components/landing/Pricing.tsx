"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Zap, Crown, Building2, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PRICING, Billing, Role } from "@/config/pricing.config";

/* ================= SAFE ANIMATION ================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut" as const, // 🔥 important
    },
  }),
};

export default function Pricing() {
  const { user } = useAuth();
  const role: Role =
    user?.role?.toLowerCase() === "freelancer" ? "freelancer" : "client";

  const [billing, setBilling] = useState<Billing>("monthly");
  const [showCompare, setShowCompare] = useState(false);

  const plans = PRICING[role].plans;

  useEffect(() => {
    if (!showCompare) return;

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowCompare(false);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKey);
    };
  }, [showCompare]);

  const featureMatrix = useMemo(() => {
    const features = new Set<string>();
    plans.forEach((p) => p.features.forEach((f) => features.add(f)));
    return Array.from(features);
  }, [plans]);

  return (
    <section className="relative bg-[#020617] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ===== Header ===== */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
          >
            Scale your{" "}
            <span className="text-gray-500">
              {role === "client" ? "output" : "income"}.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.1}
            className="text-gray-400 text-lg md:text-xl font-medium"
          >
            Transparent plans for {role}s. No hidden fees.
          </motion.p>
        </div>

        {/* ===== Pricing Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => {
            const isEnterprise = plan.name === "Enterprise";
            const planIcon =
              i === 0 ? (
                <Zap size={20} />
              ) : i === 1 ? (
                <Crown size={20} />
              ) : (
                <Building2 size={20} />
              );

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`group relative flex flex-col p-8 lg:p-10 rounded-[32px] border transition-all duration-500
                  ${
                    plan.highlight
                      ? "bg-[#0B0F19] border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.1)] md:scale-105 z-20"
                      : "bg-white/[0.02] border-white/5 hover:border-white/20 z-10"
                  }`}
              >
                <div className="mb-8">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6
                    ${
                      plan.highlight
                        ? "bg-indigo-500 text-white"
                        : "bg-white/5 text-indigo-400"
                    }`}
                  >
                    {planIcon}
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-black text-white tracking-tighter">
                      {plan.price[billing] === null
                        ? "Custom"
                        : `$${plan.price[billing]}`}
                    </span>
                    {plan.price[billing] !== null && (
                      <span className="text-gray-500 font-bold">
                        /{billing === "monthly" ? "mo" : "yr"}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-gray-400 font-medium"
                    >
                      <Check
                        size={18}
                        className="text-indigo-500 shrink-0 mt-0.5"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all
                    ${
                      plan.highlight
                        ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-500/20"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                >
                  {isEnterprise
                    ? "Inquire with Sales"
                    : "Initialize Plan"}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== Modal ===== */}
      <AnimatePresence>
        {showCompare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
