"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VendorVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  // Pre-fill email from search params or localStorage
  useEffect(() => {
    const paramEmail = searchParams.get("email");
    if (paramEmail) setEmail(paramEmail);
    else {
      const storedEmail = localStorage.getItem("vendorSignupEmail");
      if (storedEmail) setEmail(storedEmail);
    }
  }, [searchParams]);

  // Cooldown timer for resending
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Submit verification code
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/vendor/auth/verify-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Verification failed");

      setMessage("✅ Code verified! A login link has been sent to your email.");
      localStorage.removeItem("vendorSignupEmail");

      setTimeout(() => router.push("/vendor/login"), 2500);
    } catch (err) {
      setMessage(err.message || "❌ Network or server error");
    } finally {
      setLoading(false);
    }
  };

  // Resend verification code
  const handleResend = async () => {
    setResending(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/vendor/auth/resend-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Could not resend code");

      setMessage("📨 Code resent! Check your inbox.");
      setCooldown(60);
    } catch (err) {
      setMessage(err.message || "❌ Network or server error");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Verify your account</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter the 6-digit code sent to <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
          />
          <input
            type="text"
            placeholder="Verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white p-3 rounded hover:bg-blue-800 transition"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            disabled={resending || cooldown > 0}
            onClick={handleResend}
            className="text-blue-600 hover:underline disabled:text-gray-400"
          >
            {resending
              ? "Resending..."
              : cooldown > 0
              ? `Resend available in ${cooldown}s`
              : "Didn't receive a code? Resend"}
          </button>
        </div>

        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
