"use client";

import { Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavbarSearch() {
  const { user } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const placeholder =
    user?.role === "client"
      ? "Search freelancers or services…"
      : user?.role === "freelancer"
      ? "Search jobs or skills…"
      : "Search freelancers, jobs…";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const path =
      user?.role === "freelancer" ? "/jobs" : "/freelancers";

    router.push(`${path}?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="hidden md:flex items-center gap-2
                 bg-white/5 border border-white/10
                 rounded-lg px-3 py-2 w-[320px]
                 focus-within:border-indigo-500/40"
    >
      <Search size={16} className="text-gray-400" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none
                   text-sm text-white w-full
                   placeholder:text-gray-500"
      />
    </form>
  );
}
