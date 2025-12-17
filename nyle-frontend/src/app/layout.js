import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        {/* Navbar is now included within each page component */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}