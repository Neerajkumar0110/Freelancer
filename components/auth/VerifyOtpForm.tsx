"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Loader2, RotateCcw, AlertCircle } from "lucide-react";

export default function VerifyOtpForm() {
  const router = useRouter();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("reset_email");
      if (storedEmail) setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const nextOtp = [...otp];
    pasted.split("").forEach((char, i) => { if (i < 6) nextOtp[i] = char; });
    setOtp(nextOtp);
    const focusIndex = Math.min(pasted.length, 5);
    inputsRef.current[focusIndex]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Authorization requires a complete 6-digit sequence.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/reset-password");
    }, 1500);
  };

  const handleResend = () => {
    if (seconds > 0) return;
    setError(null);
    setResendLoading(true);
    setTimeout(() => {
      setResendLoading(false);
      setSeconds(60);
      setOtp(Array(6).fill(""));
      inputsRef.current[0]?.focus();
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />

        <form
          onSubmit={handleVerify}
          className="relative bg-[#020617] border border-white/10 rounded-3xl p-8 space-y-8 backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto mb-4">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">Two-Factor Auth<span className="text-indigo-500">.</span></h1>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Security sequence dispatched to <br />
              <span className="text-gray-300 font-bold">{email || "primary contact"}</span>
            </p>
          </div>

          {/* OTP Input Grid */}
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <input
                  ref={(el) => { inputsRef.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  disabled={loading || resendLoading}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-11 h-14 sm:w-12 sm:h-16 text-center text-2xl font-black bg-white/5 border border-white/10 rounded-xl text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all disabled:opacity-30"
                />
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl"
              >
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading || otp.join("").length < 6}
            className="group relative w-full bg-white text-black hover:bg-indigo-600 hover:text-white transition-all rounded-2xl py-4 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Validate Sequence"}
          </button>

          {/* Footer & Countdown */}
          <div className="pt-4 border-t border-white/5 text-center">
            {seconds > 0 ? (
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Resend window: <span className="text-white">{seconds}s</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
                className="flex items-center justify-center gap-2 mx-auto text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition disabled:opacity-50"
              >
                {resendLoading ? <Loader2 className="animate-spin" size={14} /> : <><RotateCcw size={14} /> Request New Sync</>}
              </button>
            )}
          </div>
        </form>
      </motion.div>

      <p className="mt-8 text-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">
        End-to-End Encrypted Session
      </p>
    </div>
  );
}