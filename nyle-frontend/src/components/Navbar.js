"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X, Search, Sparkles, Zap, Tag, Gift, Star, ChevronRight, Crown, Flame } from "lucide-react";
import Link from "next/link";
import { FaHeart, FaUser, FaSignInAlt, FaUserPlus, FaStore, FaCog, FaHistory, FaSignOutAlt, FaGift, FaBolt, FaFire, FaCrown, FaGem } from "react-icons/fa";

import { useRouter, usePathname } from "next/navigation";
import debounce from "lodash.debounce";
import { useCart } from "@/context/CartContext/page";
import { useShopActivity } from "@/context/ShopActivityContext/page";
import { useIsMobile } from "@/lib/useMobile";
import { useSession, signOut } from "next-auth/react";
import NyleLogo from "@/components/branding/NyleLogo.png";

// Enhanced holiday campaigns with more dynamic options
const HOLIDAY_CAMPAIGNS = [
  {
    id: "international-womens-day",
    badge: "👩 International Women's Day",
    headline: "Celebrate with 62% OFF on premium collections",
    ctaLabel: "Shop Now",
    ctaHref: "/deals",
    startDate: "2026-03-01T00:00:00+03:00",
    endDate: "2026-03-09T00:00:00+03:00",
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    icon: "👩‍🦰"
  },
  {
    id: "easter-special",
    badge: "🐰 Easter Weekend",
    headline: "Exciting deals: Up to 45% OFF family favorites",
    ctaLabel: "Hop to Deals",
    ctaHref: "/deals",
    startDate: "2026-04-01T00:00:00+03:00",
    endDate: "2026-04-07T00:00:00+03:00",
    gradient: "from-yellow-400 via-orange-400 to-red-400",
    icon: ""
  },
  {
    id: "jamhuri-day",
    badge: "🇰🇪 Jamhuri Day",
    headline: "Celebrate Kenya with 55% OFF local favorites",
    ctaLabel: "Shop Kenyan",
    ctaHref: "/deals",
    startDate: "2026-12-05T00:00:00+03:00",
    endDate: "2026-12-13T00:00:00+03:00",
    gradient: "from-green-600 via-yellow-500 to-red-600",
    icon: "🎉"
  },
  {
    id: "black-friday",
    badge: "🖤 Black Friday",
    headline: "Biggest sale of the year: Up to 80% OFF + Flash deals",
    ctaLabel: "Grab Deals",
    ctaHref: "/deals",
    startDate: "2026-11-25T00:00:00+03:00",
    endDate: "2026-11-30T23:59:59+03:00",
    gradient: "from-purple-900 via-purple-700 to-black",
    icon: "🔥"
  },
  {
    id: "christmas",
    badge: "🎄 Christmas",
    headline: "12 Days of Christmas: Daily surprises + 40% OFF",
    ctaLabel: "Open Gifts",
    ctaHref: "/deals",
    startDate: "2026-12-20T00:00:00+03:00",
    endDate: "2026-12-26T23:59:59+03:00",
    gradient: "from-red-600 via-green-600 to-red-600",
    icon: "🎅"
  },
  {
    id: "new-year",
    badge: "🎉 New Year",
    headline: "2027 Starts Now: First orders get 50% OFF",
    ctaLabel: "New Year Deals",
    ctaHref: "/deals",
    startDate: "2026-12-30T00:00:00+03:00",
    endDate: "2027-01-05T23:59:59+03:00",
    gradient: "from-blue-600 via-purple-600 to-pink-600",
    icon: "✨"
  },
  // Kenyan public holidays
  {
    id: "new-year-kenya",
    badge: "🇰🇪 New Year",
    headline: "Start 2026 with amazing deals & free shipping",
    ctaLabel: "Shop New Year",
    ctaHref: "/deals",
    startDate: "2026-01-01T00:00:00+03:00",
    endDate: "2026-01-03T23:59:59+03:00",
    gradient: "from-blue-600 to-indigo-600",
    icon: "🎊"
  },
  {
    id: "good-friday",
    badge: "✝️ Good Friday",
    headline: "Easter blessings: Special discounts for the family",
    ctaLabel: "Easter Deals",
    ctaHref: "/deals",
    startDate: "2026-04-03T00:00:00+03:00",
    endDate: "2026-04-06T23:59:59+03:00",
    gradient: "from-amber-600 to-yellow-600",
    icon: "🙏"
  },
  {
    id: "easter-monday",
    badge: "🐣 Easter Monday",
    headline: "Egg hunt continues: Extra 30% OFF",
    ctaLabel: "Continue Shopping",
    ctaHref: "/deals",
    startDate: "2026-04-06T00:00:00+03:00",
    endDate: "2026-04-07T23:59:59+03:00",
    gradient: "from-orange-400 to-pink-400",
    icon: "🐰"
  },
  {
    id: "labour-day",
    badge: "⚒️ Labour Day",
    headline: "Celebrate workers: 35% OFF work essentials",
    ctaLabel: "Shop Now",
    ctaHref: "/deals",
    startDate: "2026-05-01T00:00:00+03:00",
    endDate: "2026-05-03T23:59:59+03:00",
    gradient: "from-red-500 to-orange-400",
    icon: "🔧"
  },
  {
    id: "madaraka-day",
    badge: "🇰🇪 Madaraka Day",
    headline: "Celebrate self-rule: 40% OFF on Kenyan brands",
    ctaLabel: "Shop Local",
    ctaHref: "/deals",
    startDate: "2026-06-01T00:00:00+03:00",
    endDate: "2026-06-02T23:59:59+03:00",
    gradient: "from-green-600 to-black",
    icon: "🎌"
  },
  {
    id: "huduma-day",
    badge: "🤝 Huduma Day",
    headline: "Honoring heroes: 30% OFF + Donations to veterans",
    ctaLabel: "Shop & Support",
    ctaHref: "/deals",
    startDate: "2026-10-10T00:00:00+03:00",
    endDate: "2026-10-12T23:59:59+03:00",
    gradient: "from-blue-800 to-indigo-800",
    icon: "🎖️"
  },
  {
    id: "mashujaa-day",
    badge: "🦁 Mashujaa Day",
    headline: "Heroes' deals: Up to 50% OFF on top brands",
    ctaLabel: "Shop Heroes",
    ctaHref: "/deals",
    startDate: "2026-10-20T00:00:00+03:00",
    endDate: "2026-10-21T23:59:59+03:00",
    gradient: "from-yellow-600 via-red-600 to-black",
    icon: "🏆"
  }
];

