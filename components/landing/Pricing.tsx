"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Zap, Crown, Building2, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PRICING, Billing, Role } from "@/config/pricing.config";

/* ================= ANIMATION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

/* ================= COMPONENT ================= */

export default function Pricing() {
  const { user } = useAuth();
  const role: Role = user?.role?.toLowerCase() === "freelancer" ? "freelancer" : "client";

  const [billing, setBilling] = useState<Billing>("monthly");
  const [showCompare, setShowCompare] = useState(false);

  const plans = PRICING[role].plans;

  useEffect(() => {
    if (!showCompare) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowCompare(false);
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
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ===== Header ===== */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            Pricing Architecture
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
          >
            Scale your <span className="text-gray-500">{role === "client" ? "output" : "income"}.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={0.1}
            className="text-gray-400 text-lg md:text-xl font-medium"
          >
            Transparent plans for {role}s. No hidden fees.
          </motion.p>
        </div>

        {/* ===== Billing Toggle ===== */}
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-md">
            {(["monthly", "yearly"] as Billing[]).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`relative px-8 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all
                  ${billing === b ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-gray-500 hover:text-white"}`}
              >
                {b}
                {b === "yearly" && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500 text-[8px] text-white rounded-full shadow-lg">
                    -20%
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCompare(true)}
            className="group flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-indigo-400 transition-colors"
          >
            Analyze Feature Matrix
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ===== Pricing Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => {
            const isEnterprise = plan.name === "Enterprise";
            const planIcon = i === 0 ? <Zap size={20}/> : i === 1 ? <Crown size={20}/> : <Building2 size={20}/>;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`group relative flex flex-col p-8 lg:p-10 rounded-[32px] border transition-all duration-500
                  ${plan.highlight
                    ? "bg-[#0B0F19] border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.1)] md:scale-105 z-20"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20 z-10"}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-[10px] font-black uppercase tracking-widest text-white rounded-full">
                    Preferred Choice
                  </div>
                )}

                <div className="mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6
                    ${plan.highlight ? "bg-indigo-500 text-white" : "bg-white/5 text-indigo-400"}`}>
                    {planIcon}
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">{plan.name}</h3>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-black text-white tracking-tighter">
                      {plan.price[billing] === null ? "Custom" : `$${plan.price[billing]}`}
                    </span>
                    {plan.price[billing] !== null && (
                      <span className="text-gray-500 font-bold">/{billing === "monthly" ? "mo" : "yr"}</span>
                    )}
                  </div>
                  <p className="mt-4 text-sm text-gray-400 font-medium">
                    {typeof plan.credits === "number" ? `${plan.credits} usage credits included` : "Unrestricted resource access"}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-400 font-medium">
                      <Check size={18} className="text-indigo-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all
                    ${plan.highlight
                      ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-500/20"
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10"}`}
                >
                  {isEnterprise ? "Inquire with Sales" : "Initialize Plan"}
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center text-xs font-bold text-gray-600 uppercase tracking-widest"
        >
          Secure Checkout via Stripe • Cancel Anytime • Enterprise SLA Available
        </motion.p>
      </div>

      {/* ===== Feature Comparison Modal ===== */}
      <AnimatePresence>
        {showCompare && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCompare(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-[#0B0F19] rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h3 className="text-2xl font-black text-white tracking-tight">Technical Specification</h3>
                <button onClick={() => setShowCompare(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors">
                  <X />
                </button>
              </div>

              <div className="overflow-auto p-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs font-black text-gray-500 uppercase tracking-widest">
                      <th className="pb-6 pr-4">Feature Layer</th>
                      {plans.map((p) => (
                        <th key={p.name} className={`pb-6 px-4 text-center ${p.highlight ? "text-indigo-400" : "text-white"}`}>
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {featureMatrix.map((feature) => (
                      <tr key={feature} className="border-t border-white/5 group hover:bg-white/[0.02] transition-colors">
                        <td className="py-5 pr-4 text-gray-300 font-medium">{feature}</td>
                        {plans.map((plan) => (
                          <td key={plan.name} className="py-5 px-4 text-center">
                            {plan.features.includes(feature) ? (
                              <Check size={18} className="mx-auto text-indigo-500" />
                            ) : (
                              <span className="text-gray-800">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}