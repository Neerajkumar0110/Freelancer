"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* =======================
     SUBMIT
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your registered email");
      return;
    }

    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });

      // Store email for OTP / reset step
      if (typeof window !== "undefined") {
        sessionStorage.setItem("reset_email", email);
      }

      setMessage(
        res.data?.message ||
          "OTP has been sent to your email"
      );

      // Smooth redirect
      setTimeout(() => {
        router.push("/verify-otp");
      }, 1500);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0b1220] border border-gray-800 rounded-xl p-6 space-y-4"
    >
      <h1 className="text-2xl font-semibold text-white">
        Forgot Password
      </h1>

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

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Enter your registered email"
        className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required
      />

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded py-2 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
    </form>
  );
}
