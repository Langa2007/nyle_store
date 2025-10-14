"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ShoppingCart, User } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/shop", icon: <Home size={22} />, label: "Shop" },
    { href: "/cart", icon: <ShoppingCart size={22} />, label: "Cart" },
    { href: "/profile", icon: <User size={22} />, label: "Profile" },
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 flex justify-around py-2 md:hidden"
      initial={{ y: 60 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      {links.map(({ href, icon, label }) => {
        const active = pathname === href;
        return (
          <button
            key={href}
            onClick={() => router.push(href)}
            className={`flex flex-col items-center text-xs ${
              active ? "text-blue-500" : "text-zinc-400"
            }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        );
      })}
    </motion.nav>
  );
}
