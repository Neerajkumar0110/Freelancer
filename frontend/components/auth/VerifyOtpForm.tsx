"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function VerifyOtpForm() {
  const router = useRouter();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);

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
     COUNTDOWN TIMER
  ======================= */
  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setTimeout(
      () => setSeconds((s) => s - 1),
      1000
    );
    return () => clearTimeout(timer);
  }, [seconds]);

  /* =======================
     OTP INPUT HANDLERS
  ======================= */
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      inputsRef.current[index - 1]
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pasted.length === 0) return;

    const nextOtp = pasted
      .split("")
      .concat(Array(6 - pasted.length).fill(""));

    setOtp(nextOtp);
    inputsRef.current[Math.min(pasted.length - 1, 5)]?.focus();
  };

  /* =======================
     VERIFY OTP
  ======================= */
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/verify-otp", {
        email,
        otp: code,
      });

      router.push("/reset-password");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     RESEND OTP
  ======================= */
  const handleResend = async () => {
    if (seconds > 0) return;

    setError(null);
    setResendLoading(true);

    try {
      await api.post("/auth/resend-otp", { email });
      setOtp(Array(6).fill(""));
      setSeconds(60);
      inputsRef.current[0]?.focus();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to resend OTP"
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleVerify}
      className="bg-[#0b1220] border border-gray-800 rounded-xl p-6 space-y-6"
    >
      <h1 className="text-2xl font-semibold text-white text-center">
        Verify OTP
      </h1>

      <p className="text-sm text-gray-400 text-center">
        Enter the 6-digit code sent to your email
      </p>

      {/* OTP INPUTS */}
      <div
        className="flex justify-center gap-2"
        onPaste={handlePaste}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={loading || resendLoading}
            onChange={(e) =>
              handleChange(index, e.target.value)
            }
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl bg-black border border-gray-700 rounded text-white focus:border-indigo-500 outline-none disabled:opacity-50"
          />
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm p-2 rounded text-center">
          {error}
        </div>
      )}

      {/* VERIFY */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded py-2 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {/* RESEND */}
      <div className="text-center text-sm text-gray-400">
        {seconds > 0 ? (
          <span>Resend OTP in {seconds}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading}
            className="text-indigo-400 hover:underline disabled:opacity-50"
          >
            {resendLoading ? "Resending..." : "Resend OTP"}
          </button>
        )}
      </div>
    </form>
  );
}
