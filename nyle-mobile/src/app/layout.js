"use client";

import { useEffect } from "react";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Providers from "../providers";
import Navbar from "../components/Navbar";
import MobileNav from "../components/MobileNav";
import CartFAB from "../components/CartFAB";
import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "../context/CartContext";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showFAB = pathname === "/shop";

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("✅ Service Worker Registered"))
        .catch((err) => console.error("❌ SW registration failed:", err));
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1d4ed8" />
      </head>
      <body className="bg-gray-950 text-gray-100">
        <Providers>
          <CartProvider>
            <Navbar />
            <main className="container mx-auto p-4 pb-20">{children}</main>
            {showFAB && <CartFAB />}
            <CartDrawer />
            <MobileNav />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
