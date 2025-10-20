"use client";

import { Suspense } from "react";
import MagicLoginPage from "./MagicLoginPage";

export default function MagicLoginWrapper() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <MagicLoginPage />
    </Suspense>
  );
}
