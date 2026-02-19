"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect users straight to the Shop page on load
    router.replace("/shop");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-gray-300">
      <h2 className="text-xl font-semibold text-blue-500 mb-2 animate-pulse">
        Loading Nyle Store...
      </h2>
      <p className="text-sm text-gray-400">Please wait while we prepare your experience</p>
    </div>
  );
}
