// src/app/vendor/verify-token/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Disable static generation for this page since it uses client-side features
export const dynamic = 'force-dynamic';

export default function VerifyTokenPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", code: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      try { data = JSON.parse(text); } catch { throw new Error(`Invalid response: ${text}`); }

      if (!res.ok) throw new Error(data.message || "Verification failed");

      setMessage("Code verified. A login link has been sent to your email. Check your mailbox.");
      // optionally redirect to a 'check email' page
    } catch (err) {
      setMessage(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Verify your account</h2>
        <p className="text-sm text-gray-600 mb-4">Enter the code we sent to your email.</p>

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
          <button disabled={loading} className="w-full bg-blue-700 text-white p-3 rounded">
            {loading ? "Verifying..." : "Verify code"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
