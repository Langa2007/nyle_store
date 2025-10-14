"use client";

import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-2xl font-bold">
            Nyle Store
          </Link>

          {/* Desktop marquee */}
          <div className="hidden md:flex flex-1 justify-center">
            <marquee className="text-lg font-semibold tracking-wide">
              ✨ Welcome to Nyle Store — Discover, Shop, Thrive with Us ✨
            </marquee>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Cart with badge */}
            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6" />
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1.5">
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
        className={`fixed top-0 right-0 h-full w-2/3 bg-blue-700 text-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-blue-500">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={toggleMenu}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col px-6 py-4 space-y-4">
          <Link href="/" onClick={toggleMenu} className="hover:underline">
            Home
          </Link>
          <Link href="/shop" onClick={toggleMenu} className="hover:underline">
            Shop
          </Link>
          <Link href="/cart" onClick={toggleMenu} className="hover:underline">
            Cart
          </Link>
          <Link href="/profile" onClick={toggleMenu} className="hover:underline">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
