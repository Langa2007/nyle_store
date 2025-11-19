"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes

export const useAdminAuth = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const verifyingRef = useRef(false);

  const logout = useCallback(() => {
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
    setAdmin(null);
    sessionStorage.removeItem("adminTab");
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
      return null;
    }
  }, [logout]);

  const verifyToken = useCallback(async () => {
    if (verifyingRef.current) return;
    verifyingRef.current = true;

    const accessToken = localStorage.getItem("adminAccessToken");
    if (!accessToken) {
      logout();
      verifyingRef.current = false;
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/admin/verify-token`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (!res.ok || !data.valid) throw new Error(data.message || "Invalid token");

      setAdmin(data.admin);
    } catch {
      // Try refreshing token
      const newToken = await refreshAccessToken();
      if (newToken) {
        await verifyToken(); // re-verify with new token
      }
    } finally {
      verifyingRef.current = false;
    }
  }, [logout, refreshAccessToken]);

  const resetInactivity = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(logout, INACTIVITY_LIMIT);
  }, [logout]);

  useEffect(() => {
    // On mount, verify token
    verifyToken();

    // Track user activity
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((evt) => window.addEventListener(evt, resetInactivity));

    resetInactivity();

    // Force logout if tab closed/reopened
    if (!sessionStorage.getItem("adminTab")) {
      logout();
    }
    sessionStorage.setItem("adminTab", "open");

    // Clean up
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      events.forEach((evt) => window.removeEventListener(evt, resetInactivity));
      sessionStorage.removeItem("adminTab");
    };
  }, [verifyToken, resetInactivity, logout]);

  return { admin, logout, refreshAccessToken };
};
