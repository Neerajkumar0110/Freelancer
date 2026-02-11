"use client";

import { Menu, Zap, Bell, Search } from "lucide-react";
import UserMenu from "@/components/layout/UserMenu";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function DashboardHeader({
  onMobileMenu,
}: {
  onMobileMenu?: () => void;
}) {
  const { user } = useAuth();

  const isClient = user?.role === "client";
  const title = isClient ? "Client Terminal" : "Freelancer Console";

  return (
    <header
      className="h-16 flex items-center justify-between
                 px-4 sm:px-8
                 border-b border-white/5
                 bg-[#020617]/80 backdrop-blur-xl
                 sticky top-0 z-40"
    >
      {/* LEFT: Identity & Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenu}
          className="md:hidden p-2 rounded-xl
                     bg-white/5 border border-white/10
                     hover:bg-indigo-500/20 hover:border-indigo-500/40
                     transition-all text-gray-300"
          aria-label="Toggle System Menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <h1 className="text-sm sm:text-lg font-black text-white uppercase tracking-tighter">
            {title}
          </h1>

          {/* Clearance Badge */}
          <div className={`hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest
            ${isClient
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
              : "bg-indigo-500/10 border-indigo-500/20 text-indigo-500"}`}>
            <span className={`w-1 h-1 rounded-full animate-pulse ${isClient ? "bg-emerald-500" : "bg-indigo-500"}`} />
            {user?.role} Mode
          </div>
        </div>
      </div>

      {/* RIGHT: System Actions */}
      <div className="flex items-center gap-2 sm:gap-5">
        {/* Global Search Interface (Cosmetic for now) */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full group focus-within:border-indigo-500/50 transition-all">
          <Search size={14} className="text-gray-500 group-focus-within:text-indigo-400" />
          <input
            type="text"
            placeholder="Search network..."
            className="bg-transparent border-none text-xs text-white focus:outline-none placeholder:text-gray-600 w-32 xl:w-48"
          />
          <kbd className="text-[10px] font-mono text-gray-600 border border-white/10 px-1.5 rounded">⌘K</kbd>
        </div>

        {/* System Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#020617]" />
        </button>

        <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

        {/* User Account Controller */}
        <div className="flex items-center gap-3 pl-2">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-bold text-white leading-none capitalize">{user?.full_name || "Agent"}</span>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter mt-1">Verified User</span>
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}