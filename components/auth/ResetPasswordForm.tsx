"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, CheckCircle2, AlertCircle, Loader2, ShieldAlert } from "lucide-react";
import api from "@/lib/api";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* =======================
      PASSWORD RULES
  ======================= */
  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const strengthScore = Object.values(rules).filter(Boolean).length;
  const isStrongPassword = strengthScore === 5;

  /* =======================
      LOAD EMAIL (Logic Preserved)
  ======================= */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedEmail = sessionStorage.getItem("reset_email");
    if (!storedEmail) {
      router.replace("/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  /* =======================
      SUBMIT (Logic Preserved)
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isStrongPassword) {
      setError("Security protocol failed: Password strength insufficient.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Verification failed: Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email,
        newPassword: password,
      });

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("reset_email");
      }

      setSuccess("Vault updated. Access restored. Redirecting...");

      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Protocol Error: Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        {/* Decorative Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000" />

        <form
          onSubmit={handleSubmit}
          className="relative bg-[#020617] border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="space-y-2">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">
              Finalize Security<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Establish a new high-security key for <span className="text-gray-300">{email}</span>
            </p>
          </div>

          {/* Feedback Messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl"
              >
                <ShieldAlert size={14} className="shrink-0" /> {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3 rounded-xl"
              >
                <CheckCircle2 size={14} className="shrink-0" /> {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SECURITY STRENGTH METER */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Entropy Level</span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isStrongPassword ? 'text-emerald-500' : 'text-amber-500'}`}>
                {isStrongPassword ? 'Secure' : 'Incomplete'}
              </span>
            </div>
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i < strengthScore
                    ? (strengthScore < 5 ? "bg-amber-500" : "bg-emerald-500")
                    : "bg-white/5"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* INPUTS */}
          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                placeholder="New Access Key"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all disabled:opacity-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                placeholder="Confirm Access Key"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all disabled:opacity-50"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* RULES CHECKLIST */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            {Object.entries({
              "Min 8 Characters": rules.length,
              "Uppercase": rules.uppercase,
              "Lowercase": rules.lowercase,
              "Numerical": rules.number,
              "Special Symbol": rules.special,
            }).map(([label, active]) => (
              <div key={label} className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight transition-colors ${active ? "text-emerald-400" : "text-gray-600"}`}>
                <div className={`w-1 h-1 rounded-full ${active ? "bg-emerald-400" : "bg-gray-800"}`} />
                {label}
              </div>
            ))}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading || !isStrongPassword}
            className="group relative w-full bg-white text-black hover:bg-indigo-600 hover:text-white transition-all rounded-xl py-4 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Synchronize Passkey"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}