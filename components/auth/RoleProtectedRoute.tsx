"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert, Loader2, Fingerprint } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Role = "client" | "freelancer";

type Props = {
  children: React.ReactNode;
  allowedRoles: Role[];
};

export default function RoleProtectedRoute({
  children,
  allowedRoles,
}: Props) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // 🔒 Not logged in -> Redirect to Portal
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // 🚫 Role not allowed -> Redirect to Clearance Error
    if (
      user &&
      !allowedRoles.includes(user.role as Role)
    ) {
      router.replace("/unauthorized");
    }
  }, [loading, isAuthenticated, user, allowedRoles, router]);

  /* =======================
      ELITE LOADING STATE
  ======================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Orbital Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute inset-2 border border-white/5 border-b-white/20 rounded-full"
          />
          <Fingerprint className="text-indigo-500/50" size={32} />
        </div>
        <div className="mt-8 text-center space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400">
            Verifying Clearance
          </p>
          <p className="text-gray-600 text-[9px] font-medium uppercase tracking-widest">
            Identity Protocol v2.0.4
          </p>
        </div>
      </div>
    );
  }

  /* =======================
      UNAUTHORIZED MASK
  ======================= */
  // We return null if unauthenticated or unauthorized to prevent layout flashing
  if (!isAuthenticated) return null;

  if (user && !allowedRoles.includes(user.role as Role)) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/[0.02] border border-white/10 rounded-3xl p-10 text-center space-y-6 backdrop-blur-xl"
        >
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 mx-auto shadow-lg shadow-red-500/5">
            <ShieldAlert size={32} />
          </div>

          <div className="space-y-2">
            <h2 className="text-white text-2xl font-black tracking-tighter uppercase">Access Restricted</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              This terminal is reserved for <span className="text-indigo-400 font-bold">{allowedRoles.join(" or ")}</span> accounts. Your current profile does not have sufficient clearance.
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="w-full bg-white text-black hover:bg-indigo-600 hover:text-white transition-all rounded-xl py-3 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            Return to Safety
          </button>
        </motion.div>
      </div>
    );
  }

  /* =======================
      AUTHORIZED RENDER
  ======================= */
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}