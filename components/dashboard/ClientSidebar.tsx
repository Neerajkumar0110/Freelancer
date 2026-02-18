"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  CreditCard,
  Settings,
  BarChart3,
  Cpu,
  Terminal,
  ChevronLeft,
  ShieldCheck,
  Activity,
  Power
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientSidebar({ isOpen, onClose }: SidebarProps) {

  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [uptime, setUptime] = useState("00:00:00");

  // 1. UPTIME LOGIC
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

  const menuItems = useMemo(() => [
    { icon: LayoutDashboard, label: "HOME", href: "/dashboard/client" },
    { icon: Briefcase, label: "POST A JOB", href: "/dashboard/client/jobs" },
    { icon: Users, label: "TALENT", href: "/dashboard/client/freelancers" },
    { icon: MessageSquare, label: "MESSAGES", href: "/dashboard/client/messages", badge: "03" },
    { icon: BarChart3, label: "PROPOSALS", href: "/dashboard/client/proposals" },
    { icon: CreditCard, label: "Profile", href: "/dashboard/client/profile" },
  ], []);

  if (!mounted) return null;

  const SidebarContent = (
    <motion.div
      animate={{ width: isExpanded ? 288 : 88 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-full bg-[#020617]/95 backdrop-blur-3xl border-r border-white/5 overflow-hidden"
    >
      {/* BACKGROUND DECOR */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-emerald-500/10 blur-[80px]" />
      </div>

      {/* HEADER: SYSTEM IDENTITY */}
      <div className="h-24 flex items-center px-6 shrink-0 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-11 h-11 bg-black border border-emerald-500/30 rounded-xl flex items-center justify-center group-hover:border-emerald-500 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <Terminal className="text-emerald-500" size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#020617] animate-pulse" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <h1 className="text-sm font-black text-white tracking-[0.3em] uppercase italic">
                  Hire<span className="text-emerald-500">.</span>os
                </h1>
                <div className="flex items-center gap-1.5 mt-1 font-mono text-[8px] text-slate-500 tracking-wider">
                   AUTH_LEVEL: CLIENT
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* SEARCH / COMMAND */}
      <div className="px-4 mb-6 relative z-10">
        <div className={`group flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] rounded-xl transition-all hover:border-emerald-500/30 ${isExpanded ? "p-3" : "p-3.5 justify-center"}`}>
          <Activity size={16} className="text-slate-600 group-focus-within:text-emerald-500" />
          {isExpanded && (
            <input
              type="text"
              placeholder="SCAN_SYSTEM..."
              className="bg-transparent text-[10px] font-mono text-slate-300 outline-none w-full placeholder:text-slate-700 uppercase tracking-widest"
            />
          )}
        </div>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 px-3 space-y-1.5 relative z-10">
         {isExpanded && <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-white/[0.03]" />}
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={() => window.innerWidth < 768 && onClose()} className="block outline-none">
              <motion.div
                className={`relative flex items-center gap-4 px-3 py-3.5 rounded-xl transition-all duration-300 group
                  ${isActive ? "bg-white/[0.04] border border-white/10 shadow-lg" : "border border-transparent hover:bg-white/[0.02]"}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-laser"
                    className="absolute left-0 w-1 h-5 bg-emerald-500 rounded-r-full shadow-[0_0_15px_#10b981]"
                  />
                )}
                <item.icon size={18} className={`${isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                {isExpanded && (
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>
                    {item.label}
                  </span>
                )}
                {isExpanded && item.badge && (
                   <span className="ml-auto relative flex h-5 w-8 items-center justify-center">
                      <span className="absolute inset-0 bg-emerald-500/10 rounded-lg animate-pulse" />
                      <span className="relative text-[9px] font-black text-emerald-400 font-mono">{item.badge}</span>
                   </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER DATA */}
      <div className="p-4 mt-auto relative z-10">
        <div className={`rounded-2xl bg-black/40 border border-white/5 p-4 transition-all duration-500 ${!isExpanded && "items-center flex flex-col"}`}>
          {isExpanded ? (
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-slate-600 uppercase">Session_Time</span>
                  <p className="text-[11px] font-mono text-emerald-400/80 tracking-widest">{uptime}</p>
                </div>
                <ShieldCheck size={14} className="text-emerald-500/50" />
              </div>
              <div className="flex flex-col gap-1">
                 <div className="flex justify-between text-[7px] font-mono text-slate-500 uppercase tracking-tighter">
                    <span>Sys_Load</span>
                    <span>64%</span>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "64%" }} className="h-full bg-emerald-500/40" />
                 </div>
              </div>
              <button className="flex items-center gap-3 w-full px-4 py-3 bg-rose-500/5 border border-rose-500/10 rounded-xl hover:bg-rose-500/10 transition-all group">
                <Power size={14} className="text-rose-500/50 group-hover:text-rose-500" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-500/50 group-hover:text-rose-500">Terminate</span>
              </button>
            </div>
          ) : (
            <Cpu size={18} className="text-emerald-500/50 animate-pulse" />
          )}
        </div>

        <Link href="/dashboard/settings" className={`flex items-center gap-4 py-4 text-slate-500 hover:text-emerald-400 transition-all group ${!isExpanded ? "justify-center" : "px-4"}`}>
          <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
          {isExpanded && <span className="text-[10px] font-black uppercase tracking-widest">Settings</span>}
        </Link>
      </div>

      {/* COLLAPSE TOGGLE */}
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
      <aside className="hidden md:flex h-screen sticky top-0 z-50">
        {SidebarContent}
      </aside>

      {/* MOBILE HUD NAVIGATION */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%]">
        <div className="bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 px-4 shadow-2xl flex items-center justify-between">
            {menuItems.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href} className={`p-4 rounded-2xl transition-all ${pathname === item.href ? "bg-emerald-500/10 text-emerald-400" : "text-slate-500"}`}>
                <item.icon size={20} />
              </Link>
            ))}
            <button onClick={() => setIsExpanded(true)} className="p-4 text-slate-500">
                <Cpu size={20} />
            </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25 }} className="absolute left-0 top-0 h-full">
              {SidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}