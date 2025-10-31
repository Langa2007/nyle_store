"use client";
import React from "react";

export default function VendorInfoLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
        {subtitle && <p className="text-gray-600 mb-8">{subtitle}</p>}
        <div className="prose prose-lg max-w-none text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}
