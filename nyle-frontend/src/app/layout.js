// src/app/layout.js
import "./globals.css";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
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
              {children}
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
