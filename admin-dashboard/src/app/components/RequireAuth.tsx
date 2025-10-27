// src/app/components/RequireAuth.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("adminAccessToken");
    const refreshToken = localStorage.getItem("adminRefreshToken");

    if (!accessToken || !refreshToken) {
      router.replace("/login");
      return;
    }

    // Optional: verify access token validity here later
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
