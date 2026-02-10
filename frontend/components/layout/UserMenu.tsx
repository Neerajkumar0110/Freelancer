"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Bell,
  LogOut,
  Settings,
  Repeat,
  User,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useAuth } from "@/context/AuthContext";

/**
 * Assumptions:
 * - user.role: "client" | "freelancer"
 * - user.avatarUrl?: string
 * - AuthContext exposes: logout(), setRole?(role)
 *   (If setRole does not exist, persistence still works via localStorage)
 */

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const notifications = 2; // TODO: backend
  const ref = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLButtonElement[]>([]);
  const reduceMotion = useReducedMotion();

  /* ---------------- Close on outside click ---------------- */
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* ---------------- Keyboard handling ---------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;

      const items = menuItemsRef.current.filter(Boolean);
      const index = items.findIndex((el) => el === document.activeElement);

      if (e.key === "Escape") {
        setOpen(false);
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = items[index + 1] || items[0];
        next?.focus();
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = items[index - 1] || items[items.length - 1];
        prev?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!user) return null;

  /* ---------------- Role switching (persistent) ---------------- */
  const switchRole = () => {
    const nextRole = user.role === "client" ? "freelancer" : "client";

    // Persist locally (backend sync later)
    localStorage.setItem("userRole", nextRole);

    // Reload app to rehydrate role cleanly
    window.location.reload();
  };

  /* ---------------- Avatar logic ---------------- */
  const avatar =
    user.avatarUrl ? (
      <img
        src={user.avatarUrl}
        alt="User avatar"
        className="w-full h-full object-cover rounded-full"
      />
    ) : (
      <User size={18} />
    );

  return (
    <div className="relative flex items-center gap-3" ref={ref}>
      {/* ===== Notifications ===== */}
      <button
        aria-label="Notifications"
        className="relative text-gray-400 hover:text-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                   rounded-full transition"
      >
        <Bell size={20} />
        {notifications > 0 && (
          <span className="absolute -top-1 -right-1 w-2 h-2
                           bg-indigo-500 rounded-full" />
        )}
      </button>

      {/* ===== Avatar ===== */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="w-9 h-9 rounded-full bg-indigo-600 text-white
                   flex items-center justify-center font-semibold
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      >
        {avatar}
      </button>

      {/* ===== Dropdown ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            exit={reduceMotion ? false : { opacity: 0, y: 8 }}
            className="absolute right-0 top-12 w-60 rounded-xl
                       bg-[#0F1424] border border-white/10
                       shadow-xl overflow-hidden z-[60]"
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-sm text-white truncate">
                {user.email}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {user.role}
              </p>
            </div>

            {/* Dashboard */}
            <Link
              href={
                user.role === "client"
                  ? "/dashboard/client"
                  : "/dashboard/freelancer"
              }
              ref={(el) => el && (menuItemsRef.current[0] = el)}
              className="flex items-center gap-2 px-4 py-2 text-sm
                         text-gray-300 hover:bg-white/5 transition"
            >
              <Settings size={14} />
              Dashboard
            </Link>

            {/* Switch role */}
            <button
              ref={(el) => el && (menuItemsRef.current[1] = el)}
              onClick={switchRole}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm
                         text-gray-300 hover:bg-white/5 transition"
            >
              <Repeat size={14} />
              Switch role
            </button>

            {/* Logout */}
            <button
              ref={(el) => el && (menuItemsRef.current[2] = el)}
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm
                         text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut size={14} />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Logout Confirmation ===== */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/70
                       flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-[#0B0F19] rounded-xl p-6 w-full max-w-sm
                         border border-white/10"
            >
              <h3 className="text-white font-semibold text-lg">
                Log out?
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                You will be signed out of your account.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 rounded-lg text-sm
                             border border-white/15 text-white
                             hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg text-sm
                             bg-red-600 hover:bg-red-700
                             text-white transition"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
