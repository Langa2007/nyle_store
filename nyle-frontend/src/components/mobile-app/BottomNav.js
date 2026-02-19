"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: "/shop", icon: <Home size={22} />, label: "Home" },
    { href: "/cart", icon: <ShoppingCart size={22} />, label: "Cart" },
    { href: "/profile", icon: <User size={22} />, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-blue-700 text-white border-t border-blue-500 shadow-inner flex justify-around py-2 z-50">
      {links.map(({ href, icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center ${
              active ? "text-yellow-300" : "text-gray-200"
            } transition-colors`}
          >
            {icon}
            <span className="text-xs mt-1">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
