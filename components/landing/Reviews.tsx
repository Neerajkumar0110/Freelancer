"use client";

import { motion } from "framer-motion";
import {
  Star, CheckCircle, Quote, Users, ShieldCheck,
  Globe, Lock, Scale, Zap, Building2, BarChart3,
  Calendar, ChevronLeft, ChevronRight
} from "lucide-react";
import { useRef } from "react";

/* ================= DATA ================= */
const REVIEWS = [
  { id: 1, name: "Alexander Voss", role: "CTO at NexusFlow", content: "We've been using this terminal for 4 years. The quality of vetted freelancers is unmatched. It’s not just a platform; it’s an extension of our engineering team.", rating: 5, date: "March 12, 2025", verified: true, avatar: "https://i.pravatar.cc/150?u=alex" },
  { id: 2, name: "Sarah Jenkins", role: "Project Manager", content: "The dispute resolution and secure escrow gave us the confidence to scale our operations globally. Finally, a platform that takes security as seriously as we do.", rating: 5, date: "Feb 28, 2025", verified: true, avatar: "https://i.pravatar.cc/150?u=sarah" },
  { id: 3, name: "Marcus Thorne", role: "Independent Consultant", content: "Transparent fees and a constant stream of high-ticket projects. I moved my entire book of business here three years ago and never looked back.", rating: 4, date: "Jan 15, 2025", verified: true, avatar: "https://i.pravatar.cc/150?u=marcus" },
  { id: 4, name: "Elena Rodriguez", role: "Head of Product", content: "Finding specialized AI engineers used to take months. Here, we found our lead dev in 48 hours. The vetting process is rigorous and it shows.", rating: 5, date: "March 05, 2025", verified: true, avatar: "https://i.pravatar.cc/150?u=elena" },
  { id: 5, name: "David Chen", role: "Startup Founder", content: "As a non-technical founder, the project management tools integrated into the platform were a lifesaver. Clear milestones, clear payments.", rating: 5, date: "Feb 10, 2025", verified: true, avatar: "https://i.pravatar.cc/150?u=david" },
  { id: 6, name: "Sophia Wright", role: "Design Lead", content: "The caliber of clients here is different. They understand the value of high-quality design and are willing to pay market rates for it.", rating: 5, date: "March 01, 2025", verified: true, avatar: "https://i.pravatar.cc/150?u=sophia" },
  { id: 7, name: "Jameson K.", role: "Smart Contract Dev", content: "The escrow system is built for the modern era. No more chasing invoices. Once the code is pushed and verified, the funds are released.", rating: 5, date: "Jan 22, 2025", verified: true, avatar: "https://i.pravatar.cc/150?u=james" },
  { id: 8, name: "Linda M.", role: "Marketing Director", content: "Scaling our content team was seamless. The ability to manage 15+ freelancers in one dashboard saved us at least 20 hours a week.", rating: 4, date: "Dec 18, 2024", verified: true, avatar: "https://i.pravatar.cc/150?u=linda" },
  { id: 9, name: "Robert Fox", role: "Venture Partner", content: "We recommend this platform to all our portfolio companies. It is the most reliable way to fill talent gaps during rapid growth phases.", rating: 5, date: "March 09, 2025", verified: true, avatar: "https://i.pravatar.cc/150?u=robert" },
  { id: 10, name: "Amara Singh", role: "Full Stack Engineer", content: "I've tried every platform out there. This is the only one that feels like it was built by developers, for developers.", rating: 5, date: "Feb 14, 2025", verified: true, avatar: "https://i.pravatar.cc/150?u=amara" },
  { id: 11, name: "Kevin Peterson", role: "Operations Manager", content: "The automated tax compliance alone is worth the platform fee. Hiring globally used to be a legal nightmare; now it's a click.", rating: 5, date: "March 11, 2025", verified: true, avatar: "https://i.pravatar.cc/150?u=kevin" },
  { id: 12, name: "Rachel Tan", role: "Creative Director", content: "From high-end motion graphics to brand strategy, the talent pool here is incredibly deep. It's my secret weapon for agency work.", rating: 5, date: "Feb 05, 2025", verified: true, avatar: "https://i.pravatar.cc/150?u=rachel" },
];

const STATS = [
  { label: "Active Clients", value: "12,000+", icon: Users },
  { label: "Volume Processed", value: "$500M+", icon: BarChart3 },
  { label: "Success Rate", value: "99.8%", icon: ShieldCheck },
  { label: "Active Countries", value: "150+", icon: Globe },
];

/* ================= COMPONENT ================= */

export default function ReviewSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#020617] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* --- SECTION 1: THE TRUST HERO --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <Zap size={12} className="fill-indigo-400" /> Five Years of Market Leadership
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9]">
              Built on <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Proven Results.</span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full group-hover:bg-indigo-500/20 transition-colors" />
            <Quote className="text-indigo-500/20 mb-6" size={48} />
            <p className="text-xl text-gray-300 font-medium leading-relaxed italic relative z-10">
              "We have processed over 450k project milestones with a 99.8% success rate. Our protocol is designed for enterprises that cannot afford failure."
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-white/10" />
              <div>
                <p className="text-sm font-black text-white tracking-tight">System Protocol Integrity</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Core Governance</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: THE REVIEW SLIDER --- */}
        <div className="space-y-10">
          <div className="flex items-center justify-between px-2">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white tracking-tight italic">Verified Intelligence</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Encrypted Review Chain</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scroll("left")} className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => scroll("right")} className="p-3 rounded-xl bg-indigo-600 border border-indigo-500 text-white hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-8"
          >
            {REVIEWS.map((review) => (
              <motion.div
                key={review.id}
                className="min-w-[350px] md:min-w-[450px] snap-start bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-[2.5rem] p-8 space-y-6 relative flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-0.5 text-amber-500">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} className="fill-amber-500" />)}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      <Calendar size={12} /> {review.date}
                    </div>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed font-medium">"{review.content}"</p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 overflow-hidden border border-white/10">
                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-white tracking-tight">{review.name}</h4>
                    <p className="text-[9px] text-indigo-400 font-black uppercase tracking-widest">{review.role}</p>
                  </div>
                  {review.verified && (
                    <CheckCircle className="text-emerald-500" size={16} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}