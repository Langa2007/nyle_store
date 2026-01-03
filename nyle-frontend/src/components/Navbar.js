"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import Link from "next/link";
import { FaHeart, FaUser, FaSignInAlt, FaUserPlus, FaStore } from "react-icons/fa";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  // Real API search function
  const searchProducts = async (query) => {
    if (!query.trim()) return [];
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?q=${encodeURIComponent(query)}&limit=5`
      );
      
      if (!response.ok) {
        // If API fails, return empty results (no mock fallback)
        console.warn('Search API failed, returning empty results');
        return [];
      }
      
      const data = await response.json();
      return data.products || data.items || data || [];
    } catch (error) {
      console.error('Search error:', error);
      return []; // Return empty array on error
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.trim().length === 0) {
        setSearchResults([]);
        setShowSearchResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchProducts(query);
        setSearchResults(results);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500), // 500ms delay
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Background and text color logic
  const getNavbarBackground = () => {
    if (isScrolled) {
      return "bg-white/95 backdrop-blur-lg shadow-lg";
    }
    return "bg-gradient-to-r from-blue-600/95 to-indigo-700/95 backdrop-blur-md";
  };

  const getTextColor = () => {
    return isScrolled ? "text-gray-700" : "text-white";
  };

  const getHoverColor = () => {
    return isScrolled ? "hover:text-blue-600" : "hover:text-blue-200";
  };

  // Format price function
  const formatPrice = (price) => {
    if (!price) return "Ksh 0";
    return `Ksh ${parseInt(price).toLocaleString()}`;
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${getNavbarBackground()}`}>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-2 px-4">
        <div className="container mx-auto text-center text-sm">
          <span className="font-medium"> Happy New Year Sale!: Up to 60% OFF!</span>
          <span className="mx-4 hidden md:inline">|</span>
          <span className="hidden md:inline">🚚 Free Delivery on Orders Over Ksh 3,000</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-blue-600 font-bold text-lg">N</span>
            </div>
            <span className={`text-2xl font-bold ${getTextColor()}`}>
              Nyle Store
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`font-medium transition ${getTextColor()} ${getHoverColor()}`}>
              Home
            </Link>
            <Link href="/products" className={`font-medium transition ${getTextColor()} ${getHoverColor()}`}>
              Shop
            </Link>
            <Link href="/categories" className={`font-medium transition ${getTextColor()} ${getHoverColor()}`}>
              Categories
            </Link>
            <Link href="/deals" className={`font-medium transition ${getTextColor()} ${getHoverColor()}`}>
              Hot Deals
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon with Dropdown */}
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isScrolled ? 'text-gray-400' : 'text-blue-200'}`} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery && setShowSearchResults(true)}
                  className={`pl-10 pr-4 py-2 rounded-lg border transition-all duration-300 w-48 focus:w-64 focus:outline-none ${
                    isScrolled 
                      ? 'bg-gray-50 border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                      : 'bg-white/20 border-white/30 text-white placeholder-blue-100 focus:bg-white focus:text-gray-800 focus:border-white'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearchResults(false);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className={`absolute top-full left-0 mt-1 w-96 rounded-lg shadow-xl overflow-hidden z-50 ${
                  isScrolled ? 'bg-white' : 'bg-white'
                }`}>
                  <div className="max-h-80 overflow-y-auto">
                    {isSearching ? (
                      <div className="p-4 text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Searching...</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        <div className="px-4 py-3 bg-gray-50 border-b">
                          <p className="text-sm font-medium text-gray-700">
                            Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        {searchResults.map((product) => (
                          <Link
                            key={product.id || product._id}
                            href={`/products/${product.id || product._id || product.slug}`}
                            onClick={() => {
                              setShowSearchResults(false);
                              setSearchQuery("");
                            }}
                            className="block px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                  {product.name || product.title}
                                </p>
                                <p className="text-sm text-gray-600 truncate">
                                  {product.category || product.type || "Product"}
                                </p>
                              </div>
                              <p className="font-bold text-blue-700 ml-2">
                                {formatPrice(product.price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                        <div className="px-4 py-3 bg-gray-50 border-t">
                          <button
                            onClick={handleSearchSubmit}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                          >
                            View All Results
                          </button>
                        </div>
                      </>
                    ) : searchQuery ? (
                      <div className="p-4 text-center">
                        <p className="text-gray-600">No products found for "{searchQuery}"</p>
                        <p className="text-sm text-gray-500 mt-1">Try different keywords</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
            
            {/* Wishlist */}
            <button className={`p-2 transition relative ${getTextColor()} ${getHoverColor()}`}>
              <FaHeart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* User Account Dropdown */}
            <div className="relative group">
              <button className={`p-2 transition flex items-center ${getTextColor()} ${getHoverColor()}`}>
                <FaUser className="h-5 w-5" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {userLoggedIn ? (
                  <>
                    <Link href="/user/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                      My Dashboard
                    </Link>
                    <Link href="/user/orders" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                      My Orders
                    </Link>
                    <Link href="/user/wishlist" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                      Wishlist
                    </Link>
                    <div className="border-t">
                      <button className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition">
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center">
                      <FaSignInAlt className="mr-2 text-blue-600" />
                      User Login
                    </Link>
                    <Link href="/auth/signup" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center">
                      <FaUserPlus className="mr-2 text-green-600" />
                      User Sign Up
                    </Link>
                    <div className="border-t pt-2">
                      <Link href="/vendor/login" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center text-sm">
                        <FaStore className="mr-2 text-orange-600" />
                        Vendor Login
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Cart */}
            <button className={`p-2 transition relative ${getTextColor()} ${getHoverColor()}`}>
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Become Seller Button */}
            <Link href="/vendor/signup" className="hidden md:block">
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition shadow-lg flex items-center">
                <FaStore className="mr-2" />
                Sell on Nyle
              </button>
            </Link>

            {/* Mobile menu toggle */}
            <button 
              className={`p-2 md:hidden transition ${getTextColor()}`}
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
        <div className="flex justify-between items-center px-6 py-6 border-b bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={toggleMenu}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col px-6 py-6 space-y-1">
          {/* Mobile Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
          </div>

          {/* User Section */}
          <div className="mb-4 pb-4 border-b">
            {userLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-blue-600 text-xl" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">John Doe</div>
                  <div className="text-sm text-gray-600">john@example.com</div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link 
                  href="/auth/login" 
                  onClick={toggleMenu} 
                  className="block bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition text-center"
                >
                  <FaSignInAlt className="inline mr-2" />
                  User Login
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    href="/auth/signup" 
                    onClick={toggleMenu} 
                    className="border border-blue-600 text-blue-600 px-4 py-3 rounded-lg font-medium hover:bg-blue-50 transition text-center"
                  >
                    User Sign Up
                  </Link>
                  <Link 
                    href="/vendor/login" 
                    onClick={toggleMenu} 
                    className="border border-orange-600 text-orange-600 px-4 py-3 rounded-lg font-medium hover:bg-orange-50 transition text-center"
                  >
                    Vendor Login
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <Link 
            href="/" 
            onClick={toggleMenu} 
            className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 transition"
          >
            Home
          </Link>
          <Link 
            href="/products" 
            onClick={toggleMenu} 
            className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 transition"
          >
            Shop All Products
          </Link>
          <Link 
            href="/categories" 
            onClick={toggleMenu} 
            className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 transition"
          >
            Categories
          </Link>
          <Link 
            href="/deals" 
            onClick={toggleMenu} 
            className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 transition"
          >
            Hot Deals
          </Link>
          <Link 
            href="/vendor/signup" 
            onClick={toggleMenu} 
            className="py-3 text-lg font-medium text-gray-800 hover:text-orange-600 hover:bg-orange-50 rounded-lg px-3 transition flex items-center"
          >
            <FaStore className="mr-2" />
            Become a Seller
          </Link>
          
          {/* Account Links */}
          <div className="mt-4 pt-4 border-t">
            <Link 
              href="/user/account" 
              onClick={toggleMenu} 
              className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 transition"
            >
              My Account
            </Link>
            <Link 
              href="/help" 
              onClick={toggleMenu} 
              className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 transition"
            >
              Help Center
            </Link>
          </div>
        </div>

        {/* Mobile Footer Links */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 border-t">
          <div className="text-sm text-gray-600 mb-4">
            ✨ Discover amazing products on Kenya's fastest-growing marketplace
          </div>
          <div className="flex space-x-4">
            <Link href="/terms" className="text-sm text-blue-600 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-blue-600 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-blue-600 hover:underline">
              Contact
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