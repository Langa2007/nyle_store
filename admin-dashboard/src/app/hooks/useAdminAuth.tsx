"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes
const TOKEN_REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes

export const useAdminAuth = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [initialIp, setInitialIp] = useState<string | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tokenRefreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isCheckingRef = useRef(false);

  // Get client IP (simplified - in production use a proper IP service)
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
    const accessToken = localStorage.getItem("adminAccessToken");
    
    // Clear all storage
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
    localStorage.removeItem("adminLastActive");
    localStorage.removeItem("adminInitialIp");
    localStorage.removeItem("adminLoggedIn");
    
    // Broadcast logout to other tabs
    localStorage.setItem("adminLogoutEvent", Date.now().toString());
    
    // Call backend logout if token exists
    if (accessToken) {
      try {
        await fetch(`${API_URL}/api/admin/auth/logout`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      } catch (error) {
        console.error("Logout API error:", error);
      }
    }
    
    setAdmin(null);
    router.push("/login");
  }, [router]);

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem("adminRefreshToken");
    if (!refreshToken) return logout();

    try {
      const res = await fetch(`${API_URL}/api/admin/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to refresh token");

      localStorage.setItem("adminAccessToken", data.accessToken);
      
      // Restart token refresh timer
      setupTokenRefresh();
      
      return data.accessToken;
    } catch {
      logout();
    }
  }, [logout]);

  const verifyToken = useCallback(async () => {
    if (isCheckingRef.current) return;
    isCheckingRef.current = true;

    const accessToken = localStorage.getItem("adminAccessToken");
    if (!accessToken) {
      isCheckingRef.current = false;
      return logout();
    }

    try {
      // Get current IP for verification
      const currentIp = await getClientIp();
      
      const res = await fetch(`${API_URL}/api/admin/auth/verify-token`, {
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          "X-Client-IP": currentIp // Send IP for verification
        },
      });

      const data = await res.json();
      if (!res.ok || !data.valid) {
        // Try refresh token if verification fails
        const newToken = await refreshAccessToken();
        if (!newToken) throw new Error("Token refresh failed");
        
        // Retry with new token
        const retryRes = await fetch(`${API_URL}/api/admin/auth/verify-token`, {
          headers: { 
            Authorization: `Bearer ${newToken}`,
            "X-Client-IP": currentIp
          },
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
    // Clear existing timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    // Set new timer
    inactivityTimerRef.current = setTimeout(() => {
      console.log("Inactivity timeout - logging out");
      logout();
    }, INACTIVITY_LIMIT);
    
    // Update last active time
    localStorage.setItem("adminLastActive", Date.now().toString());
  }, [logout]);

  const setupTokenRefresh = useCallback(() => {
    // Clear existing timer
    if (tokenRefreshTimerRef.current) {
      clearInterval(tokenRefreshTimerRef.current);
    }
    
    // Refresh token every 30 minutes
    tokenRefreshTimerRef.current = setInterval(() => {
      refreshAccessToken();
    }, TOKEN_REFRESH_INTERVAL);
  }, [refreshAccessToken]);

  // Check IP change
  const checkIpChange = useCallback(async () => {
    const storedIp = localStorage.getItem("adminInitialIp");
    if (!storedIp || storedIp === 'unknown') return;
    
    const currentIp = await getClientIp();
    if (currentIp !== 'unknown' && currentIp !== storedIp) {
      console.log(`IP changed from ${storedIp} to ${currentIp} - logging out`);
      logout();
    }
  }, [getClientIp, logout]);

  // Activity detectors
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

  // Tab visibility change
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      // Tab switched away
      localStorage.setItem("adminTabHidden", Date.now().toString());
    } else {
      // Tab came back - check if it was hidden too long
      const hiddenTime = localStorage.getItem("adminTabHidden");
      if (hiddenTime && Date.now() - parseInt(hiddenTime) > 10000) { // 10 seconds
        console.log("Tab was away too long - verifying session");
        verifyToken();
      }
      localStorage.removeItem("adminTabHidden");
      resetInactivityTimer();
    }
  }, [verifyToken, resetInactivityTimer]);

  useEffect(() => {
    // Initial verification
    verifyToken();
    
    // Setup activity listeners
    const cleanupListeners = setupActivityListeners();
    
    // Setup tab visibility listener
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Setup storage listener for cross-tab logout
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminLogoutEvent') {
        console.log("Logout event detected from another tab");
        logout();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Check IP change periodically (every 2 minutes)
    const ipCheckInterval = setInterval(checkIpChange, 2 * 60 * 1000);
    
    // Handle page refresh - check if user was logged in
    const wasLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (wasLoggedIn) {
      verifyToken();
    }
    
    // Mark as logged in
    localStorage.setItem("adminLoggedIn", "true");
    
    // Setup initial timers
    resetInactivityTimer();
    setupTokenRefresh();
    
    return () => {
      // Cleanup
      cleanupListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
      
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      
      if (tokenRefreshTimerRef.current) {
        clearInterval(tokenRefreshTimerRef.current);
      }
      
      clearInterval(ipCheckInterval);
      
      // Only clear login marker if explicitly logging out
      if (!localStorage.getItem("adminAccessToken")) {
        localStorage.removeItem("adminLoggedIn");
      }
    };
  }, [verifyToken, setupActivityListeners, handleVisibilityChange, checkIpChange, resetInactivityTimer, setupTokenRefresh, logout]);

  return { admin, logout, refreshAccessToken };
};