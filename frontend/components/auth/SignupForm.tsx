"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function SignupForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("freelancer");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await api.post("/auth/signup", {
        full_name: fullName,
        email,
        password,
        role,
      });

      setSuccess(res.data.message || "Signup successful 🎉");

      // Redirect after short delay
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="bg-[#0b1220] border border-gray-800 rounded-xl p-6 space-y-4"
    >
      <h1 className="text-2xl font-semibold text-white">Create Account</h1>

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

      <input
        type="text"
        placeholder="Full Name"
        className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

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

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white"
      >
        <option value="freelancer">Freelancer</option>
        <option value="client">Client</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded py-2 text-white font-medium"
      >
        {loading ? "Creating account..." : "Sign Up"}
      </button>

      <p className="text-sm text-gray-400 text-center">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-indigo-400 hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
}
