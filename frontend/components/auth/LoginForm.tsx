"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* =======================
     SUBMIT
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const user = res.data.user;
      const role = user.role.toLowerCase();

      // Redirect based on role
      const redirectTo =
        role === "client"
          ? "/dashboard/client"
          : "/dashboard/freelancer";

      // AuthContext handles storage + state
      login(res.data.token, user, redirectTo);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Invalid email or password"
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
        Login
      </h1>

      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm p-2 rounded">
          {error}
        </div>
      )}

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required
      />

      {/* PASSWORD */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white pr-12 focus:outline-none focus:border-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white"
          tabIndex={-1}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* FORGOT PASSWORD */}
      <div className="flex justify-end text-sm">
        <button
          type="button"
          onClick={() => router.push("/forgot-password")}
          className="text-indigo-400 hover:underline"
          disabled={loading}
        >
          Forgot password?
        </button>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded py-2 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* SIGNUP */}
      <p className="text-sm text-gray-400 text-center">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="text-indigo-400 hover:underline"
          disabled={loading}
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
