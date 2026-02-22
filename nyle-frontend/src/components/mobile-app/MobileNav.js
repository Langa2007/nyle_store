"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ShoppingCart, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext/page";

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const sessionObj = useSession();
  const session = sessionObj?.data;
  const { setShowAuthModal, setAuthAction, getCartTotals } = useCart();
  const { itemCount } = getCartTotals();

  const handleNavClick = (href) => {
    if (href === "/profile" && !session) {
      setAuthAction('login');
      setShowAuthModal(true);
      return;
    }
    router.push(href);
  };

  const links = [
    { href: "/shop", icon: <Home size={22} />, label: "Shop" },
    {
      href: "/cart",
      icon: (
        <div className="relative">
          <ShoppingCart size={22} />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[9px] rounded-full min-w-[15px] h-[15px] flex items-center justify-center font-bold border border-zinc-900">
              {itemCount}
            </span>
          )}
        </div>
      ),
      label: "Cart"
    },
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
            onClick={() => handleNavClick(href)}
            className={`flex flex-col items-center text-xs ${active ? "text-blue-500" : "text-zinc-400"
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
