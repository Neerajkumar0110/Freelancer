"use client";

import {
  Search,
  Wallet,
  Menu,
  Sparkles,
  ChevronDown,
  Command,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "@/components/layout/UserMenu";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function ClientHeader({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  // Updated Nav Items for Client Workflow
  const navItems = [
    { label: "Overview", href: "/dashboard/client" },
    { label: "My Jobs", href: "/dashboard/client/jobs" },
    { label: "Talent", href: "/dashboard/client/talent" },
    { label: "Messages", href: "/dashboard/client/messages" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-[#020617]/40 px-6 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 shadow-[0_0_30px_-15px_rgba(16,185,129,0.2)]">

          {/* LEFT SECTION: Branding & Nav */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <button
                onClick={onMenuClick}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 transition-all hover:bg-white/10 hover:text-white md:hidden"
              >
                <Menu size={20} />
              </button>

              <div className="group cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                  <h1 className="text-lg font-black tracking-tighter text-white uppercase italic">
                    Console
                  </h1>
                </div>
                <p className="text-[10px] font-medium tracking-[0.3em] text-emerald-400/70 uppercase pl-4">
                  Client v2
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                      isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navGlow"
                        className="absolute inset-0 -z-10 rounded-lg bg-emerald-500/10 blur-sm"
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* CENTER: Freelancer Search */}
          <div className="hidden flex-1 px-8 xl:block">
            <div className="relative group mx-auto max-w-md">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 blur transition duration-300 group-focus-within:opacity-100" />
              <div className="relative flex items-center gap-3 rounded-xl bg-[#0F172A]/80 border border-white/5 px-4 py-2.5 transition-all group-focus-within:border-emerald-500/50">
                <Search size={15} className="text-gray-500 group-focus-within:text-emerald-400" />
                <input
                  type="text"
                  placeholder="Find specialized talent..."
                  className="w-full bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none"
                />
                <div className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 border border-white/10">
                  <Command size={10} className="text-gray-500" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase">K</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Actions */}
          <div className="flex items-center gap-4">
            {/* Project Funding / Wallet */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="hidden items-center gap-3 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1.5 pr-4 transition-all hover:border-white/20 sm:flex"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 shadow-lg shadow-emerald-500/20">
                <Wallet size={14} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-tighter text-gray-500">Balance</p>
                <p className="text-xs font-black text-white">$12,840.00</p>
              </div>
              <ChevronDown size={14} className="ml-1 text-gray-600" />
            </motion.div>

            <div className="flex items-center gap-1">
              <div className="mx-2 h-6 w-[1px] bg-white/10" />

              <div className="flex items-center gap-3 pl-2">
                <div className="hidden flex-col items-end sm:flex">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white uppercase tracking-tight">
                      {user?.full_name?.split(" ")[0] || "Client"}
                    </span>
                    <Sparkles size={12} className="text-emerald-400 fill-emerald-400/20" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500/80">Operator</span>
                  </div>
                </div>
                <div className="rounded-full p-0.5 ring-2 ring-emerald-500/20 transition-all hover:ring-emerald-500/50">
                  <UserMenu />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}