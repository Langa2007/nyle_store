"use client";

import { useState } from "react";
import { ShoppingCart, Menu, X, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useCart } from "../../context/mobile-v2/CartContext";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, setShowAuthModal, setAuthAction } = useCart();
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
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-2xl font-bold">
            Nyle Store
          </Link>

          {/* Desktop marquee */}
          <div className="hidden md:flex flex-1 justify-center mx-4">
            <marquee className="text-sm font-semibold tracking-wide">
              ✨ Welcome to Nyle Store — Discover, Shop, Thrive with Us ✨
            </marquee>
          </div>

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
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] sm:text-xs rounded-full px-1.5 min-w-[18px] text-center">
                  {cart.length}
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
          <Link href="/" onClick={toggleMenu} className="hover:text-blue-200 py-2 border-b border-blue-600/50">
            Home
          </Link>
          <Link href="/shop" onClick={toggleMenu} className="hover:text-blue-200 py-2 border-b border-blue-600/50">
            Shop
          </Link>
          <Link href="/cart" onClick={toggleMenu} className="hover:text-blue-200 py-2 border-b border-blue-600/50">
            Cart
          </Link>
          <Link href="/profile" onClick={handleProfileClick} className="hover:text-blue-200 py-2 border-b border-blue-600/50">
            Profile
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
