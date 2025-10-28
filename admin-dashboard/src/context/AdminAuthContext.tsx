"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (access: string, refresh: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://nyle-store.onrender.com";

  // Load tokens from localStorage on mount
  useEffect(() => {
    const access = localStorage.getItem("adminAccessToken");
    const refresh = localStorage.getItem("adminRefreshToken");
    if (access && refresh) {
      setAccessToken(access);
      setRefreshToken(refresh);
    } else {
      router.push("/login");
    }
  }, [router]);

  // Refresh token automatically before expiry
  useEffect(() => {
    if (!refreshToken) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("adminAccessToken", data.accessToken);
          setAccessToken(data.accessToken);
          console.log("🔄 Access token refreshed");
        } else {
          console.warn("⚠️ Failed to refresh access token, logging out");
          logout();
        }
      } catch (err) {
        console.error("❌ Token refresh failed:", err);
        logout();
      }
    }, 13 * 60 * 1000); // refresh every 13 minutes

    return () => clearInterval(interval);
  }, [refreshToken]);

  const login = (access: string, refresh: string) => {
    localStorage.setItem("adminAccessToken", access);
    localStorage.setItem("adminRefreshToken", refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
