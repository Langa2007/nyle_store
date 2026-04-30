"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getCategories } from "../services/categoryService";
import { getProducts } from "../services/productService";
import { useCart } from "@/context/CartContext/page";
import { useShopActivity } from "@/context/ShopActivityContext/page";
import { motion, AnimatePresence } from "framer-motion";

// Import ALL icons used in the component
import {
  // Payment methods
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaGooglePay,
  FaApplePay,

  // Social media
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,

  // UI Icons
  FaSearch, FaStar, FaTruck, FaShieldAlt, FaFire, FaBolt, FaRocket, FaShoppingBag, FaGem, FaHeadphones, FaLaptop, FaHome, FaTshirt,
  FaArrowRight, FaChevronRight, FaHeart, FaShoppingCart, FaAward, FaClock, FaCheckCircle, FaUsers, FaGlobe, FaLeaf,
  FaCrown, FaStore, FaTag, FaEnvelope, FaExclamationTriangle, FaGift, FaShippingFast, FaSnowflake, FaArrowUp,
  FaChevronLeft, FaChevronRight as FaChevronRightIcon,
  FaBriefcase, FaCar, FaTractor, FaCouch, FaBaby, FaCut, FaHammer, FaAppleAlt, FaMale, FaChild, FaFemale, FaRunning
} from "react-icons/fa";

