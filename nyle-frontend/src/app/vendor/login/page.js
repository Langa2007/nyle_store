"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function VendorLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const router = useRouter();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Existing Login handler (keep as is)
  const handleLogin = async (e) => {
    // ... your existing login logic ...
  };

  // ✅ NEW: Handler for "Forgot Password" request
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      alert("Please enter your email address");
      return;
    }

    setResetLoading(true);
    try {
      console.log("DEBUG: Requesting password reset for:", resetEmail);

      const res = await fetch(`${API_URL}/api/vendor/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const text = await res.text();
      console.log("DEBUG: Forgot password response:", text);

      // Always show success message for security, even if email doesn't exist[citation:5]
      setResetRequested(true);
      alert("If an account exists with this email, you will receive a password reset link shortly.");
      
      // Reset the email field
      setResetEmail("");

    } catch (err) {
      console.error("Forgot password error:", err);
      alert("Failed to send reset email. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        
        {/* LOGIN FORM - shown by default */}
        {!resetRequested ? (
          <>
            <h2 className="text-2xl font-bold text-center text-blue-700">
              Vendor Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* 🔗 NEW: Forgot Password Link */}
            <div className="text-center pt-2">
              <button
                onClick={() => setResetRequested(true)}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            {/* Signup link */}
            <p className="text-sm text-center text-gray-600 pt-4 border-t">
              Don't have an account?{" "}
              <a href="/vendor/signup" className="text-blue-600 hover:underline">
                Become a Seller
              </a>
            </p>
          </>
        ) : (
          /* PASSWORD RESET REQUEST FORM */
          <>
            <h2 className="text-2xl font-bold text-center text-blue-700">
              Reset Your Password
            </h2>
            
            <p className="text-sm text-gray-600 text-center mb-4">
              Enter the email address for your vendor account. We'll send you a link to reset your password.
            </p>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                placeholder="Your registered email address"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded"
              />

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition disabled:opacity-50"
              >
                {resetLoading ? "Sending..." : "Send Reset Link"}
              </button>

              <button
                type="button"
                onClick={() => setResetRequested(false)}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
              >
                Back to Login
              </button>
            </form>

            <p className="text-xs text-center text-gray-500 mt-4">
              Didn't receive an email? Check your spam folder, or ensure you entered the correct address.
            </p>
          </>
        )}
      </div>
    </div>
  );
}