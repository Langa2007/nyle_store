// src/utils/fetchWithAuth.ts

/**
 * Enhanced fetch wrapper that automatically handles HttpOnly cookie-based authentication.
 * Includes automatic token refresh logic.
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // We now rely on HttpOnly cookies (adminAccessToken, adminRefreshToken)
  // credentials: 'include' ensures these cookies are sent automatically by the browser
  
  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include" as RequestCredentials
  };

  let res = await fetch(url, fetchOptions);

  // If unauthorized (401), attempt to refresh the token using the refresh cookie
  if (res.status === 401) {
    console.log("[Auth] Access token expired, attempting refresh...");
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
    
    try {
      const refreshRes = await fetch(`${API_URL}/api/admin/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include" as RequestCredentials
      });

      if (refreshRes.ok) {
        console.log("[Auth] Token refreshed successfully, retrying original request.");
        // Retry the original request (the browser will now have the new access token cookie)
        res = await fetch(url, fetchOptions);
      } else {
        console.warn("[Auth] Refresh failed, redirecting to login.");
        // Refresh failed → force logout
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminName");
        window.location.href = "/login?reason=unauthorized";
      }
    } catch (err) {
      console.error("[Auth] Network error during refresh:", err);
      window.location.href = "/login?reason=unauthorized";
    }
  }

  return res;
}
