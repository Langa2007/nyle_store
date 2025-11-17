"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function VerifyTokenForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailParam = searchParams.get("email") || "";
  const [form, setForm] = useState({ email: emailParam, code: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
        throw new Error(`Invalid response from server: ${text}`);
      }

      if (!res.ok) throw new Error(data.message || "Verification failed");

      setMessage("✅ Code verified! A login link has been sent to your email.");
      setTimeout(() => router.push("/vendor/login"), 2500);
    } catch (err) {
      setMessage(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Verify your account</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter the code we sent to your email to verify your account.
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
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}

export default function VerifyTokenPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading verification page...</div>}>
      <VerifyTokenForm />
    </Suspense>
  );
}
