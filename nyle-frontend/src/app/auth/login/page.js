"use client";

import { Suspense } from "react";
import LoginPage from "./LoginPage";

export const dynamic = "force-dynamic";

export default function Login() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-blue-600">Loading login...</p>}>
      <LoginPage />
    </Suspense>
  );
}