"use client";

import { Suspense } from "react";
import Checkout from "./Checkout";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-blue-600">Loading checkout...</p>}>
      <Checkout />
    </Suspense>
  );
}