function HomeContent() {
  const { addToCart } = useCart();
  const {
    recentlyViewedItems,
    toggleWishlist,
    isWishlisted,
    clearRecentlyViewed,
  } = useShopActivity();
  const { data: rawCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
  const categories = Array.isArray(rawCategories) ? rawCategories : (rawCategories?.categories || rawCategories?.items || []);

  const { data: rawProducts } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const products = Array.isArray(rawProducts) ? rawProducts : (rawProducts?.products || rawProducts?.items || []);

  const { data: rawHotDeals } = useQuery({
    queryKey: ["hot-deals"],
    queryFn: () => getProducts({ is_hot_deal: true }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const hotDeals = Array.isArray(rawHotDeals) ? rawHotDeals : (rawHotDeals?.products || rawHotDeals?.items || []);


  const [currency, setCurrency] = useState("KES");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAllCategoriesVisible, setIsAllCategoriesVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const categoriesContainerRef = useRef(null);
  const sliderRef = useRef(null);

  // Hero Carousel State
  const [heroSlides, setHeroSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroFetchFailed, setHeroFetchFailed] = useState(false);

  const fallbackHeroSlides = [
    {
      id: "default-1",
      title: "Discover Amazing Products Daily",
      subtitle: "Your premier destination for quality products from trusted vendors across Kenya.",
      image_url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
      button_text: "Start Shopping",
      button_link: "#products"
    },
    {
      id: "default-2",
      title: "Smart Home, Smart Living",
      subtitle: "Experience the future with our curated collection of smart appliances.",
      image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      button_text: "View Appliances",
      button_link: "#products"
    },
    {
      id: "default-3",
      title: "Elevate Your Style",
      subtitle: "New arrivals in fashion. Trendy, authentic, and affordable.",
      image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
      button_text: "Browse Fashion",
      button_link: "#products"
    },
    {
      id: "default-4",
      title: "Modern Tech Essentials",
      subtitle: "Gadgets that power your productivity and entertainment.",
      image_url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
      button_text: "Shop Tech",
      button_link: "#products"
    },
    {
      id: "default-5",
      title: "Quality for Your Family",
      subtitle: "Everything you need for a comfortable and happy home.",
      image_url: "https://images.unsplash.com/photo-1556911220-e15201887572?q=80&w=2070&auto=format&fit=crop",
      button_text: "Explore Home",
      button_link: "#products"
    }
  ];

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); // idle, loading, success, error
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  };

  const handleNewsletterSubscribe = async (e) => {
    if (e) e.preventDefault();
    if (!isValidEmail(newsletterEmail)) return;

    setNewsletterStatus("loading");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://nyle-store.onrender.com'}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewsletterStatus("success");
        setNewsletterMessage(" Thank you for subscribing! Check your inbox for updates.");
        setNewsletterEmail("");
        setTimeout(() => setNewsletterStatus("idle"), 5000);
      } else {
        setNewsletterStatus("error");
        setNewsletterMessage(data.details || data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter error:", error);
      setNewsletterStatus("error");
      setNewsletterMessage("Unable to connect to service. Please try later.");
    }
  };

  // Enhanced featured categories with icons
  const featuredCategories = [
    { id: "electronics", name: "Electronics", icon: <FaLaptop />, color: "from-blue-500 to-cyan-500" },
    { id: "fashion", name: "Fashion", icon: <FaTshirt />, color: "from-purple-500 to-pink-500" },
    { id: "home", name: "Home & Living", icon: <FaHome />, color: "from-green-500 to-emerald-500" },
    { id: "beauty", name: "Beauty", icon: <FaGem />, color: "from-rose-500 to-red-500" },
    { id: "sports", name: "Sports", icon: <FaBolt />, color: "from-orange-500 to-yellow-500" },
    { id: "books", name: "Books & Media", icon: <FaHeadphones />, color: "from-indigo-500 to-purple-500" },
    { id: "toys", name: "Toys & Games", icon: <FaShoppingBag />, color: "from-red-500 to-pink-500" },
    { id: "health", name: "Health & Fitness", icon: <FaLeaf />, color: "from-teal-500 to-green-500" },
    { id: "automotive", name: "Automotive", icon: <FaRocket />, color: "from-gray-500 to-blue-500" },
    { id: "garden", name: "Garden & Outdoor", icon: <FaGlobe />, color: "from-lime-500 to-green-500" },
  ];

  // Helper to get category config (image & color)
  const getCategoryConfig = (catName) => {
    const name = catName?.toLowerCase() || "";

    // Default fallback
    let image = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"; // Tech/Work abstract

    if (name.includes("computer") || name.includes("electronics")) image = "https://images.unsplash.com/photo-1498049381929-7232985a9003?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("fashion") || name.includes("cloth") || name.includes("wear") || name.includes("outfit")) image = "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("home") || name.includes("living") || name.includes("house")) image = "https://images.unsplash.com/photo-1484154218962-a1c00207bf9a?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("beauty") || name.includes("cosmetic")) image = "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("sports") || name.includes("gym")) image = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("book")) image = "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("toy") || name.includes("game")) image = "https://images.unsplash.com/photo-1566576912902-1d6db6b8d5cb?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("health") || name.includes("fitness")) image = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("auto") || name.includes("car") || name.includes("spare")) image = "https://images.unsplash.com/photo-1486262715619-01b80250e0dc?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("garden") || name.includes("farm") || name.includes("tractor")) image = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("construction") || name.includes("build") || name.includes("machinery")) image = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("cutler") || name.includes("kitchen") || name.includes("cook")) image = "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("grocer") || name.includes("food")) image = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("office") || name.includes("suppl")) image = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("bag") || name.includes("luggage")) image = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("shoe") || name.includes("sneaker")) image = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80";
    else if (name.includes("watch") || name.includes("jewelry")) image = "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=400&q=80";

    return { image };
  };

  // Stats data
  const stats = [
    { value: "50K+", label: "Happy Customers", icon: <FaUsers /> },
    { value: "2K+", label: "Active Sellers", icon: <FaShoppingBag /> },
    { value: "98%", label: "Satisfaction Rate", icon: <FaStar /> },
    { value: "24/7", label: "Support", icon: <FaHeadphones /> },
  ];

  // Products now fetched via useQuery above

  // Detect Currency
  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
        if (!res.ok) throw new Error("Currency detection failed");
        const data = await res.json();
        const code = data?.currency || "KES";
        setCurrency(code);
        if (code === "USD") setExchangeRate(0.0077);
        else if (code === "EUR") setExchangeRate(0.0070);
        else setExchangeRate(1);
      } catch (error) {
        console.warn("Currency detection blocked or failed, defaulting to KES:", error.message);
        setCurrency("KES");
        setExchangeRate(1);
      }
    };
    detectCurrency();
  }, []);

  // Fetch Hero Slides
  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://nyle-store.onrender.com'}/api/hero/active`);
        if (res.ok) {
          const data = await res.json();
          setHeroSlides(Array.isArray(data) ? data : []);
          setHeroFetchFailed(false);
        } else {
          setHeroSlides([]);
          setHeroFetchFailed(true);
        }
      } catch (err) {
        console.error("Hero fetch error:", err);
        setHeroSlides([]);
        setHeroFetchFailed(true);
      }
    };
    fetchHeroSlides();
  }, []);

  const displayHeroSlides = heroSlides.length > 0
    ? heroSlides
    : heroFetchFailed
      ? fallbackHeroSlides
      : [];
  const activeHeroSlide = displayHeroSlides[currentSlide] || null;

  // Hero Transition Logic (30 seconds)
  useEffect(() => {
    if (displayHeroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayHeroSlides.length);
    }, 30000);
    return () => clearInterval(interval);
  }, [displayHeroSlides.length]);

  useEffect(() => {
    if (currentSlide >= displayHeroSlides.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, displayHeroSlides.length]);

  // Auto-scroll categories slider
  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    let animationId;
    let direction = 1; // 1 for right, -1 for left
    let scrollSpeed = 1;

    const autoScroll = () => {
      if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 10)) {
        direction = -1;
        scrollSpeed = 2;
      } else if (slider.scrollLeft <= 10) {
        direction = 1;
        scrollSpeed = 1;
      }

      slider.scrollLeft += direction * scrollSpeed;
      animationId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scroll after a delay
    const startDelay = setTimeout(() => {
      animationId = requestAnimationFrame(autoScroll);
    }, 2000);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(autoScroll);
    };

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(animationId);
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [categories]);

  // Mouse drag functionality for categories slider
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Scroll effect for navbar
  useEffect(() => {
    const scrollRoot = document.getElementById("scroll-root");
    const handleScroll = () => {
      if (scrollRoot) {
        setIsScrolled(scrollRoot.scrollTop > 50);
      } else {
        setIsScrolled(window.scrollY > 50);
      }
    };

    if (scrollRoot) {
      scrollRoot.addEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRoot) {
        scrollRoot.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const convertPrice = (price) => (price * exchangeRate).toFixed(2);

  const scrollToProducts = () => {
    const el = document.getElementById("products-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const resetProductView = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setTimeout(() => scrollToProducts(), 100);
  };

  const showCartNotification = (message) => {
    const notification = document.createElement("div");
    notification.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in";
    notification.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        ${message}
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleQuickAddToCart = async (product) => {
    const result = await addToCart(product, 1);
    if (result.success) {
      showCartNotification("Added to cart!");
    }
  };

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    // If clicking the same category that's already selected, toggle it off (undo)
    if (selectedCategory === categoryId && categoryId !== "all") {
      setSelectedCategory("all");
    } else {
      setSelectedCategory(categoryId);
    }

    setTimeout(() => {
      const el = document.getElementById("products-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Enhanced filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = (product.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    let matchesCategory = true;

    if (selectedCategory !== "all") {
      matchesCategory = product.category === selectedCategory ||
        product.category_id === selectedCategory ||
        (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    return matchesSearch && matchesCategory;
  });

  // Scroll categories slider
  const scrollCategories = (direction) => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const scrollAmount = 300;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  const recentProducts = recentlyViewedItems
    .filter((product) => Number(product?.id || product?.product_id))
    .slice(0, 4);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Desktop content continues... */}
        {/* STATIC Announcement Bar (NOT marquee) */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="font-large">April Deals: Up to 60% OFF on Selected Items!</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <FaShippingFast />
                <span>Free Delivery on Orders Over Ksh 3,000</span>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <FaShieldAlt />
                <span>100% Secure Shopping</span>
              </div>
            </div>
          </div>
        </div>



        {/* DYNAMIC Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-gray-900 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[30000ms] ease-linear scale-110 group-hover:scale-125"
                style={{
                  backgroundImage: activeHeroSlide?.image_url ? `url(${activeHeroSlide.image_url})` : undefined,
                }}
              />

              {/* Overlays for readability and depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/60 to-transparent" />
              <div className="absolute inset-0 bg-black/30" />

              {/* Animated particles/glows */}
              <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
            </motion.div>
          </AnimatePresence>

          <div className="container mx-auto h-full flex items-center relative z-10 px-6">
            <div className="max-w-4xl space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-xl"
                  >
                    <FaFire className="text-orange-400 mr-2 text-xl" />
                    <span className="text-sm md:text-base font-bold tracking-wide uppercase"> Kenya's Fastest Growing Marketplace</span>
                  </motion.div>

                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] drop-shadow-2xl">
                    {activeHeroSlide?.title || "Discover Quality"}
                    <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
                      {activeHeroSlide?.subtitle ? "" : "Every Day"}
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl text-blue-100/90 max-w-2xl font-medium leading-relaxed drop-shadow-lg">
                    {activeHeroSlide?.subtitle || "Explore the best deals and authentic products from trusted Kenyan sellers. Shop with confidence."}
                  </p>

                  <div className="flex flex-wrap gap-5 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={scrollToProducts}
                      className="bg-gradient-to-r from-white to-blue-50 text-blue-900 px-10 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all flex items-center group relative overflow-hidden"
                    >
                      <span className="relative z-10">{activeHeroSlide?.button_text || "Shop Collection"}</span>
                      <FaArrowRight className="ml-3 group-hover:translate-x-3 transition-transform relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>

                    <Link href="/vendor/signup">
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        className="border-2 border-white/40 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all flex items-center group border-dashed"
                      >
                        <div className="mr-3 group-hover:rotate-12 transition-transform" />
                        Become a Seller
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Indicators */}
              <div className="flex items-center gap-3 pt-12">
                {displayHeroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 transition-all duration-500 rounded-full ${idx === currentSlide ? 'w-12 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Decorative scroll button */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hidden md:block"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-white rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* ENHANCED Categories Section - AUTO-SCROLLING SLIDER */}
        <section id="categories" className="container mx-auto px-6 mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Click any category to view all products in that section
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Browse All Categories</h3>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 hidden md:block">
                {selectedCategory !== "all" ? `Showing: ${selectedCategory}` : "Showing: All Products"}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => scrollCategories('left')}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                  aria-label="Scroll left"
                >
                  <FaChevronLeft className="text-gray-600" />
                </button>
                <button
                  onClick={() => scrollCategories('right')}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                  aria-label="Scroll right"
                >
                  <FaChevronRightIcon className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Auto-scrolling Categories Slider */}
          <div className="relative group">
            {/* Gradient overlays for better UX */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* Main Slider Container */}
            <div
              ref={sliderRef}
              className="flex overflow-x-auto pb-6 space-x-6 scrollbar-hide"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {/* All Products Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => handleCategoryClick("all")}
                  className={`flex flex-col items-center justify-center w-48 h-48 rounded-2xl font-medium transition-all transform hover:scale-105 ${selectedCategory === "all"
                    ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xl ring-4 ring-blue-300 ring-opacity-50"
                    : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 hover:shadow-lg"
                    }`}
                >
                  <div className="text-4xl mb-4 transform hover:scale-110 transition-transform">
                    
                  </div>
                  <h3 className="text-xl font-bold mb-2">All Products</h3>
                  <div className="text-sm opacity-80">
                    {selectedCategory === "all" ? "Viewing now" : "Click to explore"}
                  </div>
                </button>
              </div>

              {/* Dynamic Categories from API with Images */}
              {categories.slice(0, 15).map((cat, index) => {
                const { image: fallbackImage } = getCategoryConfig(cat.name);
                const image = cat.image_url || fallbackImage;
                const isSelected = selectedCategory === cat.name;

                return (
                  <motion.div
                    key={cat.id || cat._id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
                    className="flex-shrink-0"
                  >
                    <button
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`group relative w-44 h-60 rounded-3xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${isSelected ? "ring-4 ring-blue-500 shadow-2xl scale-105" : "hover:shadow-xl"
                        }`}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <img
                          src={image}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${isSelected ? "from-blue-900/90 via-blue-800/40" : "from-black/80 via-black/20"
                          } to-transparent`}></div>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                        <h3 className="text-white font-bold text-lg leading-tight mb-1 group-hover:text-blue-200 transition-colors">
                          {cat.name}
                        </h3>
                        <div className="flex items-center text-xs text-gray-300 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <span>Explore Collection</span>
                          <FaArrowRight className="ml-2 w-3 h-3" />
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
                          <FaCheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  </motion.div>
                );
              })}

              {/* Additional Featured Categories (if API doesn't have enough) */}
              {categories.length < 8 && featuredCategories.map((category) => (
                <div key={category.id} className="flex-shrink-0">
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={`flex flex-col items-center justify-center w-48 h-48 rounded-2xl font-medium transition-all transform hover:scale-105 ${selectedCategory === category.id
                      ? "bg-gradient-to-br " + category.color + " text-white shadow-xl ring-4 ring-blue-300 ring-opacity-50"
                      : "bg-gradient-to-br " + category.color.replace('500', '100') + " text-gray-800 hover:shadow-lg"
                      }`}
                  >
                    <div className="text-4xl mb-4 transform hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <div className="text-sm opacity-80">
                      {selectedCategory === category.id ? "Viewing now" : "Click to explore"}
                    </div>
                  </button>
                </div>
              ))}

              {/* "View All" Toggle Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => {
                    setIsAllCategoriesVisible(!isAllCategoriesVisible);
                    if (!isAllCategoriesVisible) {
                      setTimeout(() => {
                        document.getElementById("full-catalog-section")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                  className="flex flex-col items-center justify-center w-48 h-48 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-gray-800 hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <div className="text-4xl mb-4 transform hover:scale-110 transition-transform">
                    {isAllCategoriesVisible ? <FaArrowUp /> : <FaChevronRightIcon />}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {isAllCategoriesVisible ? "Close All" : "View All"}
                  </h3>
                  <div className="text-sm opacity-80">
                    {isAllCategoriesVisible ? "Hide category list" : "See all categories ↓"}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Selected Category Indicator */}
          {selectedCategory !== "all" && (
            <div className="mt-8 text-center">
              <p className="text-blue-600 font-medium">
                Showing products in <span className="font-bold">{selectedCategory}</span> category
                <button
                  onClick={() => handleCategoryClick("all")}
                  className="ml-3 text-sm text-gray-500 hover:text-blue-700"
                >
                  (Clear filter)
                </button>
              </p>
            </div>
          )}

          {/* Mobile Quick Categories */}
          <div className="mt-8 md:hidden">
            <div className="flex overflow-x-auto pb-4 space-x-3 scrollbar-hide">
              <button
                onClick={() => handleCategoryClick("all")}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === "all"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                 All
              </button>
              {categories.slice(0, 8).map((cat) => (
                <button
                  key={cat.id || cat._id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === cat.name
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* FULL CATEGORY GRID - "The Page within the Page" */}
          {isAllCategoriesVisible && (
            <div id="full-catalog-section" className="mt-20 py-12 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-3xl font-extrabold text-gray-900">Explore Our Full Catalog</h3>
                  <p className="text-gray-500 mt-2 text-lg">Browse every curated category in NYLE</p>
                </div>
                <div className="hidden md:block">
                  <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-100">
                    {categories.length} Categories Available
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {categories.map((cat, index) => {
                  const { image: fallbackImage } = getCategoryConfig(cat.name);
                  const image = cat.image_url || fallbackImage;
                  const isSelected = selectedCategory === cat.name;

                  return (
                    <motion.div
                      key={cat.id || cat._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 5) * 0.1 }}
                    >
                      <button
                        onClick={() => handleCategoryClick(cat.name)}
                        className="group w-full text-left focus:outline-none"
                      >
                        <div className={`relative aspect-square rounded-2xl overflow-hidden mb-4 transition-all duration-300 ${isSelected ? 'ring-4 ring-blue-500 shadow-xl' : 'shadow-md group-hover:shadow-lg group-hover:-translate-y-1'
                          }`}>
                          <img
                            src={image}
                            alt={cat.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                          {isSelected && (
                            <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                              <div className="bg-white/90 p-2 rounded-full shadow-lg">
                                <FaCheckCircle className="text-blue-600 w-6 h-6" />
                              </div>
                            </div>
                          )}
                        </div>
                        <h4 className={`font-bold text-lg px-1 transition-colors ${isSelected ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'
                          }`}>
                          {cat.name}
                        </h4>
                        <p className="text-xs text-gray-500 px-1 mt-1 font-medium transform transition-all group-hover:translate-x-1">
                          Explore Collection →
                        </p>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* HOT DEALS SECTION - PREMIUM CAROUSEL */}
        {hotDeals.length > 0 && (
          <section id="hot-deals" className="container mx-auto px-6 mt-20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900 flex items-center">
                  <FaBolt className="text-red-500 mr-3 animate-pulse" />
                  Hot <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent ml-2">Deals</span>
                </h2>
                <p className="text-gray-600 mt-2 text-lg">Hurry! Limited time offers on top brand products</p>
              </div>
              <Link href="/deals" className="flex items-center text-red-600 font-bold hover:text-red-700 transition group">
                View All Deals
                <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide snap-x snap-mandatory">
              {hotDeals.map((product, index) => (
                <motion.div
                  key={product.id || product._id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-80 snap-start"
                >
                  <Link href={`/products/${product.id || product._id}`}>
                    <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-red-50 relative h-full flex flex-col">
                      {/* Deal Badge */}
                      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                        {Math.round(((product.original_price || product.price * 1.25) - product.price) / (product.original_price || product.price * 1.25) * 100) > 0 && (
                          <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg shadow-red-900/20">
                            -{Math.round(((product.original_price || product.price * 1.2) - product.price) / (product.original_price || product.price * 1.2) * 100)}% OFF
                          </span>
                        )}
                        <span className="bg-gray-900/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                           Approved Deal
                        </span>
                      </div>

                      {/* Image */}
                      <div className="relative h-64 overflow-hidden bg-gray-50 flex-shrink-0">
                        <img
                          src={product.image_url || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                      </div>

                      {/* Info */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight flex-1">{product.name}</h3>
                          <div className="flex items-center text-yellow-400 bg-gray-50 px-2 py-1 rounded-lg ml-2">
                            <FaStar size={12} />
                            <span className="ml-1 text-xs font-black text-gray-700">{product.rating || "4.8"}</span>
                          </div>
                        </div>

                        <div className="flex items-end space-x-2 mb-1">
                          <span className="text-2xl font-black text-red-600">
                            {currency} {convertPrice(product.price)}
                          </span>
                          {(product.original_price || product.price > 0) && (
                            <span className="text-sm text-gray-400 line-through mb-1">
                              {currency} {convertPrice(product.original_price || product.price * 1.2)}
                            </span>
                          )}
                        </div>

                        <div className="mb-4">
                          <span className="inline-flex items-center text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                            <FaBolt className="mr-1.5 text-[10px]" />
                            Save {currency} {convertPrice((product.original_price || product.price * 1.2) - product.price)}
                          </span>
                        </div>

                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product, 1, { buyNow: true });
                          }}
                          className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition transform active:scale-95 flex items-center justify-center space-x-2"
                        >
                          <FaShoppingCart />
                          <span>Grab Deal Now</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {recentProducts.length > 0 && (
          <section id="recently-viewed" className="container mx-auto px-6 mt-16 scroll-mt-32">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center bg-rose-100 text-rose-700 px-4 py-2 rounded-full mb-4">
                  <FaHeart className="mr-2" />
                  <span className="font-medium">Recently Viewed</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Pick Up Where You Left Off</h2>
                <p className="text-gray-600 text-lg max-w-2xl">
                  Your latest product views stay here so you can jump back in quickly, then return to the full catalogue whenever you're ready.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={resetProductView}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  See All Products
                </button>
                <button
                  onClick={clearRecentlyViewed}
                  className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                >
                  Clear History
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {recentProducts.map((product, index) => {
                const productId = product.id || product.product_id || product._id;
                const wishlisted = isWishlisted(productId);

                return (
                  <motion.div
                    key={`recent-${productId}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -6 }}
                  >
                    <Link href={`/products/${productId}`}>
                      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-rose-50 to-blue-50">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}

                          <button
                            onClick={async (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              await toggleWishlist(product);
                            }}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow hover:shadow-lg transition"
                            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            <FaHeart className={wishlisted ? "text-red-500" : "text-gray-500 hover:text-red-500"} />
                          </button>
                        </div>

                        <div className="p-5">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2">{product.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem] mb-4">
                            {product.description || "Premium quality product with excellent features."}
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xl font-bold text-blue-700">
                                {currency} {convertPrice(product.price || 0)}
                              </div>
                              <div className="text-xs text-gray-400">
                                Viewed recently
                              </div>
                            </div>
                            <button
                              onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                await handleQuickAddToCart(product);
                              }}
                              className="w-11 h-11 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                              aria-label="Add to cart"
                            >
                              <FaShoppingCart />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Featured Products - NOW FILTERED BY CATEGORY */}
        <section id="products-section" className="container mx-auto px-6 mt-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <FaFire className="mr-2" />
              <span className="font-medium">
                {selectedCategory === "all" ? " All Products" : ` ${selectedCategory} Products`}
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {selectedCategory === "all" ? "Featured Products" : `Products in ${selectedCategory}`}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {selectedCategory === "all"
                ? "Carefully selected products from our top-rated vendors"
                : `Browse all ${filteredProducts.length} products in this category`}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No products found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                {selectedCategory !== "all"
                  ? `We couldn't find any products in "${selectedCategory}" category. Try another category or view all products.`
                  : `We couldn't find any products matching "${searchTerm}". Try a different search term or browse our categories.`}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  View All Products
                </button>
                <button
                  onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                  Browse Categories
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Category Filter Info */}
              {selectedCategory !== "all" && (
                <div className="mb-8 p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-3" />
                      <span className="font-medium">
                        Showing <span className="text-blue-700 font-bold">{filteredProducts.length}</span> products in <span className="text-blue-700 font-bold">{selectedCategory}</span>
                      </span>
                    </div>
                    <button
                      onClick={() => handleCategoryClick("all")}
                      className="text-sm text-gray-600 hover:text-blue-700"
                    >
                      Clear filter ×
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.slice(0, 12).map((product, index) => (
                  <motion.div
                    key={product.id || product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Link href={`/products/${product.id || product._id}`}>
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

                          {/* Product Badges - Removed hardcoded -20% */}
                          {/* <div className="absolute top-4 left-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            -20%
                          </span>
                        </div> */}

                          {/* Category Badge */}
                          <div className="absolute bottom-4 left-4">
                            {product.category && (
                              <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                                {product.category}
                              </span>
                            )}
                          </div>

                          {/* Quick Actions */}
                          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                await toggleWishlist(product);
                              }}
                              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:shadow-lg transition"
                              aria-label={isWishlisted(product.id || product._id) ? "Remove from wishlist" : "Add to wishlist"}
                            >
                              <FaHeart
                                className={isWishlisted(product.id || product._id)
                                  ? "text-red-500"
                                  : "text-gray-600 hover:text-red-500"}
                              />
                            </button>
                            <button
                              onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                await handleQuickAddToCart(product);
                              }}
                              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:shadow-lg transition"
                            >
                              <FaShoppingCart className="text-gray-600 hover:text-blue-600" />
                            </button>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                                {product.name}
                              </h3>
                              {product.category && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {product.category}
                                </div>
                              )}
                            </div>
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

                          {/* Features - Removed hardcoded delivery and warranty */}
                          <div className="flex items-center space-x-4 text-sm text-gray-600 pt-4 border-t">
                            {/* 
                          <div className="flex items-center">
                            <FaTruck className="mr-1 text-blue-600" />
                            <span>Free Delivery</span>
                          </div>
                          <div className="flex items-center">
                            <FaShieldAlt className="mr-1 text-green-600" />
                            <span>2Y Warranty</span>
                          </div> 
                          */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* View More Button */}
              {filteredProducts.length > 12 && (
                <div className="text-center mt-12">
                  <Link href={`/products${selectedCategory !== "all" ? `?category=${selectedCategory}` : ''}`}>
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center mx-auto group">
                      View All {selectedCategory !== "all" ? selectedCategory : ''} Products ({filteredProducts.length})
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
            <form
              onSubmit={handleNewsletterSubscribe}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-grow px-6 py-3 rounded-full text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading" || !isValidEmail(newsletterEmail)}
                className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {newsletterStatus === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-300 font-medium"
              >
                {newsletterMessage}
              </motion.p>
            )}

            {newsletterStatus === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-red-300 font-medium text-sm"
              >
                {newsletterMessage}
              </motion.p>
            )}

            <p className="text-sm text-blue-200 mt-4">
              By subscribing, you agree to our Privacy Policy
            </p>
          </div>
        </section>

        {/* ENHANCED FOOTER - WITH ALL ORIGINAL LINKS RESTORED */}
        <footer id="footer" className="mt-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
          <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
              {/* Sell on Nyle Section */}
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <FaStore className="mr-2 text-blue-400" />
                  Sell on Nyle
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/vendor/why-sell" className="text-gray-300 hover:text-white transition hover:underline">Why Sell on Nyle</Link></li>
                  <li><Link href="/vendor/signup" className="text-gray-300 hover:text-white transition hover:underline">Sell On Nyle</Link></li>
                  <li><Link href="/vendor/quotations" className="text-gray-300 hover:text-white transition hover:underline">Get Seller Quotations</Link></li>
                  <li><Link href="/vendor/policies" className="text-gray-300 hover:text-white transition hover:underline">Seller Policies</Link></li>
                  <li><Link href="/vendor/app" className="text-gray-300 hover:text-white transition hover:underline">Get Our App</Link></li>
                  <li><Link href="/vendor/shipping-logistics" className="text-gray-300 hover:text-white transition hover:underline">Shipping Logistics</Link></li>
                </ul>
              </div>

              {/* More About Us Section */}
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <FaGlobe className="mr-2 text-blue-400" />
                  More About Us
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about/know-nyle" className="text-gray-300 hover:text-white transition hover:underline">Know Nyle</Link></li>
                  <li><Link href="/about/careers" className="text-gray-300 hover:text-white transition hover:underline">Careers</Link></li>
                  <li><Link href="/about/partners" className="text-gray-300 hover:text-white transition hover:underline">Partners</Link></li>
                  <li><Link href="/about/newsletter" className="text-gray-300 hover:text-white transition hover:underline">Newsletter</Link></li>
                </ul>
              </div>

              {/* Support Section */}
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <FaHeadphones className="mr-2 text-blue-400" />
                  Support
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/support/help-center" className="text-gray-300 hover:text-white transition hover:underline">Help Center</Link></li>
                  <li><Link href="/support/contact" className="text-gray-300 hover:text-white transition hover:underline">Contact Us</Link></li>
                  <li><Link href="/support/faqs" className="text-gray-300 hover:text-white transition hover:underline">FAQs</Link></li>
                  <li><Link href="/support/report-issue" className="text-gray-300 hover:text-white transition hover:underline">Report An Issue</Link></li>
                </ul>
              </div>

              {/* Nyle Payments Section */}
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <FaCcVisa className="mr-2 text-blue-400" />
                  Nyle Payments
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/payments/methods" className="text-gray-300 hover:text-white transition hover:underline">Accepted Payment Methods</Link></li>
                  <li><Link href="/payments/returns" className="text-gray-300 hover:text-white transition hover:underline">Returns & Refunds</Link></li>
                  <li><Link href="/payments/policies" className="text-gray-300 hover:text-white transition hover:underline">Shipping & Delivery</Link></li>
                  <li><Link href="/payments/protection" className="text-gray-300 hover:text-white transition hover:underline">Customer Protection</Link></li>
                </ul>
              </div>

              {/* Source on Nyle Section */}
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <FaSearch className="mr-2 text-blue-400" />
                  Source on Nyle
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/source/quotation" className="text-gray-300 hover:text-white transition hover:underline">Get Quotations</Link></li>
                  <li><Link href="/source/shipping-policies" className="text-gray-300 hover:text-white transition hover:underline">Shipping Policies</Link></li>
                  <li><Link href="/source/suppliers" className="text-gray-300 hover:text-white transition hover:underline">Find Suppliers</Link></li>
                  <li><Link href="/source/trade-assurance" className="text-gray-300 hover:text-white transition hover:underline">Trade Assurance</Link></li>
                  <li><Link href="/source/logistics" className="text-gray-300 hover:text-white transition hover:underline">Logistics Services</Link></li>
                </ul>
              </div>

            </div>

            {/* Social Media & Payment Methods */}
            <div className="mt-16 pt-8 border-t border-gray-800">
              {/* Social Media Links */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                  <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
                  <div className="flex space-x-4 text-2xl">
                    <a href="#" title="Facebook" className="hover:text-blue-300 transition">
                      <FaFacebookF />
                    </a>
                    <a href="#" title="Twitter" className="hover:text-blue-300 transition">
                      <FaTwitter />
                    </a>
                    <a href="#" title="Instagram" className="hover:text-blue-300 transition">
                      <FaInstagram />
                    </a>
                    <a href="#" title="LinkedIn" className="hover:text-blue-300 transition">
                      <FaLinkedinIn />
                    </a>
                    <a href="#" title="YouTube" className="hover:text-blue-300 transition">
                      <FaYoutube />
                    </a>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="text-center md:text-right">
                  <h4 className="text-lg font-bold mb-4">We Accept</h4>
                  <div className="flex space-x-4 text-3xl">
                    <FaCcVisa />
                    <FaCcMastercard />
                    <FaCcPaypal />
                    <FaGooglePay />
                    <FaApplePay />
                  </div>
                </div>
              </div>

              {/* Copyright & Legal */}
              <div className="text-center pt-6 border-t border-gray-800">
                <p className="text-sm text-blue-100">
                   {new Date().getFullYear()} Nyle Store. All rights reserved.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs text-gray-400">
                  <Link href="others/privacy" className="hover:text-white transition">Privacy Policy</Link>
                  <Link href="others/terms" className="hover:text-white transition">Terms of Service</Link>
                  <Link href="others/cookies" className="hover:text-white transition">Cookie Policy</Link>
                  <Link href="others/sitemap" className="hover:text-white transition">Sitemap</Link>
                  <Link href="others/accessibility" className="hover:text-white transition">Accessibility</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Action Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            const scrollRoot = document.getElementById("scroll-root");
            if (!scrollRoot) return;
            scrollRoot.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="fixed bottom-8 right-8 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition"
          aria-label="Back to Top"
        >
          <FaArrowUp />
        </motion.button>
      </div>
    </>
  );
}

export default function Home() {
  return <HomeContent />;
}

export const dynamic = "force-dynamic";
