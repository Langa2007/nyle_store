"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("Verifying your email...");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // Prevent SSR execution entirely
    if (typeof window === "undefined") return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("❌ Missing NEXT_PUBLIC_API_URL env variable");
      setStatus("error");
      setMessage("Server configuration error. Try again later.");
      return;
    }

    async function verify() {
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing verification token.");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/vendors/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully.");
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed.");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("error");
        setMessage("Something went wrong while verifying your email.");
      }
    }

    verify();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full text-center shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Email Verification</CardTitle>
        </CardHeader>
        <CardContent>
          {status === "loading" && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
              <p className="text-gray-500">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-green-600 font-medium">{message}</p>
              <p className="text-sm text-gray-500">
                Your account is now under review. You’ll receive an email once approved or rejected within 24 hours.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-red-600 font-medium">{message}</p>
              <p className="text-sm text-gray-500">
                Please contact support if this issue persists.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
