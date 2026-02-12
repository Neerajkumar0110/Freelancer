"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Mock user - replace with your useAuth() data
  const user = {
    name: "Alex Rivera",
    email: "alex@console.ai",
    plan: "Pro Member"
  };

  return (
    <div className="relative">
      {/* Trigger Avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center h-9 w-9 rounded-full overflow-hidden border-2 border-white/10 transition-all hover:border-indigo-500/50 active:scale-95"
      >
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
          alt="Avatar"
          className="object-cover"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-3 w-64 z-20 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(99,102,241,0.1)]"
            >
              {/* Profile Summary */}
              <div className="p-4 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-bold text-white truncate">{user.name}</span>
                    <span className="text-[10px] font-medium text-gray-500 truncate uppercase tracking-tight">
                      {user.plan}
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/5" />

              {/* Menu Items */}
              <div className="p-2">
                <MenuLink icon={<User size={14} />} label="My Profile" href="/profile" />
                <MenuLink icon={<CreditCard size={14} />} label="Billing" href="/billing" />
                <MenuLink icon={<Settings size={14} />} label="Account Settings" href="/settings" />
                <MenuLink
                  icon={<ShieldCheck size={14} />}
                  label="Security"
                  href="/security"
                  badge="New"
                />
              </div>

              <div className="h-[1px] w-full bg-white/5" />

              {/* Footer Actions */}
              <div className="p-2">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold text-rose-400 transition-colors hover:bg-rose-500/10">
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuLink({
  icon,
  label,
  href,
  badge
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-500 group-hover:text-indigo-400 transition-colors">
          {icon}
        </span>
        {label}
      </div>
      {badge ? (
        <span className="rounded-full bg-indigo-500/20 px-1.5 py-0.5 text-[8px] font-black uppercase text-indigo-400 ring-1 ring-inset ring-indigo-500/30">
          {badge}
        </span>
      ) : (
        <ExternalLink size={10} className="opacity-0 group-hover:opacity-40" />
      )}
    </Link>
  );
}