"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
const INACTIVITY_LIMIT_MS = 10 * 60 * 1000; // 10 minutes
const VERIFY_INTERVAL_MS = 60 * 1000; // 1 minute
const INACTIVITY_REASON = "inactive";
const SESSION_REPLACED_REASON = "session_replaced";
const UNAUTHORIZED_REASON = "unauthorized";

type SecurityReason = typeof INACTIVITY_REASON | typeof SESSION_REPLACED_REASON | typeof UNAUTHORIZED_REASON;

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const verifyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hiddenAtRef = useRef<number | null>(null);
  const isRedirectingRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (verifyIntervalRef.current) {
      clearInterval(verifyIntervalRef.current);
      verifyIntervalRef.current = null;
    }
  }, []);

  const forceLogout = useCallback(
    (reason: SecurityReason) => {
      if (isRedirectingRef.current) return;
      isRedirectingRef.current = true;

      clearTimers();
      localStorage.removeItem("adminAccessToken");
      localStorage.removeItem("adminRefreshToken");
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminLastActive");
      localStorage.removeItem("adminInitialIp");
      localStorage.removeItem("adminTabHidden");
      localStorage.setItem("adminLogoutEvent", Date.now().toString());
      localStorage.setItem("adminSecurityReason", reason);
      setIsVerified(false);
      router.replace(`/login?reason=${reason}`);
    },
    [clearTimers, router]
  );

  const setLastActiveNow = useCallback(() => {
    localStorage.setItem("adminLastActive", Date.now().toString());
  }, []);

  const checkAndEnforceInactivity = useCallback(() => {
    const lastActiveRaw = localStorage.getItem("adminLastActive");
    const lastActive = lastActiveRaw ? parseInt(lastActiveRaw, 10) : Date.now();
    if (Date.now() - lastActive >= INACTIVITY_LIMIT_MS) {
      forceLogout(INACTIVITY_REASON);
      return false;
    }
    return true;
  }, [forceLogout]);

  const resetInactivityTimeout = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLastActiveNow();
    timeoutRef.current = setTimeout(() => {
      forceLogout(INACTIVITY_REASON);
    }, INACTIVITY_LIMIT_MS);
  }, [forceLogout, setLastActiveNow]);

  const verifyOrRefresh = useCallback(async () => {
    const accessToken = localStorage.getItem("adminAccessToken");
    const refreshToken = localStorage.getItem("adminRefreshToken");

    if (!accessToken || !refreshToken) {
      forceLogout(UNAUTHORIZED_REASON);
      return false;
    }

    try {
      const verifyRes = await fetch(`${API_URL}/api/admin/auth/verify-token`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (verifyRes.ok) return true;

      const verifyData = await verifyRes.json().catch(() => ({}));
      const verifyMessage = String(verifyData?.message || "");

      if (
        verifyMessage.toLowerCase().includes("session replaced") ||
        verifyMessage.toLowerCase().includes("newer login")
      ) {
        forceLogout(SESSION_REPLACED_REASON);
        return false;
      }

      const refreshRes = await fetch(`${API_URL}/api/admin/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshRes.ok) {
        forceLogout(UNAUTHORIZED_REASON);
        return false;
      }

      const refreshData = await refreshRes.json();
      if (!refreshData?.accessToken) {
        forceLogout(UNAUTHORIZED_REASON);
        return false;
      }

      localStorage.setItem("adminAccessToken", refreshData.accessToken);
      return true;
    } catch {
      forceLogout(UNAUTHORIZED_REASON);
      return false;
    }
  }, [forceLogout]);

  useEffect(() => {
    let mounted = true;

    const setupSession = async () => {
      if (!checkAndEnforceInactivity()) return;

      const ok = await verifyOrRefresh();
      if (!ok || !mounted) return;

      setIsVerified(true);
      resetInactivityTimeout();

      const activityEvents: Array<keyof WindowEventMap> = [
        "mousedown",
        "mousemove",
        "keydown",
        "scroll",
        "touchstart",
        "click",
      ];

      const handleActivity = () => {
        resetInactivityTimeout();
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          hiddenAtRef.current = Date.now();
          return;
        }

        const hiddenAt = hiddenAtRef.current;
        hiddenAtRef.current = null;
        if (hiddenAt && Date.now() - hiddenAt >= INACTIVITY_LIMIT_MS) {
          forceLogout(INACTIVITY_REASON);
          return;
        }

        if (!checkAndEnforceInactivity()) return;
        resetInactivityTimeout();
        void verifyOrRefresh();
      };

      const handleFocus = () => {
        if (!checkAndEnforceInactivity()) return;
        resetInactivityTimeout();
        void verifyOrRefresh();
      };

      const handleStorage = (e: StorageEvent) => {
        if (e.key === "adminLogoutEvent" || (e.key === "adminAccessToken" && !e.newValue)) {
          forceLogout(UNAUTHORIZED_REASON);
        }
      };

      activityEvents.forEach((eventName) => {
        window.addEventListener(eventName, handleActivity, { passive: true });
      });
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("focus", handleFocus);
      window.addEventListener("storage", handleStorage);

      verifyIntervalRef.current = setInterval(async () => {
        if (!checkAndEnforceInactivity()) return;
        await verifyOrRefresh();
      }, VERIFY_INTERVAL_MS);

      return () => {
        activityEvents.forEach((eventName) => {
          window.removeEventListener(eventName, handleActivity);
        });
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("focus", handleFocus);
        window.removeEventListener("storage", handleStorage);
      };
    };

    let cleanupListeners: (() => void) | undefined;
    void setupSession().then((cleanup) => {
      cleanupListeners = cleanup;
    });

    return () => {
      mounted = false;
      clearTimers();
      if (cleanupListeners) cleanupListeners();
    };
  }, [checkAndEnforceInactivity, clearTimers, forceLogout, resetInactivityTimeout, verifyOrRefresh]);

  if (!isVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Checking admin session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
