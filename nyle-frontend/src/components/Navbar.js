"use client";

import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold">
            Nyle Store
          </div>

          {/* Marquee Welcome Text */}
          <div className="hidden md:flex flex-1 justify-center">
            <marquee className="text-lg font-semibold tracking-wide">
              ✨ Welcome to Nyle Store — Discover, Shop, Thrive with Us ✨
            </marquee>
          </div>

          {/* Right Icons */}
          <div className="flex items-center">
            <button className="p-2">
              <ShoppingCart className="h-6 w-6" />
            </button>

            {/* Mobile menu toggle */}
            <button
              className="ml-2 p-2 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (show marquee here too for consistency) */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-blue-700">
          <marquee className="text-sm font-semibold">
            ✨ Welcome to Nyle Store — Discover, Shop, Thrive with Us ✨
          </marquee>
        </div>
      )}
    </nav>
  );
}
