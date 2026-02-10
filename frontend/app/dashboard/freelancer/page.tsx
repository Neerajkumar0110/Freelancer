"use client";

import RoleProtectedRoute from "@/components/auth/RoleProtectedRoute";
import {
  Briefcase,
  DollarSign,
  Send,
  Eye,
  LucideIcon,
} from "lucide-react";

/* ================= MOCK DATA (API-READY) ================= */

const stats = [
  {
    icon: DollarSign,
    label: "Earnings",
    value: "$2,450",
    sub: "This month",
  },
  {
    icon: Briefcase,
    label: "Active Jobs",
    value: "3",
    sub: "In progress",
  },
  {
    icon: Send,
    label: "Proposals",
    value: "12",
    sub: "Sent",
  },
  {
    icon: Eye,
    label: "Profile Views",
    value: "148",
    sub: "Last 7 days",
  },
];

const recommendedJobs = [
  {
    id: 1,
    title: "Full-stack Developer Needed",
    skills: "React · Node · MongoDB",
    rate: "$40–$60/hr",
    description:
      "Looking for an experienced developer to build and maintain a SaaS platform.",
    posted: "2 hours ago",
  },
  {
    id: 2,
    title: "Frontend Engineer (Next.js)",
    skills: "Next.js · Tailwind · API",
    rate: "$35–$50/hr",
    description:
      "Need a frontend expert to implement a modern dashboard UI.",
    posted: "5 hours ago",
  },
  {
    id: 3,
    title: "Backend API Developer",
    skills: "Node · Express · PostgreSQL",
    rate: "$45–$65/hr",
    description:
      "Design and build scalable REST APIs for a growing product.",
    posted: "1 day ago",
  },
];

/* ================= PAGE ================= */

export default function FreelancerDashboard() {
  return (
    <RoleProtectedRoute allowedRoles={["freelancer"]}>
      {/* ===== PAGE INTRO ===== */}
      <div className="mb-6">
        <p className="text-gray-400">
          Browse jobs, submit proposals, and track your earnings.
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* ===== JOB FEED ===== */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Recommended Jobs</h2>

          {recommendedJobs.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl bg-[#0F1424]
                         border border-white/10
                         hover:border-indigo-500/40 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-white">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {job.skills}
                  </p>
                </div>

                <span className="text-sm text-indigo-400">
                  {job.rate}
                </span>
              </div>

              <p className="text-sm text-gray-400 mt-3 line-clamp-2">
                {job.description}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Posted {job.posted}
                </span>
                <button
                  className="text-sm px-4 py-1.5 rounded-lg
                             bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ===== RIGHT PANEL ===== */}
        <div className="space-y-6">
          <Panel title="Profile Completion">
            <Progress value={75} />
            <p className="text-xs text-gray-400 mt-2">
              Add portfolio to improve visibility
            </p>
          </Panel>

          <Panel title="Availability">
            <p className="text-sm text-green-400">
              Available for new work
            </p>
          </Panel>

          <Panel title="Recent Activity">
            <ul className="space-y-2 text-sm text-gray-400">
              <li>✅ Proposal viewed by client</li>
              <li>💬 New message received</li>
              <li>⭐ Client left a review</li>
            </ul>
          </Panel>
        </div>
      </div>
    </RoleProtectedRoute>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div
      className="p-5 rounded-2xl bg-[#0F1424]
                 border border-white/10
                 hover:border-indigo-500/40 transition
                 flex gap-4"
    >
      <div
        className="w-10 h-10 rounded-xl bg-indigo-500/10
                   flex items-center justify-center"
      >
        <Icon className="text-indigo-400" size={20} />
      </div>

      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xl font-semibold text-white">{value}</p>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-2xl bg-[#0F1424] border border-white/10">
      <h3 className="font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-indigo-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
