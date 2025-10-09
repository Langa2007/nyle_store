"use client";

import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Providers from "../providers";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
