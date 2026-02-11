"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function SidebarItem({
  href,
  icon,
  label,
  active,
  collapsed,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`relative flex items-center group transition-all duration-300 rounded-xl
                  ${collapsed ? "justify-center h-12 w-12 mx-auto" : "px-4 py-3 w-full"}
                  ${
                    active
                      ? "bg-indigo-500/10 text-white shadow-[inset_0px_0px_12px_rgba(99,102,241,0.1)]"
                      : "text-gray-500 hover:text-white hover:bg-white/[0.03]"
                  }`}
    >
      {/* ACTIVE INDICATOR LINE */}
      {active && (
        <motion.div
          layoutId="active-pill"
          className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_8px_rgba(99,102,241,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* ICON CONTAINER */}
      <div className={`flex items-center justify-center transition-colors duration-300 ${active ? "text-indigo-400" : "group-hover:text-indigo-300"}`}>
        {icon}
      </div>

      {/* LABEL WITH FLUID TRANSITION */}
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className={`ml-3 text-sm font-bold tracking-tight whitespace-nowrap
                       ${active ? "text-white" : "text-inherit"}`}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* TOOLTIP FOR COLLAPSED STATE (Custom-style) */}
      {collapsed && (
        <div className="absolute left-14 px-2 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity translate-x-2 group-hover:translate-x-0">
          {label}
        </div>
      )}
    </Link>
  );
}