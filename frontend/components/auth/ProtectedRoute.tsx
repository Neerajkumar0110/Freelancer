"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
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

    // Not logged in
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // Role-based protection
    if (
      allowedRoles &&
      user &&
      !allowedRoles.includes(user.role)
    ) {
      router.replace("/unauthorized");
    }
  }, [loading, isAuthenticated, user, allowedRoles, router]);

  /* =======================
     LOADING STATE
  ======================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  /* =======================
     BLOCK RENDER
  ======================= */
  if (!isAuthenticated) return null;

  if (
    allowedRoles &&
    user &&
    !allowedRoles.includes(user.role)
  ) {
    return null;
  }

  return <>{children}</>;
}
