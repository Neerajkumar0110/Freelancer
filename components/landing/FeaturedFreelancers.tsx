"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, ShieldCheck, X, Sparkles, ArrowUpRight, TrendingUp, Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

/* ================= TYPES ================= */

type RatingBreakdown = { 1: number; 2: number; 3: number; 4: number; 5: number };

type Freelancer = {
  id: number;
  name: string;
  role: string;
  rate: number;
  rating: number;
  reviews: number;
  breakdown: RatingBreakdown;
  verified: boolean;
  recommended: boolean;
  image: string;
  tags: string[];
};

type SortKey = "rating" | "priceLow" | "priceHigh";

/* ================= DATA ================= */

const freelancers: Freelancer[] = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Full-Stack Developer",
    rate: 45,
    rating: 4.9,
    reviews: 128,
    breakdown: { 5: 96, 4: 22, 3: 8, 2: 2, 1: 0 },
    verified: true,
    recommended: true,
    image: "https://i.pravatar.cc/150?u=aarav",
    tags: ["Next.js", "Python"],
  },
  {
    id: 3,
    name: "Daniel Cruz",
    role: "AI Engineer",
    rate: 60,
    rating: 5.0,
    reviews: 74,
    breakdown: { 5: 74, 4: 0, 3: 0, 2: 0, 1: 0 },
    verified: true,
    recommended: true,
    image: "https://i.pravatar.cc/150?u=daniel",
    tags: ["LLMs", "PyTorch"],
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "UI / UX Designer",
    rate: 40,
    rating: 4.8,
    reviews: 96,
    breakdown: { 5: 70, 4: 18, 3: 6, 2: 2, 1: 0 },
    verified: true,
    recommended: false,
    image: "https://i.pravatar.cc/150?u=sophia",
    tags: ["Figma", "Branding"],
  },
  {
    id: 4,
    name: "Fatima Noor",
    role: "Growth Marketer",
    rate: 35,
    rating: 4.7,
    reviews: 112,
    breakdown: { 5: 80, 4: 20, 3: 8, 2: 4, 1: 0 },
    verified: true,
    recommended: false,
    image: "https://i.pravatar.cc/150?u=fatima",
    tags: ["SEO", "Ads"],
  },
];

/* ================= COMPONENT: TALENT CARD ================= */

function TalentCard({ f, isClient, onReviewClick }: { f: Freelancer; isClient: boolean; onReviewClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl border border-white/5 bg-[#0B0F19]/50 backdrop-blur-sm p-6 hover:border-indigo-500/30 hover:bg-[#0B0F19] transition-all duration-500"
    >
      {/* 1. STATUS BADGES */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2">
          {f.recommended && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-[10px] font-black uppercase tracking-widest text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Sparkles size={10} className="animate-pulse" /> AI Match
            </span>
          )}
          {f.verified && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400/80">
              <ShieldCheck size={12} /> Vetted
            </span>
          )}
        </div>
        <div className="text-right">
          <p className="text-xl font-black text-white">${f.rate}<span className="text-xs text-gray-500 font-medium">/hr</span></p>
        </div>
      </div>

      {/* 2. AVATAR & INFO */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/5 group-hover:border-indigo-500/50 transition-colors">
          <Image src={f.image} alt={f.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white leading-tight">{f.name}</h3>
          <p className="text-sm text-gray-400 font-medium">{f.role}</p>
        </div>
      </div>

      {/* 3. SKILLS TAGS */}
      <div className="flex flex-wrap gap-2 mb-6">
        {f.tags.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5">
            {tag}
          </span>
        ))}
      </div>

      {/* 4. RATING BUTTON */}
      <button
        onClick={onReviewClick}
        className="flex items-center gap-2 mb-8 text-xs text-gray-500 hover:text-indigo-400 transition-colors"
      >
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className={i < Math.floor(f.rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-700"} />
          ))}
        </div>
        <span className="font-bold text-gray-300">{f.rating}</span>
        <span className="opacity-50">({f.reviews} reviews)</span>
      </button>

      {/* 5. CTA ACTION */}
      <Link
        href={isClient ? `/hire?freelancer=${f.id}` : `/freelancers/${f.id}`}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
          ${isClient
            ? "bg-white text-black hover:bg-indigo-500 hover:text-white"
            : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
          }`}
      >
        {isClient ? "Initiate Project" : "View Portfolio"}
        <ArrowUpRight size={16} />
      </Link>
    </motion.div>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function FeaturedFreelancers() {
  const { user } = useAuth();
  const isClient = user?.role?.toLowerCase() === "client";
  const [sort, setSort] = useState<SortKey>("rating");
  const [activeReview, setActiveReview] = useState<Freelancer | null>(null);

  const sorted = useMemo(() => {
    return [...freelancers].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "priceLow") return a.rate - b.rate;
      return b.rate - a.rate;
    });
  }, [sort]);

  return (
    <section className="relative bg-[#020617] py-24 lg:py-32 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ===== HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
              <TrendingUp size={12} /> Curated Talent
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              World-Class <span className="text-gray-500">Experts.</span>
            </h2>
          </div>

          <div className="relative group">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="appearance-none bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest
                         text-white rounded-2xl px-6 py-4 pr-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-white/10"
            >
              <option value="rating">Top Rated</option>
              <option value="priceLow">Budget Friendly</option>
              <option value="priceHigh">Elite Tier</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <Info size={14} />
            </div>
          </div>
        </div>

        {/* ===== GRID ===== */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {sorted.map((f) => (
              <TalentCard
                key={f.id}
                f={f}
                isClient={isClient}
                onReviewClick={() => setActiveReview(f)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ===== REVIEW MODAL ===== */}
      <AnimatePresence>
        {activeReview && (
          <ReviewModal
            freelancer={activeReview}
            onClose={() => setActiveReview(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ================= COMPONENT: REVIEW MODAL ================= */

function ReviewModal({ freelancer, onClose }: { freelancer: Freelancer; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="bg-[#0B0F19] border border-white/10 rounded-[32px] p-8 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">Verified Reviews</h3>
            <p className="text-sm text-gray-500 font-medium">Historical performance for {freelancer.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X className="text-gray-400" /></button>
        </div>

        <div className="space-y-4">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = freelancer.breakdown[star as keyof RatingBreakdown];
            const percent = (count / freelancer.reviews) * 100;
            return (
              <div key={star} className="flex items-center gap-4">
                <span className="w-8 text-xs font-bold text-gray-400">{star}★</span>
                <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  />
                </div>
                <span className="w-8 text-xs font-black text-white text-right">{count}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-center">
          <p className="text-xs text-indigo-300 font-bold uppercase tracking-[0.2em]">Platform Authenticity</p>
          <p className="text-[10px] text-indigo-400/60 mt-1">Every review is tied to a verified smart contract payment.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}