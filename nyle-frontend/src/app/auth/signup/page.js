"use client";

import { Suspense } from "react";
import SignupPage from "./SignupPage";

export const dynamic = "force-dynamic";

export default function Signup() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-blue-600">Loading signup...</p>}>
      <SignupPage />
    </Suspense>
  );
}