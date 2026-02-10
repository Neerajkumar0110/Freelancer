"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
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
} from "lucide-react";

/* ================= NAV CONFIG ================= */

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const clientNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/client", icon: Home },
  { label: "My Jobs", href: "/dashboard/client/jobs", icon: Briefcase },
  { label: "Proposals", href: "/dashboard/client/proposals", icon: FileText },
  { label: "Messages", href: "/messages", icon: MessageSquare },
];

const freelancerNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/freelancer", icon: Home },
  { label: "Find Jobs", href: "/dashboard/freelancer/jobs", icon: Briefcase },
  { label: "Proposals", href: "/dashboard/freelancer/proposals", icon: FileText },
  { label: "Earnings", href: "/dashboard/freelancer/earnings", icon: DollarSign },
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
      className={`flex flex-col h-full
                  bg-[#0B0F19] border-r border-white/10
                  transition-all duration-300
                  ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* ===== LOGO + COLLAPSE ===== */}
      <div className="flex items-center justify-between px-4 py-4">
        {!collapsed && (
          <span className="text-lg font-bold">
            Freelancer<span className="text-indigo-500">.</span>
          </span>
        )}

        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden lg:flex text-gray-400 hover:text-white"
        >
          <ChevronLeft
            size={18}
            className={`transition ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* ===== QUICK ACTION (CLIENT) ===== */}
      {user.role === "client" && !collapsed && (
        <button
          className="mx-4 mb-4 flex items-center gap-2
                     bg-indigo-600 hover:bg-indigo-700
                     px-4 py-2 rounded-lg text-sm transition"
        >
          <Plus size={16} />
          Post Job
        </button>
      )}

      {/* ===== NAV ===== */}
      <nav className="flex-1 space-y-1 px-2">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={<Icon size={18} />}
              active={active}
              collapsed={collapsed}
              onClick={onNavigate}
            />
          );
        })}
      </nav>

      {/* ===== FOOTER ===== */}
      <div className="px-2 pb-4 space-y-1">
        <SidebarItem
          href="/settings"
          label="Settings"
          icon={<Settings size={18} />}
          active={pathname.startsWith("/settings")}
          collapsed={collapsed}
          onClick={onNavigate}
        />

        <button
          onClick={logout}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg
                      text-red-400 hover:bg-red-500/10 transition
                      ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
