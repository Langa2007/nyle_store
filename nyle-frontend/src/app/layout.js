import "./globals.css";
import { Suspense } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../components/Navbar";
import ScrollRestorationController from "../components/ScrollRestorationController";
import ScrollToTop from "../components/ScrollToTop";
import ClientProviders from "../components/ClientProviders";
import AuthModal from "../components/AuthModal/page";
import CartSidebar from "../components/CartSidebar/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <ClientProviders>
          {/* Scroll restoration logic */}
          <Suspense fallback={null}>
            <ScrollRestorationController />
          </Suspense>

          <Navbar />

          {/* Explicit scroll container */}
          <main
            id="scroll-root"
            className="container mx-auto px-4 sm:px-6 lg:px-8 h-[100dvh] overflow-y-auto"
          >
            {children}
            <ScrollToTop />
          </main>

          {/* Global modals and sidebars */}
          <AuthModal />
          <CartSidebar />
        </ClientProviders>
      </body>
    </html>
  );
}
