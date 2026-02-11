"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2, ChevronRight, AlertCircle } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* =======================
      SUBMIT LOGIC (Unchanged)
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const user = res.data.user;
      const role = user.role.toLowerCase();
      const redirectTo = role === "client" ? "/dashboard/client" : "/dashboard/freelancer";
      login(res.data.token, user, redirectTo);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid email or password");
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
        {/* Decorative Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

        <form
          onSubmit={handleSubmit}
          className="relative bg-[#020617] border border-white/10 rounded-2xl p-8 space-y-6 backdrop-blur-xl"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tighter">
              Welcome Back<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Access your global workspace and projects.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl"
              >
                <AlertCircle size={14} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {/* EMAIL INPUT */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                Email Address
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

            {/* PASSWORD INPUT */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Secret Key
                </label>
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-[10px] font-black uppercase tracking-[0.1em] text-indigo-400 hover:text-indigo-300 transition"
                  disabled={loading}
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all disabled:opacity-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full bg-indigo-600 hover:bg-indigo-500 transition-all rounded-xl py-3 text-white text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                Authorize Access
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* FOOTER */}
          <p className="text-center text-xs font-medium text-gray-500">
            New to the network?{" "}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-white font-bold hover:text-indigo-400 underline underline-offset-4 transition"
              disabled={loading}
            >
              Request Membership
            </button>
          </p>
        </form>
      </motion.div>

      {/* Security Disclaimer */}
      <p className="mt-8 text-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">
        Encrypted Session • AES-256 Standard
      </p>
    </div>
  );
}