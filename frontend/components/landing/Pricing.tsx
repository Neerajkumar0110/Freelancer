"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PRICING, Billing, Role } from "@/config/pricing.config";

/* ================= ANIMATION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

/* ================= COMPONENT ================= */

export default function Pricing() {
  const { user } = useAuth();

  const role: Role =
    user?.role?.toLowerCase() === "freelancer" ? "freelancer" : "client";

  const [billing, setBilling] = useState<Billing>("monthly");
  const [showCompare, setShowCompare] = useState(false);

  const plans = PRICING[role].plans;

  /* Lock background scroll when modal is open */
  useEffect(() => {
    if (!showCompare) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [showCompare]);

  /* Close modal on ESC */
  useEffect(() => {
    if (!showCompare) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowCompare(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showCompare]);

  /* Build a normalized feature matrix for comparison */
  const featureMatrix = useMemo(() => {
    const features = new Set<string>();
    plans.forEach((p) => p.features.forEach((f) => features.add(f)));
    return Array.from(features);
  }, [plans]);

  return (
    <section className="bg-[#0F1424] pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ===== Header ===== */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
          >
            Flexible pricing for {role === "client" ? "hiring" : "freelancers"}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.1}
            className="mt-3 text-sm sm:text-base text-gray-400"
          >
            Pay only for what you need. Scale anytime.
          </motion.p>
        </div>

        {/* ===== Billing Toggle ===== */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div
            role="tablist"
            aria-label="Billing period"
            className="flex bg-[#0B0F19] border border-white/10 rounded-full p-1"
          >
            {(["monthly", "yearly"] as Billing[]).map((b) => (
              <button
                key={b}
                role="tab"
                aria-selected={billing === b}
                onClick={() => setBilling(b)}
                className={`px-4 py-1.5 text-sm rounded-full transition focus:outline-none
                  ${
                    billing === b
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
              >
                {b === "monthly" ? "Monthly" : "Yearly (save 20%)"}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCompare(true)}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition"
          >
            Compare all features →
          </button>
        </div>

        {/* ===== Pricing Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i * 0.08}
              className={`relative p-6 sm:p-8 rounded-2xl border bg-[#0B0F19] transition
                ${
                  plan.highlight
                    ? "border-indigo-500 shadow-xl scale-[1.03]"
                    : "border-white/10 hover:border-indigo-500/30"
                }`}
            >
              {plan.highlight && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2
                             bg-indigo-600 text-white text-xs
                             px-3 py-1 rounded-full"
                >
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>

              <p className="mt-4 text-3xl font-bold text-indigo-400">
                {plan.price[billing] === null ? "Custom" : `$${plan.price[billing]}`}
                {plan.price[billing] !== null && (
                  <span className="text-sm text-gray-400">
                    /{billing === "monthly" ? "mo" : "yr"}
                  </span>
                )}
              </p>

              <p className="mt-2 text-sm text-gray-400">
                {typeof plan.credits === "number"
                  ? `${plan.credits} credits / month`
                  : "Custom credits"}
              </p>

              {plan.name === "Enterprise" && (
                <p className="mt-2 text-sm text-gray-400">
                  Custom pricing for large teams & organizations
                </p>
              )}

              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check size={16} className="text-indigo-400 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full py-2.5 rounded-lg text-sm font-medium transition
                  ${
                    plan.highlight
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : plan.name === "Enterprise"
                      ? "border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
                      : "border border-white/15 text-white hover:bg-white/5"
                  }`}
              >
                {plan.name === "Enterprise" ? "Contact sales" : "Get started"}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-xs sm:text-sm text-gray-500 text-center">
          Credits are used for job posts, proposals, and premium actions.
          Additional credits can be purchased anytime.
        </p>
      </div>

      {/* ===== Feature Comparison Modal ===== */}
      <AnimatePresence>
        {showCompare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0B0F19] w-full max-w-4xl rounded-2xl
                         border border-white/10 p-6 relative"
            >
              <button
                onClick={() => setShowCompare(false)}
                aria-label="Close comparison"
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X />
              </button>

              <h3 className="text-xl font-semibold text-white mb-6">
                Feature comparison
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-400">
                  <thead>
                    <tr>
                      <th className="text-left py-3">Feature</th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="py-3 text-white text-center">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {featureMatrix.map((feature) => (
                      <tr key={feature} className="border-t border-white/10">
                        <td className="py-3">{feature}</td>
                        {plans.map((plan) => (
                          <td key={plan.name} className="text-center">
                            {plan.features.includes(feature) ? "✔" : "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
