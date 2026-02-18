import RoleProtectedRoute from "@/components/auth/RoleProtectedRoute";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
  Briefcase,
  Users,
  FileText,
  DollarSign,
  Plus,
} from "lucide-react";

export default function ClientDashboard() {
  return (
    <RoleProtectedRoute allowedRoles={["client"]}>
      <div className="min-h-screen bg-[#0B0F19] text-white">
        <DashboardHeader />

        <main className="p-6 space-y-8">
          {/* ===== PAGE HEADER ===== */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Client Dashboard</h1>
              <p className="text-gray-400 mt-1">
                Post jobs, review proposals, and manage freelancers.
              </p>
            </div>

            <button
              className="inline-flex items-center gap-2
                         bg-indigo-600 hover:bg-indigo-700
                         px-4 py-2 rounded-lg text-sm transition"
            >
              <Plus size={16} />
              Post a Job
            </button>
          </div>

          {/* ===== STATS ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Briefcase}
              label="Open Jobs"
              value="4"
              sub="Active listings"
            />
            <StatCard
              icon={FileText}
              label="Proposals"
              value="26"
              sub="Pending review"
            />
            <StatCard
              icon={Users}
              label="Hired Freelancers"
              value="3"
              sub="Currently working"
            />
            <StatCard
              icon={DollarSign}
              label="Total Spend"
              value="$3,120"
              sub="This month"
            />
          </div>

          {/* ===== MAIN GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ===== JOBS & PROPOSALS ===== */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold">
                Recent Job Posts
              </h2>

              {[1, 2, 3].map((job) => (
                <div
                  key={job}
                  className="p-5 rounded-2xl bg-[#0F1424]
                             border border-white/10
                             hover:border-indigo-500/40 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">
                        UI/UX Designer for SaaS App
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        12 proposals received
                      </p>
                    </div>

                    <span className="text-xs px-2 py-1 rounded-full
                                     bg-green-500/10 text-green-400">
                      Open
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Posted 1 day ago
                    </span>
                    <button
                      className="text-sm px-4 py-1.5 rounded-lg
                                 bg-indigo-600 hover:bg-indigo-700 transition"
                    >
                      View Proposals
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ===== RIGHT PANEL ===== */}
            <div className="space-y-6">
              {/* Active freelancers */}
              <div className="p-5 rounded-2xl bg-[#0F1424] border border-white/10">
                <h3 className="font-semibold mb-3">
                  Active Freelancers
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>👨‍💻 Aarav Mehta — Full-Stack Dev</li>
                  <li>🎨 Sophia Chen — UI/UX Designer</li>
                  <li>🤖 Daniel Cruz — AI Engineer</li>
                </ul>
              </div>

              {/* Hiring tips */}
              <div className="p-5 rounded-2xl bg-[#0F1424] border border-white/10">
                <h3 className="font-semibold mb-2">
                  Hiring Tips
                </h3>
                <p className="text-sm text-gray-400">
                  Clear job descriptions get 2× more qualified proposals.
                </p>
              </div>

              {/* Activity */}
              <div className="p-5 rounded-2xl bg-[#0F1424] border border-white/10">
                <h3 className="font-semibold mb-3">
                  Recent Activity
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>📥 New proposal received</li>
                  <li>💬 Message from freelancer</li>
                  <li>✅ Contract started</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </RoleProtectedRoute>
  );
}

/* ===== STAT CARD ===== */

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: any;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div
      className="p-5 rounded-2xl bg-[#0F1424]
                 border border-white/10
                 flex items-center gap-4"
    >
      <div className="w-10 h-10 rounded-xl bg-indigo-500/10
                      flex items-center justify-center">
        <Icon className="text-indigo-400" size={20} />
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>
    </div>
  );
}
