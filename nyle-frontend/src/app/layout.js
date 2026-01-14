import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../components/Navbar";
import ScrollRestorationController from "../components/ScrollRestorationController";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        {/* Scroll restoration logic */}
        <ScrollRestorationController />

        <Navbar />

        {/* Explicit scroll container */}
        <main
          id="scroll-root"
          className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen overflow-y-auto"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
