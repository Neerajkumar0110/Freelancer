'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/logo/logo';

const NAV_LINKS = [
  { name: 'Features', href: '#features' },
  { name: 'Employers', href: '#employers' },
  { name: 'AI Test', href: '#test' },
  { name: 'Reports', href: '#reports' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        scrolled
          ? 'top-0 px-0'
          : 'top-4 px-4 sm:px-6 lg:px-8'
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? 'max-w-full rounded-none bg-white border-b border-slate-200 shadow-md px-8'
            : 'bg-[#020617]/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl px-6'
        }`}
        aria-label="Main Navigation"
      >
        <div className="flex justify-between items-center h-16">

          <div className="mb-0">
            <Logo isSticky={scrolled} />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${
                  scrolled
                    ? 'text-slate-600 hover:text-blue-600'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className={`hidden sm:block text-[11px] font-black uppercase tracking-widest transition-colors ${
              scrolled ? 'text-slate-600 hover:text-[#0f172a]' : 'text-slate-300 hover:text-white'
            }`}>
              Log in
            </button>
            <button className={`px-5 py-2 text-[11px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 ${
              scrolled
                ? 'bg-[#0f172a] text-white hover:bg-blue-700'
                : 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500'
            }`}>
              Sign up
            </button>

            <button
              className={`md:hidden p-1 ${scrolled ? 'text-[#0f172a]' : 'text-white'}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t overflow-hidden ${
                scrolled ? 'border-slate-100 bg-white' : 'border-white/10'
              }`}
            >
              <div className="flex flex-col p-6 gap-6 text-center">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xs font-black uppercase tracking-[0.3em] ${
                      scrolled ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className={`h-px w-full ${scrolled ? 'bg-slate-100' : 'bg-white/10'}`} />
                <button className={`text-xs font-black uppercase tracking-widest py-2 ${
                  scrolled ? 'text-[#0f172a]' : 'text-white'
                }`}>
                  Candidate Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}