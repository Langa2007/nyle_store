import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../components/Navbar";

// Disable static generation for the root layout
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
