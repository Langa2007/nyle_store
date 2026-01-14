import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Navbar />

        {/*  Explicit scroll container */}
        <main
          id="scroll-root"
          className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
