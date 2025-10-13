"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Nyle Store
          </Link>

          {/* Marquee on desktop */}
          <div className="hidden md:flex flex-1 justify-center">
            <marquee className="text-lg font-semibold tracking-wide whitespace-nowrap">
              ✨ Welcome to Nyle Store — Discover, Shop, Thrive with Us ✨
            </marquee>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2">
              <ShoppingCart className="h-6 w-6" />
            </button>

            {/* Mobile menu toggle */}
            <button className="p-2 md:hidden" onClick={toggleMenu}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide-in mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-blue-700 text-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-blue-500">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={toggleMenu}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col px-6 py-4 space-y-5">
          <Link href="/" onClick={toggleMenu} className="hover:underline text-lg">
            Home
          </Link>
          <Link href="/shop" onClick={toggleMenu} className="hover:underline text-lg">
            Shop
          </Link>
          <Link href="/contact" onClick={toggleMenu} className="hover:underline text-lg">
            Contact
          </Link>
          <Link href="/about" onClick={toggleMenu} className="hover:underline text-lg">
            About
          </Link>
        </div>

        <div className="px-6 mt-6 text-sm text-gray-200 border-t border-blue-500 pt-3">
          ✨ Welcome to Nyle Store — Discover, Shop, Thrive with Us ✨
        </div>
      </div>
    </nav>
  );
}
