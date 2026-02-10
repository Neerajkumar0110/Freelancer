"use client";

import Link from "next/link";
import { useState } from "react";
import { Linkedin, Github, Twitter } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("en-IN");

  return (
    <footer className="bg-[#0B0F19] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 text-sm">

        {/* ===== Brand ===== */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold text-lg mb-3">
            Freelancer<span className="text-indigo-500">.</span>
          </h3>
          <p className="text-gray-400 leading-relaxed max-w-sm">
            Hire and work with top freelancers worldwide — fast, secure, and flexible.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-5">
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              className="text-gray-400 hover:text-white transition"
            >
              <Linkedin size={18} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="text-gray-400 hover:text-white transition"
            >
              <Twitter size={18} />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="text-gray-400 hover:text-white transition"
            >
              <Github size={18} />
            </Link>
          </div>
        </div>

        {/* ===== Platform ===== */}
        <div>
          <h4 className="text-white font-medium mb-3">Platform</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/pricing" className="text-gray-400 hover:text-white transition">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-400 hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/help" className="text-gray-400 hover:text-white transition">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        {/* ===== Company ===== */}
        <div>
          <h4 className="text-white font-medium mb-3">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-gray-400 hover:text-white transition">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* ===== Newsletter ===== */}
        <div>
          <h4 className="text-white font-medium mb-3">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-3">
            Get product updates and hiring tips.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full rounded-lg bg-[#0F1424] border border-white/10
                         px-3 py-2 text-sm text-white placeholder:text-gray-500
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600
                         hover:bg-indigo-700 text-white text-sm transition"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6
                        flex flex-col sm:flex-row items-center
                        justify-between gap-3 text-xs text-gray-500">

          <p>
            © {new Date().getFullYear()} Freelancer. All rights reserved.
          </p>

          {/* Language / Region */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#0F1424] border border-white/10
                       rounded-lg px-3 py-1.5 text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          >
            <option value="en-IN">English (India)</option>
            <option value="en-US">English (US)</option>
            <option value="en-UK">English (UK)</option>
            <option value="fr-FR">Français</option>
            <option value="de-DE">Deutsch</option>
          </select>
        </div>
      </div>
    </footer>
  );
}
