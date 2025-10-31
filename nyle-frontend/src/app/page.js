"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getCategories } from "../services/categoryService";
import ClientProviders from "../components/ClientProviders";
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcPaypal, 
  FaGooglePay, 
  FaApplePay 
} from "react-icons/fa";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube 
} from "react-icons/fa";

function HomeContent() {
  // Fetch categories
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

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
              one-stop marketplace for quality products. From trusted vendors to
              global brands, shop smarter and safer with us.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition">
                Start Shopping
              </button>
              <button className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition">
                Become a Seller
              </button>
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
      <main className="p-10 text-center">
      <h1 className="text-3xl font-bold text-blue-700">Welcome to Nyle</h1>
      <p className="mt-4 text-gray-600">Join thousands of vendors selling on Nyle.</p>

      <Link href="/vendor/signup">
        <button className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition">
          Become a Seller
        </button>
      </Link>
    </main>

      {/* Categories Section */}
      <section className="container mx-auto px-6 mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Nyle Connecting the world through trade
        </h2>

        {isLoading && (
          <p className="text-center text-blue-600">Loading categories...</p>
        )}
        {error && (
          <p className="text-center text-red-500">Failed to load categories</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-6 border rounded-xl shadow hover:shadow-xl hover:scale-105 transition cursor-pointer flex flex-col items-center"
            >
              <div className="h-16 w-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mb-4">
                <span className="text-xl font-bold">
                  {cat.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6 mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white p-6 border rounded-xl shadow hover:shadow-xl hover:scale-105 transition"
            >
              <div className="h-40 bg-gradient-to-r from-blue-100 to-indigo-100 rounded mb-4 flex items-center justify-center">
                <span className="text-blue-600 font-bold">Image</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Product {item}</h3>
              <p className="text-gray-500 mb-3">$99.99</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Columns Section */}
      <footer className="mt-20 bg-gradient-to-r from-indigo-600 to-blue-700 text-white py-16 px-6">
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 text-sm">
          
          {/* Sell on Nyle */}
          <div>
            <h3 className="font-bold text-lg mb-4">Sell on Nyle</h3>
            <ul className="space-y-2">
              <li><a href="vendor/why-sell" className="hover:underline">Why Sell on Nyle</a></li>
              <li><a href="vendor/signup" className="hover:underline">Become A Seller On Nyle</a></li>
              <li><a href="vendor/quotations" className="hover:underline">Get seller Quotations</a></li>
              <li><a href="vendor/shipping-logistics" className="hover:underline">Shipping & Logistics</a></li>
              <li><a href="vendor/policies" className="hover:underline">Seller Policies</a></li>
              <li><a href="vendor/app" className="hover:underline">Get Our Vendors app</a></li>
            </ul>
          </div>

          {/* Source on Nyle */}
          <div>
            <h3 className="font-bold text-lg mb-4">Source on Nyle</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Get Quotation</a></li>
              <li><a href="#" className="hover:underline">Verified Suppliers</a></li>
              <li><a href="#" className="hover:underline">Get Logistics</a></li>
              <li><a href="#" className="hover:underline">Trade Assurance</a></li>
              <li><a href="#" className="hover:underline">Shipping Rates & Policies</a></li>
            </ul>
          </div>

          {/* More About Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">More About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Know Nyle</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Newsletter</a></li>
              <li><a href="#" className="hover:underline">Our Partners</a></li>
            </ul>
          </div>

          {/* Get Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Report an Issue</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>

          {/* Nyle Payments */}
          <div>
            <h3 className="font-bold text-lg mb-4">Nyle Payments</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Payment Policies</a></li>
              <li><a href="#" className="hover:underline">Refunds & Returns</a></li>
              <li><a href="#" className="hover:underline">Secure Checkout</a></li>
              <li><a href="#" className="hover:underline">Accepted Methods</a></li>
              <li><a href="#" className="hover:underline">Customer Protection</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 flex justify-center space-x-6 text-2xl">
          <a href="#" className="hover:text-blue-200"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-200"><FaTwitter /></a>
          <a href="#" className="hover:text-blue-200"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-200"><FaLinkedinIn /></a>
          <a href="#" className="hover:text-blue-200"><FaYoutube /></a>
        </div>

        {/* Payment Options */}
        <div className="mt-8 flex justify-center space-x-6 text-4xl">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcPaypal />
          <FaGooglePay />
          <FaApplePay />
        </div>

        {/* Bottom bar */}
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

// Disable static generation for this page since it uses client-side features
export const dynamic = 'force-dynamic';


