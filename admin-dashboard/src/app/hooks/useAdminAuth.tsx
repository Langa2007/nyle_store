"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes

export const useAdminAuth = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);

  const logout = useCallback(() => {
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
    localStorage.setItem("adminLoggedOut", Date.now().toString());
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
      const newToken = await refreshAccessToken();
      if (newToken) verifyToken();
    }
  }, [logout, refreshAccessToken]);

  // Inactivity across tabs
  const resetInactivity = useCallback(() => {
    localStorage.setItem("adminLastActive", Date.now().toString());
  }, []);

  useEffect(() => {
    verifyToken();

    // Inactivity events
    window.addEventListener("mousemove", resetInactivity);
    window.addEventListener("keydown", resetInactivity);
    window.addEventListener("click", resetInactivity);
    window.addEventListener("scroll", resetInactivity);

    // Check inactivity every second
    const interval = setInterval(() => {
      const lastActive = parseInt(localStorage.getItem("adminLastActive") || "0", 10);
      if (Date.now() - lastActive > INACTIVITY_LIMIT) logout();
    }, 1000);

    // Cross-tab logout
    const storageListener = (e: StorageEvent) => {
      if (e.key === "adminLoggedOut") logout();
    };
    window.addEventListener("storage", storageListener);

    // Tab close / new tab
    if (!sessionStorage.getItem("adminTab")) logout();
    sessionStorage.setItem("adminTab", "open");

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", resetInactivity);
      window.removeEventListener("keydown", resetInactivity);
      window.removeEventListener("click", resetInactivity);
      window.removeEventListener("scroll", resetInactivity);
      window.removeEventListener("storage", storageListener);
      sessionStorage.removeItem("adminTab");
    };
  }, [verifyToken, resetInactivity, logout]);

  return { admin, logout, refreshAccessToken };
};
