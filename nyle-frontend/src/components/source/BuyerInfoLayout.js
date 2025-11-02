"use client";
import Link from "next/link";

export default function BuyerInfoLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <div className="max-w-5xl mx-auto py-16 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          {children}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-700 mb-4">
            Want to become a seller instead?
          </p>
          <Link
            href="/vendor/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Become a Seller on Nyle
          </Link>
        </div>
      </div>
    </div>
  );
}
