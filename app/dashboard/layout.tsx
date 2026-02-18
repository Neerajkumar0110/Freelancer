"use client";

"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ClientSidebar from "@/components/dashboard/ClientSidebar";
import FreelancerSidebar from "@/components/dashboard/FreelancerSidebar";
import { ClientHeader } from "@/components/dashboard/ClientHeader";
import { FreelancerHeader } from "@/components/dashboard/FreelancerHeader";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#020617]">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  const isClient = user?.role === "client";

  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden">

      {/* SIDEBAR (Desktop + Mobile Controlled) */}
      {isClient ? (
        <ClientSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      ) : (
        <FreelancerSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* HEADER */}
        {isClient ? (
          <ClientHeader
            onMenuClick={() => setIsSidebarOpen(true)}
          />
        ) : (
          <FreelancerHeader
            onMenuClick={() => setIsSidebarOpen(true)}
          />
        )}

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto bg-[#0B0F19]">
          {children}
        </main>
      </div>
    </div>
  );
}
