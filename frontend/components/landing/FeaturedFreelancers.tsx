"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, X, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

/* ================= TYPES ================= */

type RatingBreakdown = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

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
  href: string;
};

type SortKey = "rating" | "priceLow" | "priceHigh";

/* ================= DATA (API-ready) ================= */

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
    href: "/freelancers/aarav-mehta",
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
    href: "/freelancers/sophia-chen",
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
    href: "/freelancers/daniel-cruz",
  },
  {
    id: 4,
    name: "Fatima Noor",
    role: "Digital Marketer",
    rate: 35,
    rating: 4.7,
    reviews: 112,
    breakdown: { 5: 80, 4: 20, 3: 8, 2: 4, 1: 0 },
    verified: true,
    recommended: false,
    href: "/freelancers/fatima-noor",
  },
];

/* ================= ANIMATION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay },
  }),
};

/* ================= COMPONENT ================= */

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

  /* Lock scroll when modal open */
  useEffect(() => {
    if (!activeReview) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeReview]);

  return (
    <section className="bg-[#0F1424] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ===== Header ===== */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Featured freelancers
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Top-rated professionals, hand-picked for you.
            </p>
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-[#0B0F19] border border-white/10 text-sm
                       text-white rounded-lg px-3 py-2"
            aria-label="Sort freelancers"
          >
            <option value="rating">Sort by rating</option>
            <option value="priceLow">Price: low to high</option>
            <option value="priceHigh">Price: high to low</option>
          </select>
        </div>

        {/* ===== Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sorted.map((f, i) => (
            <motion.article
              key={f.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i * 0.06}
              className="relative rounded-2xl border border-white/10
                         bg-[#0B0F19] p-5 sm:p-6
                         hover:border-indigo-500/40
                         hover:-translate-y-1 hover:shadow-xl
                         transition"
            >
              {/* AI Recommended */}
              {f.recommended && (
                <span className="absolute top-3 right-3 flex items-center gap-1
                                 text-xs text-indigo-400">
                  <Sparkles size={14} />
                  AI Recommended
                </span>
              )}

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-indigo-600
                              flex items-center justify-center
                              text-white font-semibold mb-4">
                {f.name.charAt(0)}
              </div>

              <h3 className="text-white font-semibold">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.role}</p>

              {/* Rating */}
              <button
                onClick={() => setActiveReview(f)}
                className="mt-3 flex items-center gap-2
                           text-xs text-gray-400 hover:text-indigo-400"
                aria-label={`View reviews for ${f.name}`}
              >
                <Star size={14} className="text-yellow-400" />
                {f.rating} ({f.reviews} reviews)
              </button>

              {/* Verified */}
              {f.verified && (
                <div className="mt-2 flex items-center gap-1
                                text-xs text-indigo-400">
                  <ShieldCheck size={14} />
                  Verified
                </div>
              )}

              <p className="mt-4 text-indigo-400 font-medium">
                ${f.rate}/hr
              </p>

              {/* CTA */}
              {isClient ? (
                <Link
                  href={`/hire?freelancer=${f.id}`}
                  className="mt-4 block text-center
                             bg-indigo-600 hover:bg-indigo-700
                             text-white text-sm py-2 rounded-lg transition"
                >
                  Hire now
                </Link>
              ) : (
                <Link
                  href={f.href}
                  className="mt-4 block text-center
                             border border-white/15
                             text-white text-sm py-2 rounded-lg
                             hover:bg-white/5 transition"
                >
                  View profile
                </Link>
              )}
            </motion.article>
          ))}
        </div>
      </div>

      {/* ===== Review Modal ===== */}
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

/* ================= REVIEW MODAL ================= */

function ReviewModal({
  freelancer,
  onClose,
}: {
  freelancer: Freelancer;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60
                 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ scale: 0.96, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 20 }}
        className="bg-[#0B0F19] rounded-2xl p-6
                   w-full max-w-md border border-white/10"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold">
            Reviews for {freelancer.name}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close reviews"
            className="text-gray-400 hover:text-white"
          >
            <X />
          </button>
        </div>

        {/* Star Breakdown */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = freelancer.breakdown[star as keyof RatingBreakdown];
            const percent =
              freelancer.reviews > 0
                ? (count / freelancer.reviews) * 100
                : 0;

            return (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-10 text-gray-400">{star}★</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-10 text-gray-400 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
