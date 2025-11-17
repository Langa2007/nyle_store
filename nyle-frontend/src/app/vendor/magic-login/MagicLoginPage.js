
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MagicLoginPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const doMagic = async () => {
      try {
        const res = await fetch(`${API_URL}/api/vendor/auth/magic-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const text = await res.text();
        let data;
        try { data = JSON.parse(text); } catch { throw new Error(`Invalid response: ${text}`); }

        if (!res.ok) throw new Error(data.message || "Magic login failed");

        // store normal auth token
        localStorage.setItem("vendorToken", data.token);
        setStatus("success");
        setTimeout(() => router.push("/vendor/dashboard"), 1200);
      } catch (err) {
        console.error("Magic login error:", err);
        setStatus("error");
      }
    };

    doMagic();
  }, [token, router, API_URL]);

  if (status === "verifying") {
    return <div className="min-h-screen flex items-center justify-center">Verifying link...</div>;
  }
  if (status === "success") {
    return <div className="min-h-screen flex items-center justify-center">Success — redirecting...</div>;
  }
  return <div className="min-h-screen flex items-center justify-center text-red-600">Invalid or expired link.</div>;
}
