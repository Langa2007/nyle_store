"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  useEffect(() => {
    const verifyOrRefresh = async () => {
      const accessToken = localStorage.getItem("adminAccessToken");
      const refreshToken = localStorage.getItem("adminRefreshToken");

      if (!accessToken || !refreshToken) {
        router.push("/login");
        return;
      }

      try {
        //  VERIFY TOKEN (CORRECT ENDPOINT)
        const res = await fetch(
          `${API_URL}/api/admin/auth/verify-token`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.ok) {
          setIsVerified(true);
          return;
        }

        //  REFRESH TOKEN (CORRECT ENDPOINT)
        const refreshRes = await fetch(
          `${API_URL}/api/admin/auth/refresh-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          }
        );

        if (!refreshRes.ok) throw new Error("Refresh failed");

        const data = await refreshRes.json();
        localStorage.setItem("adminAccessToken", data.accessToken);
        setIsVerified(true);
      } catch (err) {
        console.error("❌ Auth check failed:", err);
        localStorage.removeItem("adminAccessToken");
        localStorage.removeItem("adminRefreshToken");
        router.push("/login");
      }
    };

    verifyOrRefresh();
  }, [router, API_URL]);

  if (!isVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Checking admin session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
