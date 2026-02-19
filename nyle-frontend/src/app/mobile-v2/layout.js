"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Providers from "../../providers-mobile";
import Navbar from "../../components/mobile-app/Navbar";
import MobileNav from "../../components/mobile-app/MobileNav";
import CartFAB from "../../components/mobile-app/CartFAB";
import CartDrawer from "../../components/mobile-app/CartDrawer";
import { usePathname } from "next/navigation";
import AuthModal from "../../components/mobile-app/AuthModal";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log(" Service Worker Registered"))
        .catch((err) => console.error(" SW registration failed:", err));
    }
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-black text-gray-100 selection:bg-blue-500/30">
        <Providers>
          <div className="flex flex-col min-h-screen">
            {/* Minimal Sticky Header */}
            <Navbar />

            <main className="flex-1 pt-16 pb-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>

            <CartDrawer />
            <MobileNav />
            <AuthModal />
          </div>
        </Providers>
      </body>
    </html>
  );
}
