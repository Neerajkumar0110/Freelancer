"use client";

import { Menu } from "lucide-react";
import UserMenu from "@/components/layout/UserMenu";
import { useAuth } from "@/context/AuthContext";

export default function DashboardHeader({
  onMobileMenu,
}: {
  onMobileMenu?: () => void;
}) {
  const { user } = useAuth();

  const title =
    user?.role === "client"
      ? "Client Dashboard"
      : "Freelancer Dashboard";

  return (
    <header
      className="h-16 flex items-center justify-between
                 px-4 sm:px-6
                 border-b border-white/10
                 bg-[#0B0F19]/90 backdrop-blur
                 sticky top-0 z-40"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenu}
          className="md:hidden p-2 rounded-lg
                     hover:bg-white/10 transition text-gray-300"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-white">
          {title}
        </h1>
      </div>

      {/* RIGHT */}
      <UserMenu />
    </header>
  );
}
