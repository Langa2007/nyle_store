"use client";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { usePathname } from "next/navigation";
import BottomNav from "../components/BottomNav";
import { use, useEffect } from "react";

export default function RootLayout({ children }) {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js").catch(console.error);
        }

    }, []);
  const pathname = usePathname();
  const hideBottomNav = pathname.startsWith("/auth"); // hide on login screens

  return (
    <html lang="en">
      <body className="bg-white text-gray-800 flex flex-col min-h-screen">
        <main className="flex-1 overflow-y-auto pb-16">{children}</main>
        {!hideBottomNav && <BottomNav />}
        <providers>
            <Navbar />
            <main classname="container mx-auto p-4">{children}</main>
        </providers>
      </body>
    </html>
  );
}
