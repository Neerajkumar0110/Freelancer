"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Briefcase,
  UserCheck,
  Building2,
  Code2,
  Palette,
  Brain,
  Megaphone,
  BookOpen,
  LifeBuoy,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import UserMenu from "@/components/layout/UserMenu";

/* ================= TYPES ================= */

type NavItemProps = {
  label: string;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
};

type MegaLinkProps = {
  icon: React.ElementType;
  title: string;
  desc: string;
  href: string;
};

/* ================= COMPONENT ================= */

export default function HomeNavbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const role = user?.role;

  const primaryCTA =
    role === "client"
      ? { label: "Post a Job", href: "/dashboard/client/jobs/new" }
      : role === "freelancer"
      ? { label: "Find Jobs", href: "/dashboard/freelancer/jobs" }
      : { label: "Get Started", href: "/signup" };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all
        ${scrolled
          ? "bg-[#0B0F19]/90 backdrop-blur border-b border-white/10 h-14"
          : "bg-[#0B0F19]/80 backdrop-blur h-16"}`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="text-xl font-bold text-white">
            Freelancer<span className="text-indigo-500">.</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <NavItem
              label="Solutions"
              active={activeMenu === "solutions"}
              onOpen={() => setActiveMenu("solutions")}
              onClose={() => setActiveMenu(null)}
            >
              <MegaMenu>
                <MegaLink icon={Briefcase} title="Hire Freelancers" desc="Find verified talent" href="/hire" />
                <MegaLink icon={UserCheck} title="Find Work" desc="Get hired globally" href="/freelancers" />
                <MegaLink icon={Building2} title="Enterprise" desc="Scale teams fast" href="/enterprise" />
              </MegaMenu>
            </NavItem>

            <NavItem
              label="Services"
              active={activeMenu === "services"}
              onOpen={() => setActiveMenu("services")}
              onClose={() => setActiveMenu(null)}
            >
              <MegaMenu>
                <MegaLink icon={Code2} title="Web Development" desc="Frontend & backend" href="/services/web" />
                <MegaLink icon={Palette} title="UI / UX Design" desc="Product designers" href="/services/design" />
                <MegaLink icon={Brain} title="AI & Automation" desc="ML workflows" href="/services/ai" />
                <MegaLink icon={Megaphone} title="Marketing" desc="SEO & growth" href="/services/marketing" />
              </MegaMenu>
            </NavItem>

            <NavItem
              label="Resources"
              active={activeMenu === "resources"}
              onOpen={() => setActiveMenu("resources")}
              onClose={() => setActiveMenu(null)}
            >
              <MegaMenu>
                <MegaLink icon={BookOpen} title="Blog" desc="Guides & insights" href="/blog" />
                <MegaLink icon={Users} title="Community" desc="Discussions" href="/community" />
                <MegaLink icon={LifeBuoy} title="Help Center" desc="FAQs & support" href="/help" />
              </MegaMenu>
            </NavItem>

            <Link href="/pricing" className="hover:text-white">Pricing</Link>
          </div>

          {/* DESKTOP RIGHT */}
          <div className="hidden md:flex items-center gap-4">
            {/* SEARCH */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder={role === "freelancer" ? "Search jobs…" : "Search freelancers…"}
                className="bg-[#0F1424] border border-white/10 rounded-lg
                           pl-9 pr-3 py-2 text-sm text-white
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            {/* CTA */}
            <Link
              href={primaryCTA.href}
              className="bg-indigo-600 hover:bg-indigo-700
                         px-4 py-2 rounded-lg text-sm text-white transition"
            >
              {primaryCTA.label}
            </Link>

            {!user ? (
              <Link href="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
            ) : (
              <UserMenu />
            )}
          </div>

          {/* MOBILE BUTTONS */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setMobileSearch(true)}>
              <Search size={20} />
            </button>
            <button onClick={() => setMobileOpen(v => !v)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="md:hidden bg-[#0B0F19] border-t border-white/10"
            >
              <div className="px-6 py-6 space-y-4 text-gray-300">
                <Link href={primaryCTA.href} className="block text-indigo-400">
                  {primaryCTA.label}
                </Link>
                <Link href="/pricing">Pricing</Link>
                {!user && <Link href="/login">Login</Link>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE SEARCH MODAL */}
      <AnimatePresence>
        {mobileSearch && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-start pt-20 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-[#0B0F19] w-full rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2">
                <Search size={18} />
                <input
                  autoFocus
                  placeholder="Search jobs, freelancers, skills…"
                  className="flex-1 bg-transparent outline-none text-white"
                />
                <button onClick={() => setMobileSearch(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                Popular: React, Node.js, UI Designer, AI Engineer
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= HELPERS ================= */

function NavItem({ label, active, onOpen, onClose, children }: NavItemProps) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button className="flex items-center gap-1 hover:text-white">
        {label}
        <ChevronDown size={14} />
      </button>
      <AnimatePresence>{active && children}</AnimatePresence>
    </div>
  );
}

function MegaMenu({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      className="absolute top-full mt-4 w-[720px] grid grid-cols-2 gap-6
                 bg-[#0B0F19]/95 backdrop-blur
                 border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      {children}
    </motion.div>
  );
}

function MegaLink({ icon: Icon, title, desc, href }: MegaLinkProps) {
  return (
    <Link href={href} className="flex gap-4 p-3 rounded-xl hover:bg-white/5">
      <Icon size={20} className="text-indigo-500" />
      <div>
        <p className="text-white font-medium">{title}</p>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
    </Link>
  );
}
