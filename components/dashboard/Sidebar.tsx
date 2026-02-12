"use client";

import { useAuth } from "@/context/AuthContext";
import { ClientSidebar } from "./ClientSidebar";
import { FreelancerSidebar } from "./FreelancerSidebar";

export default function AppSidebar() {
  const { user } = useAuth();

  // Return null or a skeleton if user is not loaded yet
  if (!user) return <div className="w-64 bg-[#020617] h-screen border-r border-white/5 animate-pulse" />;

  return user.role === "client" ? <ClientSidebar /> : <FreelancerSidebar />;
}