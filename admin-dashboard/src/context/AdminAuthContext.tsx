// src/context/AdminAuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  // Check login status on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    // Note: Verification is handled by useAdminAuth hook, but we keep a basic check here
    if (!loggedIn && window.location.pathname.startsWith("/dashboard")) {
      router.push("/login");
    }
  }, [router]);

  const login = () => {
    localStorage.setItem("adminLoggedIn", "true");
    setIsLoggedIn(true);
    router.push("/dashboard");
  };

  const logout = async () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
    localStorage.removeItem("adminName");
    setIsLoggedIn(false);
    
    try {
      // Clear HttpOnly cookies on the backend
      await fetch(`${API_URL}/api/admin/auth/logout`, { 
        method: "POST", 
        credentials: "include" 
      });
    } catch (e) {
      console.error("Logout error:", e);
    }
    
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
