"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Lock, ShieldCheck,
  Briefcase, UserCircle, CheckCircle2,
  XCircle, Loader2, ChevronRight
} from "lucide-react";
import api from "@/lib/api";

export default function SignupForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
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
      SUBMIT (Backend Logic Untouched)
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isStrongPassword) {
      return setError("Security protocol not met: Password is too weak.");
    }

    if (password !== confirmPassword) {
      return setError("Verification failed: Passwords do not match.");
    }

    setLoading(true);
    try {
      await api.post("/auth/signup", {
        full_name: fullName,
        email,
        password,
        role,
      });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Protocol Error: Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000" />

        <form
          onSubmit={handleSubmit}
          className="relative bg-[#020617] border border-white/10 rounded-3xl p-8 lg:p-10 space-y-6 backdrop-blur-xl"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tighter">
              Create Identity<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium">Join the global network of elite professionals.</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl"
              >
                <XCircle size={14} /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ROLE SELECTOR TOGGLE */}
          <div className="p-1 bg-white/5 border border-white/10 rounded-2xl flex gap-1">
            {["client", "freelancer"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all
                  ${role === r ? "bg-indigo-600 text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
              >
                {r === "client" ? <Briefcase size={14} /> : <UserCircle size={14} />}
                {r}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="email"
                  placeholder="john@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* PASSWORD SECURITY BLOCK */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Security Key</label>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`h-1 w-6 rounded-full transition-colors ${i < strengthScore ? (strengthScore < 5 ? "bg-amber-500" : "bg-emerald-500") : "bg-white/10"}`} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="password"
                  placeholder="Verify"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PASSWORD STRENGTH CHECKLIST (Compact) */}
            <div className="grid grid-cols-2 gap-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              {Object.entries({
                "8+ Chars": rules.length,
                "Upper": rules.uppercase,
                "Lower": rules.lowercase,
                "Number": rules.number,
                "Special": rules.special,
              }).map(([label, active]) => (
                <div key={label} className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter transition-colors ${active ? "text-emerald-400" : "text-gray-600"}`}>
                  <CheckCircle2 size={12} className={active ? "opacity-100" : "opacity-20"} /> {label}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !isStrongPassword}
            className="group relative w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 transition-all rounded-2xl py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white flex items-center justify-center gap-2 overflow-hidden shadow-xl shadow-indigo-500/10"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                Initialize Account <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-xs font-medium text-gray-500">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-white font-bold hover:text-indigo-400 underline underline-offset-4 transition"
            >
              Access Portal
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
}