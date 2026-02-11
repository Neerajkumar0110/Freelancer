"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, Search, Sparkles, Briefcase, Users, Building2,
  UserCheck, Code2, Palette, Brain, Megaphone, BookOpen, LifeBuoy,
  FileText, Globe, MessageCircle, HeartHandshake, ArrowRight, Command,
  Zap, Settings, LogOut, LayoutDashboard
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

/* ================= TYPES & DATA ================= */

const MENUS = {
  solutions: [
    { icon: Briefcase, title: "Hire Talent", desc: "Access the top 1% global talent", href: "/hire", hot: true },
    { icon: UserCheck, title: "Find Work", desc: "Apply to vetted premium gigs", href: "/freelancers" },
    { icon: Building2, title: "Enterprise", desc: "Scale with dedicated accounts", href: "/enterprise" },
    { icon: Users, title: "Agencies", desc: "Partner with top-tier firms", href: "/agencies" },
  ],
  services: [
    { icon: Code2, title: "Engineering", desc: "Web, Mobile & Systems", href: "/services/dev" },
    { icon: Brain, title: "AI & Data", desc: "LLMs & Neural Networks", href: "/services/ai" },
    { icon: Palette, title: "Design", desc: "Brand & Product Design", href: "/services/design" },
    { icon: Megaphone, title: "Growth", desc: "SEO & Performance Marketing", href: "/services/marketing" },
  ],
  resources: [
    { icon: FileText, title: "Insights", desc: "The latest in tech & hiring", href: "/blog" },
    { icon: Globe, title: "Global Ops", desc: "How we handle compliance", href: "/global" },
    { icon: MessageCircle, title: "Community", desc: "Connect with 50k+ peers", href: "/community" },
  ],
};

/* ================= MAIN COMPONENT ================= */

export default function AdvancedPremiumNavbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Intelligent Scroll Handling
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) setIsVisible(false); // Hide on scroll down
    else setIsVisible(true); // Show on scroll up
    setIsScrolled(latest > 30);
  });

  // Handle Command + K Shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -120 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 px-4 md:px-8 py-4 ${
          isScrolled ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 pointer-events-auto ${
          isScrolled
          ? "bg-[#020617]/70 backdrop-blur-2xl border border-white/10 rounded-[28px] px-6 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
        }`}>

          {/* 1. BRAND LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group relative">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                <Sparkles size={18} className="text-white fill-white/20" />
              </div>
            </div>
            <span className="text-xl font-black text-white tracking-tighter uppercase italic">
              Elite<span className="text-indigo-500 not-italic">.</span>
            </span>
          </Link>

          {/* 2. CENTER NAVIGATION (DESKTOP) */}
          <div className="hidden lg:flex items-center gap-1">
            {Object.keys(MENUS).map((key) => (
              <DesktopNavItem
                key={key}
                label={key}
                active={activeMenu === key}
                onOpen={() => setActiveMenu(key)}
                onClose={() => setActiveMenu(null)}
              >
                <PremiumMegaMenu title={key} items={MENUS[key as keyof typeof MENUS]} />
              </DesktopNavItem>
            ))}
            <Link href="/pricing" className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
          </div>

          {/* 3. RIGHT ACTIONS */}
          <div className="flex items-center gap-2">
            {/* Spotlight Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
            >
              <Search size={14} className="group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Search</span>
              <kbd className="hidden md:block text-[10px] bg-black/40 px-1.5 py-0.5 rounded border border-white/10">⌘K</kbd>
            </button>

            {/* Auth Logic */}
            {!user ? (
              <div className="flex items-center gap-1 ml-2">
                <Link href="/login" className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-white/5"
                >
                  Join
                </Link>
              </div>
            ) : (
              <div className="ml-2">
                <AdvancedUserMenu user={user} logout={logout} />
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white ml-2"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 4. COMMAND PALETTE (SEARCH) */}
      <AnimatePresence>
        {searchOpen && (
          <CommandPalette onClose={() => setSearchOpen(false)} />
        )}
      </AnimatePresence>

      {/* 5. MOBILE NAVIGATION OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-[150] bg-[#020617] p-6 lg:hidden flex flex-col justify-between"
          >
             <div className="space-y-10 pt-20">
                {Object.keys(MENUS).map((key) => (
                    <div key={key}>
                        <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-4">{key}</h4>
                        <div className="grid grid-cols-1 gap-6">
                            {MENUS[key as keyof typeof MENUS].slice(0, 3).map(item => (
                                <Link key={item.title} href={item.href} className="text-3xl font-bold text-white flex items-center justify-between group">
                                    {item.title} <ArrowRight size={24} className="text-gray-600 group-hover:text-indigo-500 transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
             </div>
             <button onClick={() => setMobileOpen(false)} className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl text-white font-bold">
                Close Menu
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= SUB-COMPONENTS ================= */

function DesktopNavItem({ label, active, onOpen, onClose, children }: any) {
  return (
    <div onMouseEnter={onOpen} onMouseLeave={onClose} className="relative">
      <button className={`px-4 py-2 text-sm font-semibold flex items-center gap-1.5 capitalize transition-all rounded-full ${
        active ? "text-white bg-white/10" : "text-gray-400 hover:text-white"
      }`}>
        {label}
        <ChevronDown size={14} className={`transition-transform duration-300 opacity-40 ${active ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>{active && children}</AnimatePresence>
    </div>
  );
}

