"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

/* =======================
   TYPES
======================= */
type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

/* =======================
   COMPONENT
======================= */
export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Not logged in -> Redirect to portal entry
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // Role-based protection -> Redirect to unauthorized bridge
    if (
      allowedRoles &&
      user &&
      !allowedRoles.includes(user.role)
    ) {
      router.replace("/unauthorized");
    }
  }, [loading, isAuthenticated, user, allowedRoles, router]);

  /* =======================
     ELITE LOADING STATE
  ======================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-16 h-16 border-t-2 border-r-2 border-indigo-500 rounded-full"
          />
          {/* Inner Static Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-indigo-400/50">
            <ShieldCheck size={24} />
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 animate-pulse">
            Authenticating Session
          </p>
          <div className="flex gap-1 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                className="w-1 h-1 bg-indigo-500 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* =======================
     BLOCK RENDER (Logic Preserved)
  ======================= */
  // Case 1: Session not verified
  if (!isAuthenticated) return null;

  // Case 2: Role mismatch
  if (
    allowedRoles &&
    user &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 mx-auto">
            <Lock size={28} />
          </div>
          <h2 className="text-white font-black uppercase tracking-tighter text-xl">Access Denied</h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            Your current clearance level is insufficient for this terminal.
          </p>
        </div>
      </div>
    );
  }

  // Case 3: Authorized access
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}