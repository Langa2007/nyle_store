"use client";

import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/shop", icon: ShoppingBag, label: "Shop" },
    { href: "/cart", icon: ShoppingCart, label: "Cart" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-blue-600 text-white border-t border-blue-500 flex justify-around py-2 shadow-lg">
      {tabs.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center text-xs ${
            pathname === href ? "text-yellow-300" : "text-white"
          }`}
        >
          <Icon className="h-6 w-6" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
