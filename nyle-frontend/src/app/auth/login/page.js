// app/auth/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../../services/authService";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const data = await login({ email, password });
      if (data.token) {
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || {}));
      }
      router.push("/");
    } catch (err) {
      setMsg(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
        <h3 className="text-2xl font-semibold mb-4">Log in</h3>
        <form onSubmit={handle} className="space-y-4">
          <input value={email} onChange={e => setEmail(e.target.value)} required placeholder="email" className="w-full p-3 border rounded-xl" />
          <input value={password} onChange={e => setPassword(e.target.value)} required placeholder="password" type="password" className="w-full p-3 border rounded-xl" />
          {msg && <div className="text-red-600 text-sm">{msg}</div>}
          <button disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded-xl">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
