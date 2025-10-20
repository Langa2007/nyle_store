"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Disable static generation for this page since it uses client-side features
export const dynamic = 'force-dynamic';

export default function VendorLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Base API URL (automatically switches between local & production)
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("DEBUG: About to POST login to:", `${API_URL}/api/vendor/auth/login`);

      const res = await fetch(`${API_URL}/api/vendor/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      console.log("DEBUG: login raw response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Invalid JSON response from server: ${text.slice(0, 150)}`);
      }

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ Save token and redirect
      localStorage.setItem("vendorToken", data.token);
      router.push("/vendor/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Something went wrong while logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Vendor Login
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup link */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/vendor/signup" className="text-blue-600 hover:underline">
            Become a Seller
          </a>
        </p>
      </form>
    </div>
  );
}
