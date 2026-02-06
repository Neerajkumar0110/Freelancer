"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0b1220] border border-gray-800 rounded-xl p-6 space-y-4"
    >
      <h1 className="text-2xl font-semibold text-white">Forgot Password</h1>

      {message && (
        <div className="bg-green-500/10 text-green-400 text-sm p-2 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm p-2 rounded">
          {error}
        </div>
      )}

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded py-2 text-white font-medium"
      >
        {loading ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
}
