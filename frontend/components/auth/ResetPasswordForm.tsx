"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* =======================
     PASSWORD RULES
  ======================= */
  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isStrongPassword = Object.values(rules).every(Boolean);

  /* =======================
     LOAD EMAIL
  ======================= */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedEmail = sessionStorage.getItem("reset_email");
    if (!storedEmail) {
      router.replace("/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  /* =======================
     SUBMIT
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isStrongPassword) {
      setError("Password does not meet strength requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email,
        newPassword: password,
      });

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("reset_email");
      }

      setSuccess("Password reset successfully. Redirecting to login...");

      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to reset password. Please try again."
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
        Reset Password
      </h1>

      {/* PASSWORD RULES */}
      <ul className="text-sm space-y-1">
        <li className={rules.length ? "text-green-400" : "text-gray-400"}>
          • At least 8 characters
        </li>
        <li className={rules.uppercase ? "text-green-400" : "text-gray-400"}>
          • One uppercase letter
        </li>
        <li className={rules.lowercase ? "text-green-400" : "text-gray-400"}>
          • One lowercase letter
        </li>
        <li className={rules.number ? "text-green-400" : "text-gray-400"}>
          • One number
        </li>
        <li className={rules.special ? "text-green-400" : "text-gray-400"}>
          • One special character
        </li>
      </ul>

      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm p-2 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 text-green-400 text-sm p-2 rounded">
          {success}
        </div>
      )}

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="New password"
        className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        required
      />

      {/* CONFIRM PASSWORD */}
      <input
        type="password"
        placeholder="Confirm password"
        className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={loading}
        required
      />

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading || !isStrongPassword}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded py-2 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
