"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VendorLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ update form state on input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/vendors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // use form state
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save token
      localStorage.setItem("vendorToken", data.token);
      router.push("/vendor/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin} // ✅ fixed
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
          onChange={handleChange} // ✅ fixed
          required
          className="w-full border px-4 py-2 rounded"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange} // ✅ fixed
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

        {/* Link to Signup */}
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
