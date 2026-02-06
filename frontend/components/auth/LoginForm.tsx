"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // store token
      localStorage.setItem("token", res.data.token);

      // redirect
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-[#0b1220] border border-gray-800 rounded-xl p-6 space-y-4"
    >
      <h1 className="text-2xl font-semibold text-white">Login</h1>

      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm p-2 rounded">
          {error}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded py-2 text-white font-medium"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push("/forgot-password")}
          className="text-sm text-indigo-400 hover:underline"
        >
          Forgot password?
        </button>
      </div>
    </form>
  );
}
