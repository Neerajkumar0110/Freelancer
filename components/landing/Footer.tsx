'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Home, Search, User, Briefcase, Activity, Zap, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';


const FOOTER_LINKS = {
  Platform: [
    { name: 'Community', href: '#test' },
    { name: 'Referral Program', href: '#reports' },
    { name: 'Events', href: '#employers' },
    { name: 'Leaderboard', href: '#' },
  ],
  Company: [
    { name: 'About CLC', href: '#' },
    { name: 'Partner Program', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
  Resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Career Prep', href: '#' },
    { name: 'Hiring Insights', href: '#' },
    { name: 'Support', href: '#' },
  ],
};

const SOCIAL_ICONS = [
  { name: 'Facebook', src: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png', color: 'bg-[#1877F2]/10' },
  { name: 'X', src: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png', color: 'bg-white/10' },
  { name: 'Instagram', src: 'https://cdn-icons-png.flaticon.com/512/3955/3955024.png', color: 'bg-[#E4405F]/10' },
  { name: 'YouTube', src: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', color: 'bg-[#FF0000]/10' },
  { name: 'LinkedIn', src: 'https://cdn-icons-png.flaticon.com/512/145/145807.png', color: 'bg-[#0A66C2]/10' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative bg-[#020617] border-t border-white/5 pt-15 pb-15 md:pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-12 mb-20">

            <div className="col-span-2 lg:col-span-4">

              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10 max-w-xs uppercase tracking-tight">
                Autonomous Verification Node v.2.5 <br />
                <span className="text-blue-500 font-black italic underline decoration-blue-500/30">Manee Pro 2.5 Native Sync</span>
              </p>

              <div className="flex flex-wrap gap-4">
                {SOCIAL_ICONS.map((social) => (
                  <Link key={social.name} href="#" className={`w-12 h-12 ${social.color} rounded-2xl border border-white/5 flex items-center justify-center transition-transform hover:scale-110 active:scale-95`}>
                    <div className="relative w-8 h-8">
                      <Image
                        src={social.src}
                        alt={social.name}
                        fill
                        sizes="24px"
                        className="object-contain"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="col-span-1 lg:col-span-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">{title}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-xs font-black text-slate-400 hover:text-blue-400 uppercase tracking-widest transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">System HUD</h4>
              <div className="bg-black/40 rounded-[1.5rem] p-4 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-3">
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Core Active</span>
                   </div>
                   <Activity size={12} className="text-blue-500 animate-pulse" />
                </div>

                <div className="space-y-4">
                  <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Neural Load</span>
                      <span className="text-[10px] font-black text-blue-400 italic tracking-tighter">88%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '88%' }}
                        className="bg-blue-600 h-full shadow-[0_0_10px_#3b82f6]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-2">
                    <Terminal size={10} className="text-green-500" />
                    <span className="text-[6px] font-mono text-slate-400 animate-pulse uppercase tracking-widest">LATENCY_SYNC: 14MS</span>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-2 border-t border-white/5">
                    <Zap size={10} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-[9px] font-black text-white uppercase tracking-widest italic">Empire Node 04</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
            <div className="flex items-center gap-6">
              <span className="italic">© 2015 - {currentYear} CLC HireX</span>
              <div className="flex items-center gap-2 text-blue-500">
                <ShieldCheck size={12} />
                <span>Protocol: X-Secure</span>
              </div>
            </div>
            <div>
              AI Dev by <span className="text-white underline underline-offset-4 decoration-blue-500">Career Lab Consulting</span>
            </div>
          </div>
        </div>
      </footer>

      <nav className="md:hidden fixed bottom-6 left-6 right-6 z-[100] h-18 bg-[#020617]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] flex items-center justify-around px-4">
        {[
          { Icon: Home, label: 'Home', href: '/' },
          { Icon: Briefcase, label: 'Jobs', href: '#reports' },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1.5 text-slate-400 active:text-blue-500 group">
            <item.Icon size={18} className="group-active:scale-125 transition-transform" />
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}

        <Link
          href="https://wa.me/918368436412"
          target="_blank"
          rel="noopener noreferrer"
          className="relative -translate-y-8 w-16 h-16"
        >
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
          <div className="relative w-full h-full bg-[#020617] rounded-full p-0.5 border border-white/10">
            <div className="w-full h-full bg-white rounded-full p-2 flex items-center justify-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png"
                alt="Support"
                width={45}
                height={45}
                className="object-contain"
              />
            </div>
          </div>
        </Link>

        {[
          { Icon: Search, label: 'Tests', href: '#test' },
          { Icon: User, label: 'Profile', href: '#' },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1.5 text-slate-400 active:text-blue-500">
            <item.Icon size={18} />
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}