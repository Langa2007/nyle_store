"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useCart } from "../../context/CartContext/page";
import { useSession } from "next-auth/react";
import NyleLogo from "@/components/branding/NyleLogo.png";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setShowAuthModal, setAuthAction, getCartTotals } = useCart();
  const { itemCount } = getCartTotals();
  const sessionObj = useSession();
  const session = sessionObj?.data;

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleProfileClick = (e) => {
    if (!session) {
      e.preventDefault();
      setAuthAction('login');
      setShowAuthModal(true);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-black/80 backdrop-blur-xl text-white border-b border-white/5 fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link href="/shop" className="flex flex-shrink-0 items-center gap-2.5">
            <Image
              src={NyleLogo}
              alt="Nyle logo"
              width={36}
              height={36}
              priority
              className="h-9 w-9 drop-shadow-[0_8px_20px_rgba(245,158,11,0.3)]"
            />
            <span className="text-xl font-extrabold tracking-tighter">
              <span className="text-blue-500">NYLE</span>
              <span className="ml-0.5 font-light text-white/40">PRO</span>
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* User Profile / Login */}
            <div className="hidden sm:block">
              {session ? (
                <Link href="/profile" className="flex items-center gap-2 bg-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-800 transition">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {session.user?.name?.charAt(0)}
                  </div>
                  <span className="text-sm font-medium truncate max-w-[100px]">{session.user?.name}</span>
                </Link>
              ) : (
                <button
                  onClick={() => { setAuthAction('login'); setShowAuthModal(true); }}
                  className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition shadow-sm"
                >
                  Sign In
                </button>
              )}
            </div>

            <button
              className="sm:hidden p-2"
              onClick={() => { if (!session) { setAuthAction('login'); setShowAuthModal(true); } else { window.location.href = '/profile'; } }}
            >
              <UserIcon className="h-6 w-6" />
            </button>

            {/* Cart with badge */}
            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] sm:text-xs rounded-full px-1.5 min-w-[18px] text-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button className="p-2 md:hidden" onClick={toggleMenu}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-blue-700 text-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-[60] ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-blue-500">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={toggleMenu}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col px-6 py-4 space-y-4 font-medium">
          <Link href="/shop" onClick={toggleMenu} className="hover:text-blue-500 py-3 border-b border-white/5 flex items-center justify-between group">
            <span>Shop</span>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link href="/cart" onClick={toggleMenu} className="hover:text-blue-500 py-3 border-b border-white/5 flex items-center justify-between group">
            <span>Cart</span>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link href="/profile" onClick={handleProfileClick} className="hover:text-blue-500 py-3 border-b border-white/5 flex items-center justify-between group">
            <span>Profile</span>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          {!session && (
            <button
              onClick={() => { setAuthAction('login'); setShowAuthModal(true); toggleMenu(); }}
              className="text-left py-2 hover:text-blue-200"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
