"use client";
import { useEffect, useState } from "react";

export default function VendorVerifyPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // On mount, load email from localStorage (set after signup)
  useEffect(() => {
    const storedEmail = localStorage.getItem("vendorSignupEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Countdown for resend
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vendors/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Verification successful! You can now log in.");
        localStorage.removeItem("vendorSignupEmail"); // cleanup
        setTimeout(() => {
          window.location.href = "/vendors/login";
        }, 2000);
      } else {
        setMessage(`❌ ${data.message || "Verification failed."}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network or server error.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vendors/resend-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("📨 Code resent! Check your inbox.");
        setCooldown(60); // 60s cooldown
      } else {
        setMessage(`❌ ${data.message || "Could not resend code."}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network or server error.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Verify Your Email</h1>
        <p className="text-gray-500 text-center mb-6">
          Enter the 6-digit code sent to <span className="font-medium text-gray-800">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full p-3 border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            disabled={resending || cooldown > 0}
            onClick={handleResend}
            className={`text-blue-600 hover:underline disabled:text-gray-400`}
          >
            {resending
              ? "Resending..."
              : cooldown > 0
              ? `Resend available in ${cooldown}s`
              : "Didn't receive a code? Resend"}
          </button>
        </div>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
