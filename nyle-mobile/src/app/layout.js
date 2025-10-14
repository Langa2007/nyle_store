"use client";

import { useEffect } from "react";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Providers from "../providers";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  // Register the PWA service worker
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
      <body>
        <Providers>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
