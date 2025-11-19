"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`${API_URL}/api/vendor/auth/magic-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          setStatus("success");
        } else if (res.status === 403) {
          setStatus("pending"); // awaiting admin approval
        } else {
          setStatus("failed");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token, API_URL]);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => router.push("/vendor/login"), 4000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      {status === "verifying" && (
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2 className="animate-spin" />
          <p>Verifying your email...</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-green-600 space-y-2">
          <p className="text-lg font-semibold">✅ Email verified successfully!</p>
          <p className="text-gray-700 text-sm">Redirecting to login...</p>
        </div>
      )}

      {status === "pending" && (
        <div className="text-yellow-600 space-y-2">
          <p className="text-lg font-semibold">🕒 Account Under Review</p>
          <p className="text-gray-700 text-sm">
            Your email is verified, but your account is awaiting admin approval.
          </p>
        </div>
      )}

      {status === "invalid" && (
        <p className="text-red-600 font-semibold">❌ Invalid or missing verification token.</p>
      )}

      {status === "failed" && (
        <p className="text-red-600 font-semibold">
          ⚠️ Verification failed. The token may have expired or already been used.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600 font-semibold">⚠️ Server error. Please try again later.</p>
      )}
    </div>
  );
}