const FALLBACK_CAMPAIGN = {
  id: "monthly-picks",
  badge: "✨ Nyle Monthly Picks",
  headline: "Fresh discounts added every week. Don't miss out!",
  ctaLabel: "Browse Deals",
  ctaHref: "/deals",
  startDate: "2026-01-01T00:00:00+03:00",
  endDate: "2026-12-31T23:59:59+03:00",
  gradient: "from-blue-600 via-indigo-600 to-purple-600",
  icon: "⭐"
};

const pickCampaign = (currentDate = new Date()) => {
  const now = currentDate.getTime();

  const active = HOLIDAY_CAMPAIGNS.find((campaign) => {
    const start = new Date(campaign.startDate).getTime();
    const end = new Date(campaign.endDate).getTime();
    return now >= start && now < end;
  });

  if (active) return active;

  // Find the next upcoming campaign
  const upcoming = HOLIDAY_CAMPAIGNS
    .filter((campaign) => now < new Date(campaign.startDate).getTime())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];

  return upcoming || FALLBACK_CAMPAIGN;
};

const getTimeLeft = (endDate) => {
  const remainingMs = new Date(endDate).getTime() - Date.now();
  if (remainingMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isExpired: false,
  };
};

const formatUnit = (value) => String(value).padStart(2, "0");

const shouldLoadCommerceChrome = (pathname = "") =>
  !(
    pathname.startsWith("/vendor") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth")
  );

