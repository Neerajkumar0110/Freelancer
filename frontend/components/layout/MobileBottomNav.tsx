"use client";

import Link from "next/link";
import { Home, Briefcase, Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const items = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/hire", icon: Briefcase, label: "Work" },
    { href: "/notifications", icon: Bell, label: "Alerts" },
    {
      href: user.role === "client" ? "/dashboard/client" : "/dashboard/freelancer",
      icon: User,
      label: "Profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden
                    bg-[#0B0F19]/95 backdrop-blur border-t border-white/10">
      <div className="flex justify-around py-2">
        {items.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center text-xs
                ${active ? "text-indigo-500" : "text-gray-400"}`}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
