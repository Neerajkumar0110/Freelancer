"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid, Compass, FileCheck, MessageCircle, Wallet,
  UserCircle, LogOut, Zap, ChevronLeft, ShieldCheck, Terminal,
  Activity, Orbit
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FreelancerSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  // Desktop starts expanded, mobile drawer will override this via useEffect
  const [isExpanded, setIsExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [uptime, setUptime] = useState("00:00:00");

  // 1. RESPONSIVE AUTO-EXPAND LOGIC
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(true); // Always expand labels on mobile view/drawer
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. UPTIME & MOUNT LOGIC
  useEffect(() => {
    setMounted(true);
    const start = Date.now();
    const timer = setInterval(() => {
      const diff = Math.floor((Date.now() - start) / 1000);
      const h = Math.floor(diff / 3600).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
      const s = (diff % 60).toString().padStart(2, '0');
      setUptime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = useMemo(() => [
    { icon: LayoutGrid, label: "Explore", href: "/dashboard/freelancer", color: "text-indigo-400" },
    { icon: Compass, label: "Jobs", href: "/dashboard/freelancer/jobs", color: "text-cyan-400" },
    { icon: FileCheck, label: "Proposals", href: "/dashboard/freelancer/proposals", color: "text-blue-400" },
    { icon: MessageCircle, label: "Messages", href: "/dashboard/freelancer/messages", color: "text-purple-400" },
    { icon: Wallet, label: "Earning", href: "/dashboard/freelancer/earnings", color: "text-emerald-400" },
    { icon: UserCircle, label: "Profile", href: "/dashboard/freelancer/profile", color: "text-rose-400" },
  ], []);

  if (!mounted) return null;

  // Shared Sidebar UI
  const SidebarContent = (
    <motion.div
      // On mobile, we use a fixed width (280), on desktop we animate between 280 and 88
      animate={{ width: isExpanded ? 280 : 88 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-full bg-[#020617]/80 backdrop-blur-3xl border-r border-white/5 overflow-hidden"
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
      </div>

      {/* HEADER */}
      <div className="h-24 flex items-center px-6 shrink-0 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative h-11 w-11 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center">
            <Orbit size={22} className="text-indigo-400" />
          </div>
          {isExpanded && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-sm font-black text-white tracking-[0.3em] uppercase">Console<span className="text-indigo-500">.</span>os</h1>
              <div className="flex items-center gap-1.5 mt-1 font-mono text-[9px] text-slate-500 tracking-wider">
                <span className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse" />
                SYSTEM_ACTIVE
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* SEARCH / COMMAND */}
      <div className="px-4 mb-6 relative z-10">
        <div className={`group flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] rounded-xl ${isExpanded ? "p-3" : "p-3.5 justify-center"}`}>
          <Terminal size={16} className="text-slate-500" />
          {isExpanded && (
            <input
              type="text"
              placeholder="Execute command..."
              className="bg-transparent text-[10px] font-mono text-slate-300 outline-none w-full placeholder:text-slate-600 uppercase tracking-widest"
            />
          )}
        </div>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 px-3 space-y-1.5 relative z-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={() => window.innerWidth < 768 && onClose()} className="block outline-none">
              <motion.div
                className={`relative flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group
                  ${isActive ? "bg-white/[0.05] border border-white/10 shadow-lg" : "border border-transparent hover:bg-white/[0.02]"}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-laser"
                    className="absolute left-0 w-1 h-5 bg-indigo-500 rounded-r-full shadow-[0_0_15px_#6366f1]"
                  />
                )}
                <item.icon size={18} className={`${isActive ? item.color : "text-slate-500 group-hover:text-slate-300"}`} />
                {isExpanded && (
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>
                    {item.label}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER DATA */}
      <div className="p-4 mt-auto relative z-10">
        <div className={`rounded-2xl bg-black/40 border border-white/5 p-4 ${!isExpanded && "items-center flex flex-col"}`}>
          {isExpanded ? (
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-slate-600 uppercase">Uptime_</span>
                  <p className="text-[10px] font-mono text-indigo-400/80 tracking-widest">{uptime}</p>
                </div>
                <ShieldCheck size={12} className="text-emerald-500/50" />
              </div>
              <button className="flex items-center gap-3 w-full px-4 py-3 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                <LogOut size={14} className="text-rose-500/50" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-500/50">Kill_Session</span>
              </button>
            </div>
          ) : (
            <Activity size={16} className="text-indigo-500/50 animate-pulse" />
          )}
        </div>
      </div>

      {/* DESKTOP COLLAPSE BUTTON */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="hidden md:flex absolute -right-3 top-24 z-50 bg-[#020617] text-slate-500 hover:text-white rounded-full p-1 border border-white/10 shadow-2xl transition-all"
      >
        <ChevronLeft size={12} className={`transition-transform duration-500 ${!isExpanded ? "rotate-180" : ""}`} />
      </button>
    </motion.div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex h-screen sticky top-0 z-50 overflow-visible">
        {SidebarContent}
      </aside>

      {/* MOBILE HUD NAVIGATION */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%]">
        <div className="bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 px-4 shadow-2xl flex items-center justify-between">
            {navItems.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href} className={`p-3 rounded-xl transition-all ${pathname === item.href ? "bg-indigo-500/10 text-indigo-400" : "text-slate-500"}`}>
                <item.icon size={20} />
              </Link>
            ))}
            {/* Toggle for mobile drawer */}
            <button onClick={() => setIsExpanded(true)} className="p-3 text-slate-500">
               <UserCircle size={20} />
            </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
               initial={{ x: "-100%" }}
               animate={{ x: 0 }}
               exit={{ x: "-100%" }}
               transition={{ type: "spring", damping: 25 }}
               className="absolute left-0 top-0 h-full w-[280px]"
            >
              {SidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}