export default function Navbar() {
  const isMobile = useIsMobile();
  const { data: session, status } = useSession();
  const userLoggedIn = status === "authenticated";
  const userName = session?.user?.name || "";
  const userInitial = userName ? userName.charAt(0).toUpperCase() : (session?.user?.email?.charAt(0).toUpperCase() || "");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const searchRef = useRef(null);
  const navRef = useRef(null);
  const quickActionsRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const { getCartTotals, setShowCart } = useCart();
  const { wishlistCount, recentlyViewedCount } = useShopActivity();
  const { itemCount } = getCartTotals();
  const [categories, setCategories] = useState([]);
  const [campaign, setCampaign] = useState(FALLBACK_CAMPAIGN);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [campaignReady, setCampaignReady] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const loadCommerceChrome = shouldLoadCommerceChrome(pathname);

  useEffect(() => {
    if (!loadCommerceChrome) {
      setCategories([]);
      return;
    }

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
  }, [loadCommerceChrome]);

  useEffect(() => {
    const updateCampaignCountdown = () => {
      const selectedCampaign = pickCampaign();
      setCampaign(selectedCampaign);
      setCountdown(getTimeLeft(selectedCampaign.endDate));
      setCampaignReady(true);
    };

    updateCampaignCountdown();
    const interval = setInterval(updateCampaignCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryImage = (name) => {
    const n = name?.toLowerCase() || "";
    if (n.includes("electronics")) return "https://images.unsplash.com/photo-1498049381929-7232985a9003?q=80&w=400&auto=format&fit=crop";
    if (n.includes("fashion") || n.includes("cloth")) return "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400&auto=format&fit=crop";
    if (n.includes("home")) return "https://images.unsplash.com/photo-1484154218962-a1c00207bf9a?q=80&w=400&auto=format&fit=crop";
    if (n.includes("beauty")) return "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=400&auto=format&fit=crop";
    if (n.includes("sport") || n.includes("gym")) return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&auto=format&fit=crop";
  };

  // Search function
  const searchProducts = async (query) => {
    if (!query.trim()) return [];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?q=${encodeURIComponent(query)}&limit=5`
      );

      if (!response.ok) {
        console.warn('Search API failed, returning empty results');
        return [];
      }

      const data = await response.json();
      return data.products || data.items || data || [];
    } catch (error) {
      console.error('Search error:', error);
      return [];
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
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

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

  // Close quick actions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickActionsRef.current && !quickActionsRef.current.contains(event.target)) {
        setShowQuickActions(false);
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
      setShowScrollTop(window.scrollY > 500);

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

  // Keep page content offset in sync with actual navbar height
  useEffect(() => {
    const updateNavbarOffset = () => {
      if (!navRef.current) return;
      const navHeight = navRef.current.offsetHeight || 0;
      document.documentElement.style.setProperty("--navbar-offset", `${navHeight}px`);
    };

    updateNavbarOffset();
    window.addEventListener("resize", updateNavbarOffset);
    return () => window.removeEventListener("resize", updateNavbarOffset);
  }, [mobileMenuOpen, isScrolled, isVisible]);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Background and text color logic — Ultra Premium glassmorphism
  const getNavbarBackground = () => {
    if (isScrolled) {
      return "bg-[#0a0f1e]/95 backdrop-blur-2xl shadow-[0_8px_40px_-4px_rgba(0,0,0,0.6)] border-b border-white/5";
    }
    return "bg-gradient-to-r from-[#070b17] via-[#0d1530] to-[#0a0e1c] backdrop-blur-xl";
  };

  const getTextColor = () => {
    return isScrolled ? "text-gray-100" : "text-white";
  };

  const getHoverColor = () => {
    return "hover:text-amber-400";
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
      if (pathname === '/') {
        const el = document.getElementById('products-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/#products-section');
      }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavbarBackground()} ${isVisible ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}
      >
        {/* ── Premium Campaign Bar ── */}
        <div className={`bg-gradient-to-r ${campaign.gradient} relative overflow-hidden`}>
          {/* Shimmer sweep */}
          <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.15)_50%,transparent_70%)] animate-[shimmer_3s_infinite]" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 relative">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              {/* Left side - Badge and headline */}
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-base animate-bounce">
                  {campaign.icon || <Gift className="w-4 h-4" />}
                </span>
                <span className="font-black tracking-wider uppercase bg-white/20 px-3 py-1 rounded-full text-[10px] sm:text-xs">
                  {campaign.badge}
                </span>
                <span className="hidden md:inline font-medium">
                  {campaign.headline}
                </span>
              </div>

              {/* Right side - Countdown and CTA */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span className="font-semibold text-white/90 flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                  {campaignReady && countdown.isExpired ? "Limited time offer ended" : "Ends in"}
                </span>

                {campaignReady && !countdown.isExpired && (
                  <div className="flex gap-1 sm:gap-2">
                    {[
                      { label: "Days", value: countdown.days, color: "from-yellow-300 to-yellow-500" },
                      { label: "Hrs", value: countdown.hours, color: "from-orange-300 to-orange-500" },
                      { label: "Min", value: countdown.minutes, color: "from-pink-300 to-pink-500" },
                      { label: "Sec", value: countdown.seconds, color: "from-purple-300 to-purple-500" },
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        className="relative group"
                      >
                        <div className={`rounded-lg bg-gradient-to-br ${unit.color} p-[1px]`}>
                          <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-2 py-1 text-[11px] sm:text-xs font-black">
                            <span className="text-white">{formatUnit(unit.value)}</span>
                            <span className="text-gray-300 ml-1 font-medium">{unit.label}</span>
                          </div>
                        </div>
                        {/* Glow effect on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${unit.color} rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity -z-10`}></div>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href={campaign.ctaHref}
                  className="ml-1 inline-flex items-center gap-1 rounded-full bg-white text-gray-900 px-4 py-1.5 font-bold text-xs sm:text-sm hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <span>{campaign.ctaLabel}</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            {/* ── Shimmering Logo ── */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src={NyleLogo}
                  alt="Nyle logo"
                  width={44}
                  height={44}
                  priority
                  className="h-11 w-11 shrink-0 drop-shadow-[0_0_18px_rgba(251,191,36,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_30px_rgba(251,191,36,0.9)] group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex flex-col -space-y-0.5">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors duration-300">
                  Nyle<span className="text-amber-400">Store</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Kenya's #1 Marketplace</span>
              </div>
            </Link>

            {/* ── Desktop Nav Links — Premium ── */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { href: "/", label: "Home", icon: "" },
                { href: "/products", label: "Shop", hasMega: true, icon: "" },
                { href: "/categories", label: "Categories", hasMega: true, icon: "" },
                { href: "/deals", label: "Hot Deals", hot: true, icon: "" },
                { href: "/brands", label: "Brands", icon: "" },
              ].map((item) => (
                <div
                  key={item.href}
                  className="relative group"
                  onMouseEnter={() => item.hasMega && setHoveredCategory(item.label)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 text-white/80 hover:text-amber-400 hover:bg-white/5 ${item.hot ? 'text-orange-400 hover:text-orange-300' : ''}`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.hot && <span className="ml-1 text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-black uppercase animate-pulse">Live</span>}
                  </Link>

                  {/* Premium Glassmorphism Mega Menu */}
                  {item.hasMega && hoveredCategory === item.label && categories.length > 0 && (
                    <div className="absolute top-full left-0 mt-3 w-[640px] bg-[#0d1530]/95 backdrop-blur-2xl rounded-2xl shadow-[0_25px_80px_-5px_rgba(0,0,0,0.7)] border border-white/10 overflow-hidden animate-fadeIn z-50">
                      {/* Header */}
                      <div className="px-6 py-4 bg-gradient-to-r from-amber-500/10 to-transparent border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaGem className="text-amber-400" size={12} />
                          <span className="text-xs font-black uppercase tracking-widest text-amber-400">{item.label}</span>
                        </div>
                        <span className="text-xs text-white/30">{categories.length} categories</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 p-4">
                        {categories.slice(0, 9).map((cat) => (
                          <Link
                            key={cat.id || cat._id}
                            href={`/products?category=${encodeURIComponent(cat.name)}`}
                            className="group/item flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-white/10"
                          >
                            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 group-hover/item:ring-amber-400/40 transition-all flex-shrink-0">
                              <img
                                src={cat.image_url || getCategoryImage(cat.name)}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-white/90 text-sm group-hover/item:text-amber-400 transition-colors">{cat.name}</p>
                              <p className="text-[10px] font-semibold text-white/30 group-hover/item:text-amber-400/70 transition-colors">Explore →</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 border-t border-white/5 px-6 py-3">
                        <Link href="/categories" className="flex items-center justify-between group text-white/70 hover:text-amber-400 transition-colors">
                          <span className="font-bold text-xs uppercase tracking-widest">View All {item.label}</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── Right-side Icons ── */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Search */}
              <div className="relative hidden md:block" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="relative group">
                  <input
                    type="text"
                    placeholder="Search 1M+ products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                    className="pl-10 pr-14 py-2 rounded-full border border-white/10 bg-white/5 text-white placeholder-white/30 focus:placeholder-white/50 transition-all duration-300 w-52 focus:w-80 focus:outline-none text-sm focus:bg-white/10 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/30" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-black hover:bg-amber-400 transition"
                  >
                    Go
                  </button>
                </form>

                {/* Search Results Dropdown */}
                {showSearchResults && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100 animate-slideDown">
                    <div className="max-h-96 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-8 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-600 border-t-transparent mx-auto"></div>
                          <p className="mt-3 text-gray-600 font-medium">Searching products...</p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <>
                          <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            <p className="text-sm font-bold">
                              Found {searchResults.length} matching product{searchResults.length !== 1 ? 's' : ''}
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
                              className="block px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition group"
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-gray-900 truncate group-hover:text-blue-600">
                                    {product.name || product.title}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {product.category || product.type || "Product"}
                                  </p>
                                </div>
                                <p className="font-black text-blue-700 ml-2 bg-blue-50 px-3 py-1 rounded-full text-sm">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                            </Link>
                          ))}
                          <div className="px-4 py-3 bg-gray-50">
                            <button
                              onClick={handleSearchSubmit}
                              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transform hover:scale-[1.02] transition-all"
                            >
                              View All Results →
                            </button>
                          </div>
                        </>
                      ) : searchQuery ? (
                        <div className="p-8 text-center">
                          <p className="text-gray-900 font-bold mb-1">No products found for "{searchQuery}"</p>
                          <p className="text-sm text-gray-500">Try different keywords or browse categories</p>
                          <button
                            onClick={() => router.push('/products')}
                            className="mt-4 text-blue-600 font-bold hover:underline"
                          >
                            Browse all products →
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions (Wishlist, Notifications) */}
              <div className="relative hidden md:block" ref={quickActionsRef}>
                <button
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className="p-2.5 rounded-xl transition-all relative group text-white/60 hover:text-amber-400 hover:bg-white/5"
                >
                  <Sparkles className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                </button>

                {showQuickActions && (
                  <div className="absolute right-0 mt-3 w-80 bg-[#0d1530]/95 backdrop-blur-2xl rounded-2xl shadow-[0_25px_80px_-5px_rgba(0,0,0,0.7)] border border-white/10 overflow-hidden animate-slideDown z-50">
                    <div className="px-4 py-4 bg-gradient-to-r from-amber-500/10 to-transparent border-b border-white/5">
                      <h3 className="font-black text-white flex items-center gap-2"><FaGem className="text-amber-400" size={12} /> Quick Actions</h3>
                    </div>
                    <div className="p-3">
                      <Link href="/wishlist" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition group border border-transparent hover:border-white/10">
                        <div className="w-10 h-10 bg-pink-500/10 rounded-full flex items-center justify-center border border-pink-500/20">
                          <FaHeart className="text-pink-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white/90 text-sm">Wishlist</p>
                          <p className="text-xs text-white/40">{wishlistCount === 0 ? "No saved items yet" : `${wishlistCount} item${wishlistCount === 1 ? "" : "s"} saved`}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 group-hover:text-amber-400 transition" />
                      </Link>
                      <Link href="/#recently-viewed" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition group border border-transparent hover:border-white/10">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
                          <FaHistory className="text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white/90 text-sm">Recently Viewed</p>
                          <p className="text-xs text-white/40">{recentlyViewedCount === 0 ? "Nothing viewed yet" : `${recentlyViewedCount} recent item${recentlyViewedCount === 1 ? "" : "s"}`}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 group-hover:text-amber-400 transition" />
                      </Link>
                      <Link href="/deals" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition group border border-transparent hover:border-white/10">
                        <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center border border-orange-500/20">
                          <FaFire className="text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white/90 text-sm">Flash Deals</p>
                          <p className="text-xs text-white/40">Limited time offers</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 group-hover:text-amber-400 transition" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Account Dropdown — Premium Dark */}
              <div className="relative group">
                <button className="p-1.5 transition flex items-center relative">
                  {userLoggedIn ? (
                    <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 text-black rounded-full flex items-center justify-center font-black text-sm shadow-xl ring-2 ring-amber-400/30 group-hover:scale-110 transition-transform">
                      {userInitial}
                    </div>
                  ) : (
                    <div className="relative w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-400/40 transition">
                      <FaUser className="h-4 w-4 text-white/60 group-hover:text-amber-400 transition" />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border border-black animate-pulse"></span>
                    </div>
                  )}
                </button>

                {/* Premium Dark Dropdown */}
                <div className="absolute right-0 mt-3 w-64 bg-[#0d1530]/95 backdrop-blur-2xl rounded-2xl shadow-[0_25px_80px_-5px_rgba(0,0,0,0.7)] border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                  {userLoggedIn ? (
                    <>
                      <div className="px-4 py-4 bg-gradient-to-r from-amber-500/10 to-transparent border-b border-white/5">
                        <p className="text-xs text-amber-400 font-bold uppercase tracking-widest">Welcome back</p>
                        <p className="font-black text-white truncate mt-0.5">{userName || session?.user?.email}</p>
                      </div>
                      <div className="p-2">
                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-all">
                          <FaUser className="text-amber-400/60" size={13} />
                          <span className="text-sm font-semibold flex-1">My Profile</span>
                          <ChevronRight size={12} className="text-white/20" />
                        </Link>
                        <Link href="/orders" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-all">
                          <FaHistory className="text-amber-400/60" size={13} />
                          <span className="text-sm font-semibold flex-1">My Orders</span>
                        </Link>
                        <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-all">
                          <FaHeart className="text-pink-400/60" size={13} />
                          <span className="text-sm font-semibold flex-1">Wishlist</span>
                          <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full">{wishlistCount}</span>
                        </Link>
                        <div className="border-t border-white/5 my-2"></div>
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <FaSignOutAlt size={13} />
                          <span className="text-sm font-bold">Log out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-4 bg-gradient-to-r from-amber-500/10 to-transparent border-b border-white/5">
                        <p className="font-black text-white">Welcome to Nyle</p>
                        <p className="text-xs text-white/40 mt-0.5">Sign in for exclusive deals</p>
                      </div>
                      <div className="p-3">
                        <Link
                          href="/auth/login"
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-4 py-3 rounded-xl font-black hover:shadow-xl hover:shadow-amber-900/20 transform hover:scale-[1.02] transition-all mb-2"
                        >
                          <FaSignInAlt />
                          Sign In
                        </Link>
                        <Link
                          href="/auth/signup"
                          className="flex items-center justify-center gap-2 border border-white/10 text-white/70 px-4 py-3 rounded-xl font-bold hover:bg-white/5 hover:text-white transition-all"
                        >
                          <FaUserPlus />
                          Create Account
                        </Link>
                        <div className="border-t border-white/5 my-3"></div>
                        <Link
                          href="/vendor/login"
                          className="flex items-center justify-center gap-2 text-amber-400 font-bold hover:text-amber-300 text-sm transition"
                        >
                          <FaStore />
                          Sell on Nyle
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Cart */}
              <button
                onClick={handleCartClick}
                className="p-2.5 rounded-xl transition-all relative group text-white/60 hover:text-amber-400 hover:bg-white/5"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-black shadow-lg">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                className="p-2.5 rounded-xl md:hidden transition text-white/60 hover:text-amber-400 hover:bg-white/5"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Premium Dark Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-b from-[#070b17] to-[#0a0f1e] shadow-2xl transform transition-transform duration-500 ease-out md:hidden z-50 border-l border-white/5 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Image src={NyleLogo} alt="Nyle logo" width={40} height={40} priority
              className="h-10 w-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
            />
            <span className="text-xl font-black tracking-tight text-white">
              Nyle<span className="text-amber-400">Store</span>
            </span>
          </div>
          <button onClick={toggleMenu} className="p-2 hover:bg-white/5 rounded-xl transition text-white/60 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto">
          <div className="px-6 py-4">
            {/* Mobile Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 outline-none transition text-sm"
              />
            </div>

            {/* User Section */}
            <div className="mb-6 pb-4 border-b border-white/5">
              {userLoggedIn ? (
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-black text-2xl font-black shadow-lg">
                    {userInitial}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-white">Welcome back!</p>
                    <p className="text-xs text-white/40 truncate">{userName || session?.user?.email}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/auth/login" onClick={toggleMenu} className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-4 py-4 rounded-xl font-black hover:shadow-xl transition-all">
                    <FaSignInAlt />
                    Sign In
                  </Link>
                  <Link href="/auth/signup" onClick={toggleMenu} className="flex items-center justify-center gap-2 border border-white/10 text-white/70 px-4 py-4 rounded-xl font-bold hover:bg-white/5 transition">
                    <FaUserPlus />
                    Create Account
                  </Link>
                </div>
              )}
            </div>

            {/* Categories Grid */}
            <div className="mb-6">
              <h3 className="text-xs font-black text-white/40 mb-4 uppercase tracking-widest">🔥 Trending Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id || cat._id}
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    onClick={toggleMenu}
                    className="group relative h-20 rounded-xl overflow-hidden shadow-lg border border-white/5"
                  >
                    <img src={getCategoryImage(cat.name)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={cat.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-xs font-black text-white">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              <Link href="/" onClick={toggleMenu} className="flex items-center gap-3 py-3 text-white/80 hover:text-amber-400 hover:bg-white/5 rounded-xl px-3 transition font-semibold">
                <span>🏠</span> Home
              </Link>
              <Link href="/products" onClick={toggleMenu} className="flex items-center gap-3 py-3 text-white/80 hover:text-amber-400 hover:bg-white/5 rounded-xl px-3 transition font-semibold">
                <span>🛍️</span> Shop All
              </Link>
              <Link href="/deals" onClick={toggleMenu} className="flex items-center gap-3 py-3 text-orange-400 hover:text-orange-300 hover:bg-orange-500/5 rounded-xl px-3 transition font-semibold">
                <span>🔥</span> Flash Deals
                <span className="ml-auto text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse font-black uppercase">HOT</span>
              </Link>
              <Link href="/vendor/login" onClick={toggleMenu} className="flex items-center gap-3 py-3 text-amber-400 hover:text-amber-300 hover:bg-amber-500/5 rounded-xl px-3 transition font-semibold border-t border-white/5 mt-2 pt-4">
                <FaStore />
                Sell on Nyle
              </Link>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="mt-auto px-6 py-4 border-t border-white/5">
            <div className="text-xs text-white/30 mb-3 font-medium">✨ Kenya's fastest-growing marketplace</div>
            <div className="flex space-x-4 text-xs font-bold">
              <Link href="/terms" className="text-white/30 hover:text-amber-400 transition">Terms</Link>
              <Link href="/privacy" className="text-white/30 hover:text-amber-400 transition">Privacy</Link>
              <Link href="/contact" className="text-white/30 hover:text-amber-400 transition">Contact</Link>
              <Link href="/help" className="text-white/30 hover:text-amber-400 transition">Help</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40 animate-fadeIn"
          onClick={toggleMenu}
        />
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-black p-3 rounded-full shadow-2xl hover:shadow-amber-900/40 transform hover:scale-110 transition-all duration-300 z-50 font-black"
        >
          ↑
        </button>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.2s ease-out; }
      `}</style>
    </>
  );
}
