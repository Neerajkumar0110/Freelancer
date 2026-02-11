"use client";

import Link from "next/link";
import { useState } from "react";
import { Linkedin, Github, Twitter, Send, Globe2, Command } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("en-IN");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== TOP SECTION: BRAND & NEWSLETTER ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">

          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                <Command size={18} />
              </div>
              <span className="text-xl font-black text-white tracking-tighter">
                FREELANCER<span className="text-indigo-500">.</span>
              </span>
            </Link>
            <p className="mt-6 text-gray-400 text-base leading-relaxed max-w-sm font-medium">
              The world's premium network for elite talent. We bridge the gap between visionary companies and global experts.
            </p>

            {/* Social Buttons */}
            <div className="flex items-center gap-3 mt-8">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" }
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative p-8 rounded-[32px] bg-white/[0.02] border border-white/5 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl -translate-y-1/2 translate-x-1/2" />

              <h4 className="text-white font-bold text-lg mb-2">Join the inner circle</h4>
              <p className="text-gray-500 text-sm mb-6 font-medium">Receive curated hiring insights and platform updates weekly.</p>

              <form onSubmit={handleSubscribe} className="relative flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className={`px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2
                    ${isSubscribed ? "bg-emerald-500 text-white" : "bg-white text-black hover:bg-indigo-500 hover:text-white"}`}
                >
                  {isSubscribed ? "Success" : (
                    <>
                      Subscribe <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ===== MIDDLE SECTION: LINKS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          {[
            {
              title: "Product",
              links: ["Pricing", "Talent Search", "Enterprise", "Reviews"]
            },
            {
              title: "Resources",
              links: ["Blog", "Help Center", "Case Studies", "Status"]
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Press", "Contact"]
            },
            {
              title: "Legal",
              links: ["Terms", "Privacy", "Security", "Cookies"]
            }
          ].map((col) => (
            <div key={col.title}>
              <h5 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6">{col.title}</h5>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-500 hover:text-indigo-400 text-sm font-medium transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ===== BOTTOM SECTION: STATUS & SETTINGS ===== */}
        <div className="border-t border-white/5 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Freelancer Global Inc.
            </p>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Systems Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Globe2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs font-bold text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer hover:bg-white/10 transition-all"
              >
                <option value="en-IN">English (IN)</option>
                <option value="en-US">English (US)</option>
                <option value="fr-FR">Français</option>
                <option value="de-DE">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}