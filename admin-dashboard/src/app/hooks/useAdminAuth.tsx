"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes

export const useAdminAuth = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);

  // Track last activity
  let inactivityTimer: NodeJS.Timeout;

  const logout = useCallback(() => {
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
    setAdmin(null);
    router.push("/login");
  }, [router]);

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem("adminRefreshToken");
    if (!refreshToken) return logout();

    try {
      const res = await fetch(`${API_URL}/api/admin/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to refresh token");

      localStorage.setItem("adminAccessToken", data.accessToken);
      return data.accessToken;
    } catch {
      logout();
    }
  }, [logout]);

  const verifyToken = useCallback(async () => {
    const accessToken = localStorage.getItem("adminAccessToken");
    if (!accessToken) return logout();

    try {
      const res = await fetch(`${API_URL}/api/admin/verify-token`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();

      if (!res.ok || !data.valid) throw new Error(data.message || "Invalid token");

      setAdmin(data.admin);
    } catch {
      // Try refreshing
      const newToken = await refreshAccessToken();
      if (newToken) verifyToken();
    }
  }, [logout, refreshAccessToken]);

  // Track inactivity
  const resetInactivity = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    verifyToken();

    window.addEventListener("mousemove", resetInactivity);
    window.addEventListener("keydown", resetInactivity);
    window.addEventListener("click", resetInactivity);
    window.addEventListener("scroll", resetInactivity);

    resetInactivity();

    // Force logout if tab closed/reopened (sessionStorage flag)
    if (!sessionStorage.getItem("adminTab")) {
      logout();
    }
    sessionStorage.setItem("adminTab", "open");

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetInactivity);
      window.removeEventListener("keydown", resetInactivity);
      window.removeEventListener("click", resetInactivity);
      window.removeEventListener("scroll", resetInactivity);
      sessionStorage.removeItem("adminTab");
    };
  }, [verifyToken, logout]);

  return { admin, logout, refreshAccessToken };
};
