// src/app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  useEffect(() => {
    const queryReason = searchParams.get("reason");
    const storageReason = localStorage.getItem("adminSecurityReason");
    const reason = queryReason || storageReason;
    if (!reason) return;

    if (reason === "inactive") {
      setError("Your admin session expired after 10 minutes of inactivity. Please log in again.");
    } else if (reason === "session_replaced") {
      setError("Your session was closed because this admin account logged in from another device.");
    } else if (reason === "unauthorized") {
      setError("Your session is no longer valid. Please log in again.");
    }

    localStorage.removeItem("adminSecurityReason");
  }, [searchParams]);

  // Get client IP (matches useAdminAuth implementation)
  const getClientIp = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn('Could not fetch IP, using fallback');
      return 'unknown';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Fetch IP first to send with login request if needed, or just to store
      const currentIp = await getClientIp();

      const res = await fetch(`${API_URL}/api/admin/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      let data: {
        accessToken?: string;
        refreshToken?: string;
        admin?: { name?: string };
        error?: string;
        message?: string;
      };
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Invalid server response: ${text}`);
      }

      if (!res.ok)
        throw new Error(data.error || data.message || "Login failed");
      if (!data.accessToken || !data.refreshToken) {
        throw new Error("Login response missing required tokens");
      }

      // Clear any existing session data to ensure a clean start
      localStorage.removeItem("adminAccessToken");
      localStorage.removeItem("adminRefreshToken");
      localStorage.removeItem("adminLastActive");
      localStorage.removeItem("adminInitialIp");
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminLogoutEvent");
      localStorage.removeItem("adminTabHidden");
      localStorage.removeItem("adminSecurityReason");

      // Save tokens
      localStorage.setItem("adminAccessToken", data.accessToken);
      localStorage.setItem("adminRefreshToken", data.refreshToken);

      // Initialize security checks
      localStorage.setItem("adminInitialIp", currentIp);
      localStorage.setItem("adminLastActive", Date.now().toString());
      localStorage.setItem("adminLoggedIn", "true");
      if (data.admin?.name) {
        localStorage.setItem("adminName", data.admin.name);
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
