// /vendor/verify/page.js
"use client";

import { Suspense } from "react";
import VerifyTokenForm from "./VerifyTokenForm";

export default function VerifyTokenPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading verification page...</div>}>
      <VerifyTokenForm />
    </Suspense>
  );
}
