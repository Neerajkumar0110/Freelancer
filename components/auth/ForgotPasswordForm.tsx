"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, KeyRound, Loader2, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import api from "@/lib/api";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* =======================
      SUBMIT (Logic Preserved)
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your registered email");
      return;
    }

    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", { email });

      if (typeof window !== "undefined") {
        sessionStorage.setItem("reset_email", email);
      }

      setMessage(res.data?.message || "Recovery code dispatched to your inbox.");

      setTimeout(() => {
        router.push("/verify-otp");
      }, 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Disptach failed. Please verify your address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        {/* Subtle Halo Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-1000" />

        <form
          onSubmit={handleSubmit}
          className="relative bg-[#020617] border border-white/10 rounded-2xl p-8 space-y-6 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={14} /> Back to Entry
            </button>

            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
              <KeyRound size={24} />
            </div>

            <h1 className="text-3xl font-black text-white tracking-tighter">
              Account Recovery<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              We'll transmit a secure OTP to restore your access.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3 rounded-xl"
              >
                <CheckCircle2 size={14} className="shrink-0" />
                {message}
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl"
              >
                <AlertCircle size={14} className="shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* EMAIL INPUT */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
              Registered Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all disabled:opacity-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full bg-white text-black hover:bg-indigo-600 hover:text-white transition-all rounded-xl py-4 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg flex items-center justify-center gap-2 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                Transmit Code
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Security Breadcrumb */}
      <p className="mt-8 text-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">
        Verified Recovery Protocol
      </p>
    </div>
  );
}