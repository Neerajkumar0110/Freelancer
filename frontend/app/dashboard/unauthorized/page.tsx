"use client";

import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white space-y-4">
      <h1 className="text-3xl font-bold">403 – Unauthorized</h1>
      <p className="text-gray-400">
        You don’t have access to this page.
      </p>

      <button
        onClick={() => router.push("/dashboard")}
        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
