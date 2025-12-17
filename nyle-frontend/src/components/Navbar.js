"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import Link from "next/link";
import { FaHeart, FaUser } from "react-icons/fa";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  // Scroll effect for transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Nyle Store
            </span>
          </Link>

          {/* Desktop Navigation Links - CENTERED */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/products" className="font-medium text-gray-700 hover:text-blue-600 transition">
              Shop
            </Link>
            <Link href="/categories" className="font-medium text-gray-700 hover:text-blue-600 transition">
              Categories
            </Link>
            <Link href="/deals" className="font-medium text-gray-700 hover:text-blue-600 transition">
              Hot Deals
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 text-gray-700 hover:text-blue-600">
              <Search className="h-5 w-5" />
            </button>
            
            {/* Wishlist */}
            <button className="p-2 text-gray-700 hover:text-blue-600 relative">
              <FaHeart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* User Account */}
            <button className="p-2 text-gray-700 hover:text-blue-600">
              <FaUser className="h-5 w-5" />
            </button>
            
            {/* Cart */}
            <button className="p-2 text-gray-700 hover:text-blue-600 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Become Seller Button */}
            <Link href="/vendor/signup" className="hidden md:block">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition">
                Sell on Nyle
              </button>
            </Link>

            {/* Mobile menu toggle */}
            <button 
              className="p-2 md:hidden text-gray-700" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide-in mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-6 border-b">
          <span className="text-xl font-bold text-gray-900">Menu</span>
          <button onClick={toggleMenu} className="text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col px-6 py-6 space-y-4">
          <Link 
            href="/" 
            onClick={toggleMenu} 
            className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100"
          >
            Home
          </Link>
          <Link 
            href="/products" 
            onClick={toggleMenu} 
            className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100"
          >
            Shop All Products
          </Link>
          <Link 
            href="/categories" 
            onClick={toggleMenu} 
            className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100"
          >
            Categories
          </Link>
          <Link 
            href="/deals" 
            onClick={toggleMenu} 
            className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100"
          >
            Hot Deals
          </Link>
          <Link 
            href="/vendor/signup" 
            onClick={toggleMenu} 
            className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100"
          >
            Become a Seller
          </Link>
          <Link 
            href="/about" 
            onClick={toggleMenu} 
            className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100"
          >
            About Us
          </Link>
          <Link 
            href="/contact" 
            onClick={toggleMenu} 
            className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Footer Links */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 border-t">
          <div className="text-sm text-gray-600 mb-4">
            ✨ Discover amazing products on Kenya's fastest-growing marketplace
          </div>
          <div className="flex space-x-4">
            <Link href="/help" className="text-sm text-blue-600 hover:underline">
              Help Center
            </Link>
            <Link href="/terms" className="text-sm text-blue-600 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-blue-600 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
}