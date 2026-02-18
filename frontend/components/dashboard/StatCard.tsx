import { LucideIcon } from "lucide-react";
import Link from "next/link";

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
  const Card = (
    <div
      className="h-full p-5 rounded-2xl bg-[#0F1424]
                 border border-white/10
                 hover:border-indigo-500/40
                 transition flex gap-4"
    >
      <div className="w-11 h-11 rounded-xl bg-indigo-500/10
                      flex items-center justify-center">
        <Icon className="text-indigo-400" size={20} />
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xl font-semibold text-white">{value}</p>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">{sub}</span>
          {trend && (
            <span
              className={`text-xs font-medium ${
                trend.startsWith("+")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return href ? <Link href={href}>{Card}</Link> : Card;
}
