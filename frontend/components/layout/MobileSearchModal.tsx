"use client";

import { X, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MobileSearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState("");

  if (!open) return null;

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

    onClose();
    router.push(`${path}?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
          <span className="font-semibold text-white">Search</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Input */}
        <form onSubmit={onSubmit} className="p-4">
          <div className="flex items-center gap-3
                          bg-white/5 border border-white/10
                          rounded-xl px-4 py-3
                          focus-within:border-indigo-500/40">
            <Search size={18} className="text-gray-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="bg-transparent w-full outline-none
                         text-white placeholder:text-gray-500"
            />
          </div>
        </form>

        {/* Future content area */}
        <div className="flex-1 px-4 pt-2 text-sm text-gray-400">
          Type to search jobs, freelancers, or skills
        </div>
      </div>
    </div>
  );
}
