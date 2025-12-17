"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getCategories } from "../services/categoryService";
import { getProducts } from "../services/productService";
import ClientProviders from "../components/ClientProviders";
import {
  FaCcVisa, FaCcMastercard, FaCcPaypal, FaGooglePay, FaApplePay,
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaSearch,
  FaStar, FaTruck, FaShieldAlt, FaTag, FaFire, FaBolt, FaRocket,
  FaShoppingBag, FaGem, FaHeadphones, FaLaptop, FaHome, FaTshirt,
  FaArrowRight, FaChevronRight, FaHeart, FaShoppingCart, FaAward,
  FaClock, FaCheckCircle, FaUsers, FaGlobe, FaLeaf, FaCrown, FaStore
} from "react-icons/fa";
import { motion } from "framer-motion";

function HomeContent() {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [currency, setCurrency] = useState("KES");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);

  // Enhanced featured categories with icons
  const featuredCategories = [
    { id: "electronics", name: "Electronics", icon: <FaLaptop />, color: "from-blue-500 to-cyan-500" },
    { id: "fashion", name: "Fashion", icon: <FaTshirt />, color: "from-purple-500 to-pink-500" },
    { id: "home", name: "Home & Living", icon: <FaHome />, color: "from-green-500 to-emerald-500" },
    { id: "beauty", name: "Beauty", icon: <FaGem />, color: "from-rose-500 to-red-500" },
    { id: "sports", name: "Sports", icon: <FaBolt />, color: "from-orange-500 to-yellow-500" },
  ];

  // Stats data
  const stats = [
    { value: "50K+", label: "Happy Customers", icon: <FaUsers /> },
    { value: "2K+", label: "Active Sellers", icon: <FaShoppingBag /> },
    { value: "98%", label: "Satisfaction Rate", icon: <FaStar /> },
    { value: "24/7", label: "Support", icon: <FaHeadphones /> },
  ];

  // Fetch products
  useEffect(() => {
    const fetchRealProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };
    fetchRealProducts();
  }, []);

  // Detect Currency
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const code = data?.currency || "KES";
        setCurrency(code);
        if (code === "USD") setExchangeRate(0.0077);
        else if (code === "EUR") setExchangeRate(0.0070);
        else setExchangeRate(1);
      })
      .catch(() => setCurrency("KES"));
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const convertPrice = (price) => (price * exchangeRate).toFixed(2);

  const scrollToProducts = () => {
    const el = document.getElementById("products-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = (product.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <FaCrown className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Nyle Store
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium hover:text-blue-600 transition">Home</Link>
            <Link href="#products-section" className="font-medium hover:text-blue-600 transition">Shop</Link>
            <Link href="#categories" className="font-medium hover:text-blue-600 transition">Categories</Link>
            <Link href="/vendor/signup" className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition">
              Sell on Nyle
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Redesigned */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-32 pb-20 px-6">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-60 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <FaFire className="text-orange-400 mr-2" />
                <span className="text-sm font-medium">🚀 Kenya's Fastest Growing Marketplace</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                Discover Amazing
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Products Daily
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                Welcome to <span className="font-bold text-white">Nyle Store</span> – 
                Your premier destination for quality products from trusted vendors across Kenya.
                Shop smart, live better.
              </p>

              {/* Enhanced Search Bar */}
              <div className="max-w-2xl mb-8">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                  <div className="relative flex items-center bg-white rounded-xl shadow-2xl">
                    <input
                      type="text"
                      placeholder="What are you looking for today?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-grow px-6 py-4 text-gray-800 rounded-xl focus:outline-none text-lg"
                    />
                    <button
                      onClick={scrollToProducts}
                      className="m-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105"
                    >
                      <FaSearch size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Hero CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToProducts}
                  className="bg-gradient-to-r from-white to-blue-50 text-blue-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center group"
                >
                  Start Shopping Now
                  <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </motion.button>
                
                <Link href="/vendor/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center group"
                  >
                    <FaRocket className="mr-3" />
                    Become a Seller
                  </motion.button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop"
                  alt="Modern Shopping Experience"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                
                {/* Floating product cards */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl w-64">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaTshirt className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Summer Collection</div>
                      <div className="text-sm text-gray-600">50% OFF Today</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-700">Ksh 2,499</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section - Redesigned */}
      <section id="categories" className="container mx-auto px-6 mt-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore thousands of products across our curated categories
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => {
                setSelectedCategory(category.id);
                scrollToProducts();
              }}
            >
              <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 text-center text-white shadow-xl transform group-hover:scale-105 transition-all duration-300`}>
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <div className="text-sm opacity-80">Explore Now →</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Categories Scroll */}
        {categories.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">All Categories</h3>
              <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                View All <FaChevronRight className="ml-1" />
              </button>
            </div>
            <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === "all" 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === cat.name 
                      ? "bg-blue-600 text-white shadow-lg" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Featured Products - Enhanced */}
      <section id="products-section" className="container mx-auto px-6 mt-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <FaFire className="mr-2" />
            <span className="font-medium">🔥 Hot Deals This Week</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Carefully selected products from our top-rated vendors
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No products found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We couldn't find any products matching "{searchTerm}". Try a different search term or browse our categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              View All Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                      {/* Product Image */}
                      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-gray-50">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-6xl font-bold text-blue-600 mb-2">
                                {product.name?.[0]}
                              </div>
                              <div className="text-gray-400">No Image</div>
                            </div>
                          </div>
                        )}
                        
                        {/* Product Badges */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            -20%
                          </span>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:shadow-lg transition">
                            <FaHeart className="text-gray-600 hover:text-red-500" />
                          </button>
                          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:shadow-lg transition">
                            <FaShoppingCart className="text-gray-600 hover:text-blue-600" />
                          </button>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center text-yellow-400">
                            <FaStar />
                            <span className="ml-1 text-sm font-medium">4.5</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4 min-h-[2.5rem]">
                          {product.description || "Premium quality product with excellent features."}
                        </p>
                        
                        {/* Price Section */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-2xl font-bold text-blue-700">
                              {currency} {convertPrice(product.price || 0)}
                            </div>
                            <div className="text-sm text-gray-500 line-through">
                              {currency} {(parseFloat(convertPrice(product.price || 0)) * 1.2).toFixed(2)}
                            </div>
                          </div>
                          <div className="text-xs font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
                            In Stock
                          </div>
                        </div>
                        
                        {/* Features */}
                        <div className="flex items-center space-x-4 text-sm text-gray-600 pt-4 border-t">
                          <div className="flex items-center">
                            <FaTruck className="mr-1 text-blue-600" />
                            <span>Free Delivery</span>
                          </div>
                          <div className="flex items-center">
                            <FaShieldAlt className="mr-1 text-green-600" />
                            <span>2Y Warranty</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View More Button */}
            {filteredProducts.length > 8 && (
              <div className="text-center mt-12">
                <Link href="/products">
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center mx-auto group">
                    View All Products
                    <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      {/* Trust Badges Section */}
      <section className="container mx-auto px-6 mt-24">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Shop With <span className="text-blue-600">Nyle Store</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience in Kenya
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaShieldAlt />, title: "Secure Payments", desc: "100% secure transaction with multiple payment options" },
              { icon: <FaTruck />, title: "Fast Delivery", desc: "Nationwide delivery within 1-5 business days" },
              { icon: <FaAward />, title: "Quality Guarantee", desc: "All products verified for quality and authenticity" },
              { icon: <FaClock />, title: "24/7 Support", desc: "Round-the-clock customer support via chat and phone" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-2xl text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-6 mt-24">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Deals</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get 15% off your first order plus weekly deals
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-6 py-3 rounded-full text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-blue-200 mt-4">
            By subscribing, you agree to our Privacy Policy
          </p>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="mt-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <FaCrown className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold">Nyle Store</div>
                  <div className="text-sm text-gray-400">Kenya's Premier Marketplace</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Transforming online shopping in Kenya with quality products, trusted vendors, and exceptional customer service since 2023.
              </p>
              <div className="flex space-x-4">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center">
                <FaChevronRight className="mr-2 text-blue-400" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
                <li><Link href="/products" className="text-gray-300 hover:text-white transition">All Products</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
                <li><Link href="/blog" className="text-gray-300 hover:text-white transition">Blog</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center">
                <FaHeadphones className="mr-2 text-blue-400" />
                Customer Service
              </h3>
              <ul className="space-y-3">
                <li><Link href="/help" className="text-gray-300 hover:text-white transition">Help Center</Link></li>
                <li><Link href="/track-order" className="text-gray-300 hover:text-white transition">Track Order</Link></li>
                <li><Link href="/returns" className="text-gray-300 hover:text-white transition">Returns & Refunds</Link></li>
                <li><Link href="/shipping" className="text-gray-300 hover:text-white transition">Shipping Info</Link></li>
                <li><Link href="/faq" className="text-gray-300 hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>

            {/* Seller Info */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center">
                <FaStore className="mr-2 text-blue-400" />
                For Sellers
              </h3>
              <ul className="space-y-3">
                <li><Link href="/vendor/signup" className="text-gray-300 hover:text-white transition">Become a Seller</Link></li>
                <li><Link href="/vendor/dashboard" className="text-gray-300 hover:text-white transition">Seller Dashboard</Link></li>
                <li><Link href="/vendor/policies" className="text-gray-300 hover:text-white transition">Seller Policies</Link></li>
                <li><Link href="/vendor/support" className="text-gray-300 hover:text-white transition">Seller Support</Link></li>
              </ul>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h4 className="text-sm font-semibold mb-4">Accepted Payment Methods</h4>
                <div className="flex space-x-4 text-3xl">
                  {[FaCcVisa, FaCcMastercard, FaCcPaypal, FaGooglePay, FaApplePay].map((Icon, index) => (
                    <div key={index} className="bg-white/10 p-3 rounded-lg">
                      <Icon />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-sm text-gray-400 mb-2">© {new Date().getFullYear()} Nyle Store. All rights reserved.</div>
                <div className="flex space-x-6 text-sm">
                  <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
                  <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
                  <Link href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {[
              { text: "SSL Secured", icon: <FaShieldAlt /> },
              { text: "100% Safe", icon: <FaCheckCircle /> },
              { text: "Kenyan Owned", icon: <FaGlobe /> },
              { text: "Eco-Friendly", icon: <FaLeaf /> }
            ].map((badge, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="text-blue-400">{badge.icon}</div>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center z-50"
      >
        <FaArrowRight className="text-white -rotate-90" />
      </motion.button>
    </div>
  );
}

export default function Home() {
  return (
    <ClientProviders>
      <HomeContent />
    </ClientProviders>
  );
}

export const dynamic = "force-dynamic";