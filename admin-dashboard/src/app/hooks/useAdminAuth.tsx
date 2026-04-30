// src/app/hooks/useAdminAuth.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes
const TOKEN_REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes

export const useAdminAuth = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<Record<string, unknown> | null>(null);
  const [initialIp, setInitialIp] = useState<string | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tokenRefreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isCheckingRef = useRef(false);

  // Get client IP
  const getClientIp = useCallback(async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn('Could not fetch IP, using fallback');
      return 'unknown';
    }
  }, []);

  const logout = useCallback(async () => {
    // Clear all storage
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
    localStorage.removeItem("adminLastActive");
    localStorage.removeItem("adminInitialIp");
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminName");
    
    // Broadcast logout to other tabs
    localStorage.setItem("adminLogoutEvent", Date.now().toString());
    
    try {
      // Call backend logout to clear HttpOnly cookies
      await fetch(`${API_URL}/api/admin/auth/logout`, {
        method: "POST",
        credentials: "include" as RequestCredentials
      });
    } catch (error) {
      console.error("Logout API error:", error);
    }
    
    setAdmin(null);
    router.push("/login");
  }, [router]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include" as RequestCredentials
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to refresh token");

      // Restart token refresh timer
      setupTokenRefresh();
      
      return true;
    } catch {
      logout();
      return false;
    }
  }, [logout]);

  const verifyToken = useCallback(async () => {
    if (isCheckingRef.current) return;
    
    // We check adminLoggedIn marker instead of accessToken (cookie is HttpOnly)
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isLoggedIn) return;

    isCheckingRef.current = true;

    try {
      const currentIp = await getClientIp();
      
      const res = await fetch(`${API_URL}/api/admin/auth/verify-token`, {
        headers: { 
          "X-Client-IP": currentIp
        },
        credentials: "include" as RequestCredentials
      });

      const data = await res.json();
      if (!res.ok || !data.valid) {
        // Try refresh token if verification fails
        const success = await refreshAccessToken();
        if (!success) throw new Error("Token refresh failed");
        
        // Retry with new token (now in cookie)
        const retryRes = await fetch(`${API_URL}/api/admin/auth/verify-token`, {
          headers: { 
            "X-Client-IP": currentIp
          },
          credentials: "include" as RequestCredentials
        });
        
        const retryData = await retryRes.json();
        if (!retryRes.ok || !retryData.valid) throw new Error("Verification failed");
        
        setAdmin(retryData.admin);
      } else {
        setAdmin(data.admin);
      }
      
      // Store initial IP if not set
      if (!localStorage.getItem("adminInitialIp")) {
        localStorage.setItem("adminInitialIp", currentIp);
        setInitialIp(currentIp);
      }
      
      // Update last active time
      localStorage.setItem("adminLastActive", Date.now().toString());
      resetInactivityTimer();
      
    } catch (error) {
      console.error("Token verification error:", error);
      logout();
    } finally {
      isCheckingRef.current = false;
    }
  }, [logout, refreshAccessToken, getClientIp]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    inactivityTimerRef.current = setTimeout(() => {
      console.log("Inactivity timeout - logging out");
      logout();
    }, INACTIVITY_LIMIT);
    
    localStorage.setItem("adminLastActive", Date.now().toString());
  }, [logout]);

  const setupTokenRefresh = useCallback(() => {
    if (tokenRefreshTimerRef.current) {
      clearInterval(tokenRefreshTimerRef.current);
    }
    
    tokenRefreshTimerRef.current = setInterval(() => {
      refreshAccessToken();
    }, TOKEN_REFRESH_INTERVAL);
  }, [refreshAccessToken]);

  const checkIpChange = useCallback(async () => {
    const storedIp = localStorage.getItem("adminInitialIp");
    if (!storedIp || storedIp === 'unknown') return;
    
    const currentIp = await getClientIp();
    if (currentIp !== 'unknown' && currentIp !== storedIp) {
      console.log(`IP changed from ${storedIp} to ${currentIp} - logging out`);
      logout();
    }
  }, [getClientIp, logout]);

  const setupActivityListeners = useCallback(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    const resetTimer = () => resetInactivityTimer();
    
    events.forEach(event => {
      window.addEventListener(event, resetTimer, { passive: true });
    });
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [resetInactivityTimer]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      localStorage.setItem("adminTabHidden", Date.now().toString());
    } else {
      const hiddenTime = localStorage.getItem("adminTabHidden");
      if (hiddenTime && Date.now() - parseInt(hiddenTime) > INACTIVITY_LIMIT) {
        logout();
        return;
      }
      localStorage.removeItem("adminTabHidden");
      resetInactivityTimer();
    }
  }, [logout, resetInactivityTimer]);

  useEffect(() => {
    verifyToken();
    const cleanupListeners = setupActivityListeners();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminLogoutEvent') {
        logout();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    const ipCheckInterval = setInterval(checkIpChange, 2 * 60 * 1000);
    
    const wasLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (wasLoggedIn) {
      verifyToken();
    }
    
    resetInactivityTimer();
    setupTokenRefresh();
    
    return () => {
      cleanupListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (tokenRefreshTimerRef.current) clearInterval(tokenRefreshTimerRef.current);
      clearInterval(ipCheckInterval);
    };
  }, [verifyToken, setupActivityListeners, handleVisibilityChange, checkIpChange, resetInactivityTimer, setupTokenRefresh, logout]);

  return { admin, logout, refreshAccessToken };
};
