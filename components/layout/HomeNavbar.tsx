"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, Search, Sparkles, Briefcase, Users, Building2,
  UserCheck, Code2, Palette, Brain, Megaphone, ArrowRight, Command,
  Zap, Settings, LogOut, LayoutDashboard, Globe, FileText, MessageCircle
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

/* ================= DATA ================= */

const MENUS = {
  solutions: [
    { icon: Briefcase, title: "Hire Talent", desc: "Access top 1% global talent", href: "/hire", hot: true },
    { icon: UserCheck, title: "Find Work", desc: "Apply to vetted gigs", href: "/freelancers" },
    { icon: Building2, title: "Enterprise", desc: "Scale with accounts", href: "/enterprise" },
  ],
  services: [
    { icon: Code2, title: "Engineering", desc: "Web & Systems", href: "/services/dev" },
    { icon: Brain, title: "AI & Data", desc: "Neural Networks", href: "/services/ai" },
    { icon: Palette, title: "Design", desc: "Product Design", href: "/services/design" },
  ],
  resources: [
    { icon: FileText, title: "Insights", desc: "Tech & hiring", href: "/blog" },
    { icon: MessageCircle, title: "Community", desc: "50k+ peers", href: "/community" },
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

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide navbar on scroll down, show on scroll up
    if (latest > previous && latest > 150) setIsVisible(false);
    else setIsVisible(true);
    setIsScrolled(latest > 30);
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -120 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-[100] px-1 py-1"
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-[24px] md:rounded-[28px] ${
          isScrolled
            ? "bg-[#020617]/80 backdrop-blur-2xl border border-white/10 px-4 md:px-6 py-2 md:py-3 shadow-2xl"
            : "bg-transparent px-2 py-4"
        }`}>

          {/* BRAND LOGO */}
          <Link href="/" className="flex items-center gap-2 group outline-none">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform">
              <Sparkles size={16} className="text-white fill-white/20" />
            </div>
            <span className="text-lg md:text-xl font-black text-white tracking-tighter uppercase italic">
              Freelancer-Lab<span className="text-indigo-500 not-italic">.</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
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
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center w-10 h-10 md:w-auto md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all outline-none"
            >
              <Search size={16} />
              <span className="hidden md:inline ml-3 text-[11px] font-bold uppercase tracking-widest">Search</span>
              <kbd className="hidden lg:block ml-3 text-[10px] bg-black/40 px-1.5 py-0.5 rounded border border-white/10 font-sans">⌘K</kbd>
            </button>

            {/* User/Auth */}
            {!user ? (
              <div className="flex items-center gap-1">
                <Link href="/login" className="hidden sm:block px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors outline-none">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all active:scale-95 outline-none"
                >
                  Join
                </Link>
              </div>
            ) : (
              <AdvancedUserMenu user={user} logout={logout} />
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white outline-none"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* SEARCH COMMAND PALETTE */}
      <AnimatePresence>
        {searchOpen && <CommandPalette onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[#020617] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <span className="text-xl font-black text-white italic">Elite<span className="text-indigo-500 not-italic">.</span></span>
              <button onClick={() => setMobileOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white outline-none">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="space-y-12">
                {Object.keys(MENUS).map((key, idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-6">{key}</h4>
                    <div className="grid gap-6">
                      {MENUS[key as keyof typeof MENUS].map(item => (
                        <Link key={item.title} href={item.href} className="flex items-center justify-between group outline-none">
                          <span className="text-3xl font-bold text-white group-active:text-indigo-400 transition-colors">{item.title}</span>
                          <ArrowRight size={20} className="text-gray-600" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-8 border-t border-white/5 bg-white/[0.02]">
              <Link href="/signup" className="w-full py-5 bg-white text-black rounded-2xl flex items-center justify-center font-black uppercase tracking-widest text-sm mb-4 outline-none">
                Get Started
              </Link>
              <p className="text-center text-gray-500 text-xs font-medium">Already have an account? <Link href="/login" className="text-white underline">Login</Link></p>
            </div>
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
      <button className={`px-4 py-2 text-sm font-bold flex items-center gap-1.5 capitalize transition-all rounded-full outline-none ${
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
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[700px] bg-[#020617] border border-white/10 rounded-[32px] p-2 shadow-2xl overflow-hidden"
    >
      <div className="flex">
        <div className="w-2/3 p-6 grid grid-cols-1 gap-2">
          {items.map((item: any) => (
            <Link key={item.title} href={item.href} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group outline-none">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-400 transition-all">
                <item.icon size={18} className="text-gray-400 group-hover:text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{item.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-1/3 bg-indigo-600/10 border-l border-white/5 p-8 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center mb-4">
                <Zap size={20} className="text-white fill-white" />
            </div>
            <h4 className="text-base font-black text-white leading-tight mb-2">Build your <br /> {title} deck.</h4>
            <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider">Top 1% Vetted Talent</p>
          </div>
          <Link href="/demo" className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest group outline-none">
            Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
      className="fixed inset-0 z-[300] bg-[#020617]/95 backdrop-blur-md flex items-start justify-center pt-[10vh] px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        className="w-full max-w-xl bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 p-5 border-b border-white/5">
          <Search className="text-indigo-500" size={20} />
          <input
            autoFocus
            placeholder="Search talent or jobs..."
            className="w-full bg-transparent border-none outline-none text-lg text-white placeholder:text-gray-600 font-medium p-0 focus:ring-0"
          />
          <button onClick={onClose} className="text-[10px] font-bold text-gray-500 bg-black/40 px-2 py-1 rounded">ESC</button>
        </div>
        <div className="p-6">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Quick Links</p>
          <div className="grid grid-cols-1 gap-2">
            {['Browse Developers', 'Technical Architects', 'Project Gigs'].map(item => (
              <button key={item} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-left transition-all outline-none">
                <Command size={14} className="text-indigo-400" />
                <span className="text-sm text-gray-300 font-medium">{item}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AdvancedUserMenu({ user, logout }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 bg-white/5 overflow-hidden outline-none flex items-center justify-center"
      >
        <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
          {user?.name?.[0] || "U"}
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
              className="absolute right-0 mt-4 w-60 z-20 bg-[#0f172a] border border-white/10 rounded-2xl p-1.5 shadow-2xl"
            >
              <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all outline-none">
                <LayoutDashboard size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Dashboard</span>
              </Link>
              <button onClick={logout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all outline-none">
                <LogOut size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Log Out</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}