"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobileBottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const { getCartTotals, setShowCart, setShowAuthModal } = useCart();
    const { itemCount } = getCartTotals();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('accessToken') || localStorage.getItem('userAccessToken');
            setIsLoggedIn(!!token);
        };
        checkAuth();
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const handleNavClick = (e, href, label) => {
        if (label === "Cart") {
            e.preventDefault();
            setShowCart(true);
        } else if (label === "Account") {
            if (!isLoggedIn) {
                e.preventDefault();
                setShowAuthModal(true);
            }
        }
    };

    const links = [
        { href: "/", icon: <Home size={24} />, label: "Home" },
        { href: "/products", icon: <ShoppingBag size={24} />, label: "Shop" },
        {
            href: "/cart", icon: (
                <div className="relative">
                    <ShoppingCart size={24} />
                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                            {itemCount}
                        </span>
                    )}
                </div>
            ), label: "Cart"
        },
        { href: isLoggedIn ? "/user/dashboard" : "#", icon: <User size={24} />, label: "Account" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-blue-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center py-3 z-50 md:hidden pb-safe-offset-2">
            {links.map(({ href, icon, label }) => {
                const active = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        onClick={(e) => handleNavClick(e, href, label)}
                        className={`flex flex-col items-center transition-all duration-300 ${active ? "text-blue-600 scale-110" : "text-gray-400 opacity-70"
                            }`}
                    >
                        <div className={`p-1 rounded-xl transition-colors ${active ? 'bg-blue-50' : ''}`}>
                            {icon}
                        </div>
                        <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${active ? 'opacity-100' : 'opacity-0'}`}>
                            {label}
                        </span>
                        {active && (
                            <div className="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
