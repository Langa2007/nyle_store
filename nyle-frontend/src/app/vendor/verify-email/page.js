"use client";

import { Suspense } from "react";
import VerifyEmailContent from "./VerifyEmailContent";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-blue-600">Verifying your email...</p>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
