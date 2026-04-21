// src/app/layout.js
import "./globals.css";
import Script from "next/script";
import { Suspense } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../components/Navbar";
import ScrollRestorationController from "../components/ScrollRestorationController";
import ScrollToTop from "../components/ScrollToTop";
import ClientProviders from "../components/ClientProviders";
import AuthModal from "../components/AuthModal/page";
import CartSidebar from "../components/CartSidebar/page";
import MobileNav from "../components/mobile-app/MobileNav"; // Added
import { SessionProviderWrapper } from "../components/SessionProviderWrapper";
import SessionSync from "../components/SessionSync";

export const metadata = {
  title: "Nyle Store",
  description: "Shop smarter with Nyle Store.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/nyle-mark.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
        {/* Wrap everything with SessionProviderWrapper which contains SessionProvider */}
        <SessionProviderWrapper>
          <SessionSync />
          <ClientProviders>
            {/* Scroll restoration logic */}
            <Suspense fallback={null}>
              <ScrollRestorationController />
            </Suspense>

            <Navbar />

            {/* Explicit scroll container */}
            <main
              id="scroll-root"
              className="container mx-auto px-4 sm:px-6 lg:px-8 mt-[var(--navbar-offset)] h-[calc(100dvh-var(--navbar-offset))] overflow-y-auto pb-20 md:pb-0"
            >
              <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>}>
                {children}
              </Suspense>
              <ScrollToTop />
            </main>

            <MobileNav /> {/* Added for mobile icons */}

            {/* Global modals and sidebars */}
            <AuthModal />
            <CartSidebar />
          </ClientProviders>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
