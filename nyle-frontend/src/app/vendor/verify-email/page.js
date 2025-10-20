"use client";

import { Suspense } from "react";
import VerifyEmailContent from "./VerifyEmailContent";

// Disable static generation for this page
export const dynamic = 'force-dynamic';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-blue-600">Verifying your email...</p>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
