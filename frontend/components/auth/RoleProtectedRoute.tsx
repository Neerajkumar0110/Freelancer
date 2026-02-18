"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
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

    // 🔒 Not logged in
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // 🚫 Role not allowed
    if (
      user &&
      !allowedRoles.includes(user.role as Role)
    ) {
      router.replace("/unauthorized");
    }
  }, [loading, isAuthenticated, user, allowedRoles, router]);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  // 🚫 Prevent flash before redirect
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
