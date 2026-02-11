"use client";

import { useState } from "react";
import { Briefcase, DollarSign, Clock } from "lucide-react";

export default function PostJobForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 🚀 API call will go here later
    setTimeout(() => {
      setLoading(false);
      alert("Job posted successfully (UI only)");
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0F1424] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8"
      >
        {/* ===== HEADER ===== */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Post a Job
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Describe your project and start receiving proposals.
          </p>
        </div>

        {/* ===== JOB TITLE ===== */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Job Title
          </label>
          <input
            type="text"
            placeholder="e.g. Full-stack developer for SaaS app"
            required
            className="w-full bg-black border border-white/10
                       rounded-lg px-4 py-2 text-white
                       focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* ===== DESCRIPTION ===== */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Job Description
          </label>
          <textarea
            rows={5}
            placeholder="Describe your project, requirements, and expectations..."
            required
            className="w-full bg-black border border-white/10
                       rounded-lg px-4 py-2 text-white
                       focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* ===== SKILLS ===== */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Required Skills
          </label>
          <input
            type="text"
            placeholder="React, Node.js, MongoDB"
            className="w-full bg-black border border-white/10
                       rounded-lg px-4 py-2 text-white
                       focus:outline-none focus:border-indigo-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Separate skills with commas
          </p>
        </div>

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* BUDGET */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Budget
            </label>
            <div className="relative">
              <DollarSign
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="number"
                placeholder="1000"
                className="w-full pl-8 bg-black border border-white/10
                           rounded-lg px-4 py-2 text-white
                           focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* PAYMENT TYPE */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Payment Type
            </label>
            <select
              className="w-full bg-black border border-white/10
                         rounded-lg px-4 py-2 text-white
                         focus:outline-none focus:border-indigo-500"
            >
              <option>Hourly</option>
              <option>Fixed price</option>
            </select>
          </div>
        </div>

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* EXPERIENCE */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Experience Level
            </label>
            <select
              className="w-full bg-black border border-white/10
                         rounded-lg px-4 py-2 text-white
                         focus:outline-none focus:border-indigo-500"
            >
              <option>Entry</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>
          </div>

          {/* DURATION */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Project Duration
            </label>
            <div className="relative">
              <Clock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                className="w-full pl-8 bg-black border border-white/10
                           rounded-lg px-4 py-2 text-white
                           focus:outline-none focus:border-indigo-500"
              >
                <option>Less than 1 month</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
                <option>Ongoing</option>
              </select>
            </div>
          </div>
        </div>

        {/* ===== VISIBILITY ===== */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Job Visibility
          </label>
          <select
            className="w-full bg-black border border-white/10
                       rounded-lg px-4 py-2 text-white
                       focus:outline-none focus:border-indigo-500"
          >
            <option>Public (recommended)</option>
            <option>Invite only</option>
          </select>
        </div>

        {/* ===== CTA ===== */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-sm
                       border border-white/15 text-white
                       hover:bg-white/5 transition"
          >
            Save draft
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg text-sm font-medium
                       bg-indigo-600 hover:bg-indigo-700
                       text-white transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