function PremiumMegaMenu({ items, title }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(10px)" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-[850px] bg-[#020617]/95 backdrop-blur-3xl border border-white/10 rounded-[32px] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden"
    >
      <div className="grid grid-cols-12 gap-2">
        {/* Nav Links */}
        <div className="col-span-8 p-6 grid grid-cols-2 gap-4">
          {items.map((item: any) => (
            <Link key={item.title} href={item.href} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-400 transition-all">
                <item.icon size={20} className="text-gray-400 group-hover:text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    {item.hot && <span className="text-[9px] bg-indigo-500 text-white px-1.5 py-0.5 rounded font-black uppercase">New</span>}
                </div>
                <p className="text-[11px] text-gray-500 leading-snug mt-1 font-medium">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bento Promotion Card */}
        <div className="col-span-4 bg-gradient-to-br from-indigo-600/20 to-transparent border-l border-white/5 p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                <Zap size={24} className="text-white fill-white" />
            </div>
            <h4 className="text-lg font-black text-white capitalize leading-tight mb-2">The {title} <br /> Revolution</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">Our neural matching engine reduces hiring time by 85%. Witness the future of elite placement.</p>
          </div>
          <Link href="/demo" className="mt-8 flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest group">
            Start Your Journey <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function CommandPalette({ onClose }: { onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#020617]/95 backdrop-blur-md flex items-start justify-center pt-[12vh] px-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: -20, scale: 0.95, filter: "blur(10px)" }}
                animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
                className="w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center gap-4 p-6 border-b border-white/5 bg-white/5">
                    <Search className="text-indigo-500" />
                    <input
                        autoFocus
                        placeholder="Search for designers, react experts, or enterprise teams..."
                        className="w-full bg-transparent border-none outline-none text-xl text-white placeholder:text-gray-600 font-medium"
                    />
                    <kbd className="text-[11px] font-bold text-gray-500 bg-black/40 px-2 py-1 rounded">ESC</kbd>
                </div>
                <div className="p-6">
                    <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Trending Expertise</h5>
                    <div className="grid grid-cols-2 gap-2">
                        {['Solidity Engineer', 'Next.js Expert', 'Growth Lead', 'AI Architect'].map(tag => (
                            <button key={tag} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 text-left transition-all group">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20">
                                    <Command size={14} className="text-gray-500 group-hover:text-indigo-400" />
                                </div>
                                <span className="text-sm text-gray-400 group-hover:text-white font-medium">{tag}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

function AdvancedUserMenu({ user, logout }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative group flex items-center gap-2 p-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 border border-white/20" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 border-2 border-[#020617] rounded-full flex items-center justify-center">
            <span className="text-[8px] font-black text-white">3</span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
            <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-64 z-20 bg-[#0f172a] border border-white/10 rounded-3xl p-2 shadow-2xl shadow-black overflow-hidden"
            >
                <div className="p-4 border-b border-white/5 mb-2">
                    <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-1">{user.role}</p>
                    <p className="text-sm font-bold text-white truncate">{user.name || "Elite User"}</p>
                </div>
                <div className="space-y-1">
                    <MenuOption icon={LayoutDashboard} label="Dashboard" href="/dashboard" />
                    <MenuOption icon={Settings} label="Settings" href="/settings" />
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all"
                    >
                        <LogOut size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Log Out</span>
                    </button>
                </div>
            </motion.div>
            </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuOption({ icon: Icon, label, href }: any) {
    return (
        <Link href={href} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 text-gray-400 hover:text-white transition-all">
            <Icon size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
        </Link>
    )
}