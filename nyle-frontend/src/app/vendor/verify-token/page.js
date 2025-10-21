"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Disable static generation for this page since it uses client-side features
export const dynamic = 'force-dynamic';

export default function VerifyTokenPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Capture email from signup redirect query (?email=example@gmail.com)
  const prefilledEmail = searchParams.get("email") || "";

  const [form, setForm] = useState({ email: prefilledEmail, code: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Use your backend URL (Render or local)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/vendor/auth/verify-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Invalid response: ${text}`);
      }

      if (!res.ok) throw new Error(data.message || "Verification failed");

      setMessage("✅ Code verified successfully! Redirecting to login...");
      setTimeout(() => router.push("/vendor/login"), 2500);
    } catch (err) {
      console.error("Verification error:", err);
      setMessage(`❌ ${err.message || "Verification failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
          Verify Your Account
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter the code sent to your email to activate your vendor account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            name="code"
            type="text"
            placeholder="Verification code"
            required
            value={form.code}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <button
            disabled={loading}
            className="w-full bg-blue-700 text-white p-3 rounded hover:bg-blue-800 transition"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.startsWith("✅")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
