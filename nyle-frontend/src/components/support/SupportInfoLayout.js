"use client";

export default function SupportInfoLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 text-center shadow-md">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg mt-2 opacity-90">{subtitle}</p>
      </div>

      {/* Content Section */}
      <div className="flex-grow max-w-5xl mx-auto px-6 py-12 bg-white shadow-sm rounded-lg mt-8 mb-12">
        {children}
      </div>
    </div>
  );
}
