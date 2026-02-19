"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import Link from "next/link";
import { FaHeart, FaUser, FaSignInAlt, FaUserPlus, FaStore } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import debounce from "lodash.debounce";
import { useCart } from "@/context/CartContext/page";

import { useIsMobile } from "@/lib/useMobile";


export default function Navbar() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // use CSS for hiding to avoid hydration flickers
  const [isScrolled, setIsScrolled] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const { getCartTotals, setShowCart } = useCart();
  const { itemCount } = getCartTotals();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories in Navbar:", error);
      }
    };
    fetchCategories();
  }, []);

  const getCategoryImage = (name) => {
    const n = name?.toLowerCase() || "";
    if (n.includes("electronics")) return "https://images.unsplash.com/photo-1498049381929-7232985a9003?q=80&w=200&auto=format&fit=crop";
    if (n.includes("fashion") || n.includes("cloth")) return "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=200&auto=format&fit=crop";
    if (n.includes("home")) return "https://images.unsplash.com/photo-1484154218962-a1c00207bf9a?q=80&w=200&auto=format&fit=crop";
    if (n.includes("beauty")) return "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=200&auto=format&fit=crop";
    if (n.includes("sport") || n.includes("gym")) return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=200&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=200&auto=format&fit=crop";
  };


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

  // Scroll effect for transparency and visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Mobile only: Hide on scroll down, show on scroll up
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        if (window.scrollY > 100) {
          if (window.scrollY > lastScrollY) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  const handleCartClick = () => {
    if (itemCount > 0) {
      setShowCart(true);
    } else {
      // If empty, scroll to products or navigate home
      if (pathname === '/') {
        const el = document.getElementById('products-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/#products-section');
      }
    }
  };


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${getNavbarBackground()} ${isVisible ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}
    >
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-2 px-4">
        <div className="container mx-auto text-center text-sm">
          <span className="font-medium"> Up To 60% off on Selected Products!</span>
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
                  className={`pl-10 pr-4 py-2 rounded-lg border transition-all duration-300 w-48 focus:w-64 focus:outline-none ${isScrolled
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
                <div className={`absolute top-full left-0 mt-1 w-96 rounded-lg shadow-xl overflow-hidden z-50 ${isScrolled ? 'bg-white' : 'bg-white'
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

            {/* User Account Dropdown */}

            <div className="relative group">
              <button className={`p-2 transition flex items-center ${getTextColor()} ${getHoverColor()}`}>
                <FaUser className="h-5 w-5" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {userLoggedIn ? (
                  <>
                    <Link href="/profile" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
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
                        Seller Login
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Cart */}
            <button
              onClick={handleCartClick}
              className={`p-2 transition relative ${getTextColor()} ${getHoverColor()}`}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>


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
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
                  <div className="font-bold text-gray-900">Your Account</div>
                  <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="text-xs text-red-500 font-medium">Log out</button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/auth/login"
                    onClick={toggleMenu}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                  >
                    <FaSignInAlt />
                    Sign In
                  </Link>
                  <button
                    onClick={() => { /* Google Sign In logic */ toggleMenu(); }}
                    className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-bold hover:bg-gray-50 transition shadow-sm"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                    Continue with Google
                  </button>
                  <Link
                    href="/auth/signup"
                    onClick={toggleMenu}
                    className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 px-4 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition"
                  >
                    <FaUserPlus />
                    Create Account
                  </Link>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <Link
                    href="/vendor/login"
                    onClick={toggleMenu}
                    className="flex items-center justify-center gap-2 text-orange-600 text-sm font-bold hover:underline"
                  >
                    <FaStore />
                    Seller Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Categories Section in Drawer */}
          <div className="mt-4">
            <h3 className="text-sm font-black text-gray-900 mb-4 uppercase tracking-widest">Categories</h3>
            <div className="grid grid-cols-2 gap-3 pb-8">
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id || cat._id}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  onClick={toggleMenu}
                  className="group relative h-24 rounded-2xl overflow-hidden"
                >
                  <img src={getCategoryImage(cat.name)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={cat.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-black text-white">{cat.name}</span>
                </Link>
              ))}
            </div>
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

          {/* Account Links */}
          <div className="mt-4 pt-4 border-t">
            <Link
              href="/auth/login"
              onClick={toggleMenu}
              className="py-3 text-lg font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 transition"
            >
              My Account
            </Link>
            <Link
              href="support/help-center"
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
            <Link href="/auth/terms" className="text-sm text-blue-600 hover:underline">
              Terms
            </Link>
            <Link href="/others/privacy" className="text-sm text-blue-600 hover:underline">
              Privacy
            </Link>
            <Link href="/support/contact" className="text-sm text-blue-600 hover:underline">
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