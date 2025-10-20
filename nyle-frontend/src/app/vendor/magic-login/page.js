"use client";

import { Suspense } from "react";
import MagicLoginPage from "./MagicLoginPage";

// Disable static generation for this page since it uses client-side features
export const dynamic = 'force-dynamic';

export default function MagicLoginWrapper() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <MagicLoginPage />
    </Suspense>
  );
}
