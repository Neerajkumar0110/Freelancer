"use client";

import { useAuth } from "@/context/AuthContext";
import { ClientHeader } from "./ClientHeader";
import { FreelancerHeader } from "./FreelancerHeader";

export default function DashboardHeader() {
  const { user } = useAuth();

  if (user?.role === "client") {
    return <ClientHeader />;
  }

  return <FreelancerHeader />;
}