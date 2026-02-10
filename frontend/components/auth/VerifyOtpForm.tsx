"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOtpForm() {
  const router = useRouter();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]); 

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("reset_email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const nextOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (i < 6) nextOtp[i] = char;
    });
    setOtp(nextOtp);
    
    const focusIndex = Math.min(pasted.length, 5);
    inputsRef.current[focusIndex]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/reset-password");
    }, 1500);
  };

  const handleResend = () => {
    if (seconds > 0) return;
    setError(null);
    setResendLoading(true);

    setTimeout(() => {
      setResendLoading(false);
      setSeconds(60);
      setOtp(Array(6).fill(""));
      inputsRef.current[0]?.focus();
      alert("Mock: OTP Resent successfully!");
    }, 1000);
  };

  return (
    <form
      onSubmit={handleVerify}
      className="bg-[#0b1220] border border-gray-800 rounded-xl p-6 space-y-6"
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-white">Verify OTP</h1>
        <p className="text-sm text-gray-400">
          Enter the code sent to {email || "your email"}
        </p>
      </div>

      <div className="flex justify-center gap-2" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
                inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={loading || resendLoading}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl bg-black border border-gray-700 rounded text-white focus:border-indigo-500 outline-none focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
          />
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded text-center">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition rounded-lg py-2.5 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <div className="text-center text-sm text-gray-400">
        {seconds > 0 ? (
          <span>Resend code in <span className="text-white font-medium">{seconds}s</span></span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading}
            className="text-indigo-400 hover:text-indigo-300 hover:underline transition disabled:opacity-50"
          >
            {resendLoading ? "Sending..." : "Resend Code"}
          </button>
        )}
      </div>
    </form>
  );
}