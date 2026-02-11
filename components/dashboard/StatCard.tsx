"use client";

import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  trend?: string; // +12%, -5%
  href?: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  trend,
  href,
}: StatCardProps) {
  const isPositive = trend?.startsWith("+");

  const CardContent = (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative h-full p-6 rounded-3xl bg-[#020617]
                 border border-white/5 overflow-hidden group
                 hover:border-indigo-500/30 transition-colors"
    >
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />

      <div className="relative flex flex-col h-full justify-between gap-4">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5
                          flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <Icon size={22} />
          </div>

          {trend && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase
              ${isPositive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend}
            </div>
          )}
        </div>

        <div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">
            {label}
          </p>
          <h3 className="text-3xl font-black text-white tracking-tighter">
            {value}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] font-medium text-gray-400">
              {sub}
            </span>
            <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isPositive ? "70%" : "30%" }}
                className={`h-full rounded-full ${isPositive ? "bg-indigo-500" : "bg-gray-700"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full">
      {href ? (
        <Link href={href} className="block h-full outline-none">
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}
    </div>
  );
}