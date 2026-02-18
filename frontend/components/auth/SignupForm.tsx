"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function SignupForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
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
     SUBMIT
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isStrongPassword) {
      return setError("Password does not meet strength requirements");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      await api.post("/auth/signup", {
        full_name: fullName,
        email,
        password,
        role,
      });

      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0b1220] border border-gray-800 rounded-xl p-6 space-y-4"
    >
      <h1 className="text-2xl font-semibold text-white">Create Account</h1>

      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm p-2 rounded">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Full name"
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

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white"
      >
        <option value="client">Client</option>
        <option value="freelancer">Freelancer</option>
      </select>

      {/* PASSWORD RULES */}
      <div className="text-sm space-y-1">
        <p className={rules.length ? "text-green-400" : "text-gray-400"}>
          • At least 8 characters
        </p>
        <p className={rules.uppercase ? "text-green-400" : "text-gray-400"}>
          • One uppercase letter
        </p>
        <p className={rules.lowercase ? "text-green-400" : "text-gray-400"}>
          • One lowercase letter
        </p>
        <p className={rules.number ? "text-green-400" : "text-gray-400"}>
          • One number
        </p>
        <p className={rules.special ? "text-green-400" : "text-gray-400"}>
          • One special character
        </p>
      </div>

      <input
        type="password"
        placeholder="Password"
        className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirm password"
        className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading || !isStrongPassword}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded py-2 text-white font-medium disabled:opacity-50"
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
