"use client";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { usePathname } from "next/navigation";
import BottomNav from "../components/BottomNav";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideBottomNav = pathname.startsWith("/auth"); // hide on login screens

  return (
    <html lang="en">
      <body className="bg-white text-gray-800 flex flex-col min-h-screen">
        <main className="flex-1 overflow-y-auto pb-16">{children}</main>
        {!hideBottomNav && <BottomNav />}
      </body>
    </html>
  );
}
