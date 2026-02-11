"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  FileText,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  Plus,
  LucideIcon,
  Zap,
} from "lucide-react";

/* ================= NAV CONFIG ================= */

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const clientNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/client", icon: Home },
  { label: "My Projects", href: "/dashboard/client/jobs", icon: Briefcase },
  { label: "Proposals", href: "/dashboard/client/proposals", icon: FileText },
  { label: "Network", href: "/messages", icon: MessageSquare },
];

const freelancerNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/freelancer", icon: Home },
  { label: "Browse Jobs", href: "/dashboard/freelancer/jobs", icon: Briefcase },
  { label: "Applied", href: "/dashboard/freelancer/proposals", icon: FileText },
  { label: "Revenue", href: "/dashboard/freelancer/earnings", icon: DollarSign },
  { label: "Messages", href: "/messages", icon: MessageSquare },
];

/* ================= COMPONENT ================= */

export default function Sidebar({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const nav = user.role === "client" ? clientNav : freelancerNav;

  return (
    <aside
      className={`relative flex flex-col h-full
                  bg-[#020617] border-r border-white/5
                  transition-all duration-500 ease-in-out
                  ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* ===== HEADER / BRAND ===== */}
      <div className="flex items-center justify-between px-6 py-8">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-black text-white tracking-tighter"
          >
            LUNA<span className="text-indigo-500">.</span>
          </motion.span>
        )}
        {collapsed && (
           <div className="w-full flex justify-center">
             <Zap className="text-indigo-500 fill-indigo-500" size={24} />
           </div>
        )}

        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden lg:flex absolute -right-3 top-9 bg-[#020617] border border-white/10 rounded-full p-1 text-gray-500 hover:text-white transition shadow-xl"
        >
          <ChevronLeft
            size={14}
            className={`transition-transform duration-500 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* ===== QUICK ACTION (CLIENT) ===== */}
      <div className="px-4 mb-6">
        {user.role === "client" ? (
          <button
            className={`flex items-center gap-3 w-full
                       bg-white text-black hover:bg-indigo-500 hover:text-white
                       rounded-xl transition-all duration-300 font-black uppercase tracking-widest text-[10px]
                       ${collapsed ? "aspect-square justify-center p-0" : "px-4 py-3"}`}
          >
            <Plus size={18} />
            {!collapsed && <span>Initiate Job</span>}
          </button>
        ) : (
          <div className={`h-[1px] bg-white/5 mx-2 ${collapsed ? "hidden" : "block"}`} />
        )}
      </div>

      {/* ===== NAVIGATION ===== */}
      <nav className="flex-1 space-y-2 px-3">
        {!collapsed && (
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-3 mb-4">
            Main Terminal
          </p>
        )}
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={<Icon size={20} />}
              active={active}
              collapsed={collapsed}
              onClick={onNavigate}
            />
          );
        })}
      </nav>

      {/* ===== FOOTER SYSTEM ===== */}
      <div className="px-3 pb-6 space-y-2">
        {!collapsed && (
          <div className="h-[1px] bg-white/5 mx-3 mb-4" />
        )}

        <SidebarItem
          href="/settings"
          label="System Settings"
          icon={<Settings size={20} />}
          active={pathname.startsWith("/settings")}
          collapsed={collapsed}
          onClick={onNavigate}
        />

        <button
          onClick={logout}
          className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl
                      text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all group
                      ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          {!collapsed && <span className="text-sm font-bold uppercase tracking-tighter">Terminate Session</span>}
        </button>
      </div>
    </aside>
  );
}