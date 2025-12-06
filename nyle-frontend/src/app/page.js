"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import { getProducts } from "../services/productService"; //  added
import ClientProviders from "../components/ClientProviders";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaGooglePay,
  FaApplePay,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaSearch,
} from "react-icons/fa";

function HomeContent() {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [currency, setCurrency] = useState("KES");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  // 🔥 Fetch REAL products (dummy removed)
  useEffect(() => {
    const fetchRealProducts = async () => {
      try {
        const data = await getProducts(); // GET /products
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

  const convertPrice = (price) => (price * exchangeRate).toFixed(2);

  const scrollToProducts = () => {
    const el = document.getElementById("products-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-20 px-6 rounded-b-3xl shadow-lg">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Discover. Shop. Thrive.
            </h1>
            <p className="text-lg mb-6">
              Welcome to <span className="font-semibold">Nyle Store</span>, your
              one-stop marketplace for quality products from trusted vendors and global brands.
            </p>

            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-full shadow mb-6">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow px-4 py-3 text-gray-700 rounded-l-full focus:outline-none"
              />
              <button
                title="Search"
                className="px-5 text-blue-600 hover:text-blue-800 transition"
                onClick={scrollToProducts}
              >
                <FaSearch size={20} />
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={scrollToProducts}
                className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
              >
                Start Shopping
              </button>
              <Link href="/vendor/signup">
                <button className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition">
                  Become a Seller
                </button>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
              alt="Shopping"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-6 mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Explore by Category
        </h2>
        <div className="flex justify-center items-center">
          <select className="px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow">
            <option value="">Search by category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products-section" className="container mx-auto px-6 mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Products
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found matching “{searchTerm}”
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-8">
           {filteredProducts.map((product) => (
  <Link
    key={product.id}
    href={`/products/${product.id}`}
    className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition"
  >
    <div className="h-56 rounded-lg overflow-hidden bg-gray-100 mb-4">
      {product.image_url ? (
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition"
        />
      ) : (
        <div className="h-full flex items-center justify-center text-4xl font-bold text-blue-600">
          {product.name?.[0]}
        </div>
      )}
    </div>

    {/* Product Details */}
    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
      {product.name}
    </h3>

    {/* description */}
    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
      {product.description || "No description available."}
    </p>

    {/* Price */}
    <p className="text-xl font-bold text-blue-700 mb-1">
      {currency} {convertPrice(product.price || 0)}
    </p>

    {/* shipping info */}
    <p className="text-xs text-green-600 font-medium">
      ships from seller - delivery guaranteed
    </p>
  </Link>
))}

          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-20 bg-gradient-to-r from-indigo-600 to-blue-700 text-white py-16 px-6">
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 text-sm">
          <div>
            <h3 className="font-bold text-lg mb-4">Sell on Nyle</h3>
            <ul className="space-y-2">
              <li><Link href="/vendor/why-sell" className="hover:underline">Why Sell on Nyle</Link></li>
              <li><Link href="/vendor/signup" className="hover:underline">Become a Seller</Link></li>
              <li><Link href="/vendor/quotations" className="hover:underline">Get Seller Quotations</Link></li>
              <li><Link href="/vendor/policies" className="hover:underline">Seller Policies</Link></li>
              <li><Link href="/vendor/app" className="hover:underline">Get Our App</Link></li>
              <li><Link href="/vendor/shipping-logistics" className="hover:underline">Shipping Logisitics</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">More About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/about/know-nyle" className="hover:underline">Know Nyle</Link></li>
              <li><Link href="/about/careers" className="hover:underline">Careers</Link></li>
              <li><Link href="/about/partners" className="hover:underline">Partners</Link></li>
              <li><Link href="/about/newsletter" className="hover:underline">Newsletter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/support/help-center" className="hover:underline">Help Center</Link></li>
              <li><Link href="/support/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link href="/support/faqs" className="hover:underline">FAQs</Link></li>
              <li><Link href="/support/report-issue" className="hover:underline">Report An Issue</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Nyle Payments</h3>
            <ul className="space-y-2">
              <li><Link href="/payments/methods" className="hover:underline">Accepted Payment Methods</Link></li>
              <li><Link href="/payments/returns" className="hover:underline">Returns & Refunds</Link></li>
              <li><Link href="/payments/policies" className="hover:underline">Shipping & Delivery</Link></li>
              <li><Link href="/payments/protection" className="hover:underline">Customer Protection</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Source On Nyle</h3>
            <ul className="space-y-2">
              <li><Link href="/source/suppliers" className="hover:underline">Nyle Verified Suppliers</Link></li>
              <li><Link href="/source/logistics" className="hover:underline">Get Logisitics</Link></li>
              <li><Link href="/source/quotation" className="hover:underline">Get Quotation</Link></li>
              <li><Link href="/source/trade-assurance" className="hover:underline">Trade Assurance</Link></li>
              <li><Link href="/source/shipping-policies" className="hover:underline">Shipping Policies & Rates</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex justify-center space-x-6 text-2xl">
          <a href="#" title="Facebook" className="hover:text-blue-200"><FaFacebookF /></a>
          <a href="#" title="Twitter" className="hover:text-blue-200"><FaTwitter /></a>
          <a href="#" title="Instagram" className="hover:text-blue-200"><FaInstagram /></a>
          <a href="#" title="LinkedIn" className="hover:text-blue-200"><FaLinkedinIn /></a>
          <a href="#" title="YouTube" className="hover:text-blue-200"><FaYoutube /></a>
        </div>

        <div className="mt-8 flex justify-center space-x-6 text-4xl">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcPaypal />
          <FaGooglePay />
          <FaApplePay />
        </div>

        <div className="mt-12 border-t border-blue-400 pt-6 text-center text-sm text-blue-100">
          <p>© {new Date().getFullYear()} Nyle Store. All rights reserved.</p>
        </div>
      </footer>
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
