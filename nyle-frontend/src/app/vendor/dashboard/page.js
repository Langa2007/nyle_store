"use client";

import { useState } from "react";
import { Menu, X, ShoppingCart, Package, BarChart3, Settings } from "lucide-react";

export default function VendorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: BarChart3 },
    { name: "Products", icon: Package },
    { name: "Orders", icon: ShoppingCart },
    { name: "Analytics", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-blue-700 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-6 font-bold text-2xl border-b border-blue-500">
          Nyle Vendor
        </div>
        <nav className="p-4 space-y-4">
          {menuItems.map(({ name, icon: Icon }) => (
            <a
              key={name}
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <Icon className="w-5 h-5" />
              {name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Vendor Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, Vendor</span>
            <img
              src="https://ui-avatars.com/api/?name=Vendor"
              alt="profile"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-8">
          {/* Stats Overview */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow p-6 rounded-lg">
              <h2 className="text-gray-500">Total Sales</h2>
              <p className="text-2xl font-bold text-blue-700">$12,340</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h2 className="text-gray-500">Orders</h2>
              <p className="text-2xl font-bold text-blue-700">154</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h2 className="text-gray-500">Products</h2>
              <p className="text-2xl font-bold text-blue-700">48</p>
            </div>
          </section>

          {/* Placeholder Sections */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <p className="text-gray-500">Orders table will go here...</p>
          </section>

          <section className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Your Products</h2>
            <p className="text-gray-500">Product management table will go here...</p>
          </section>
        </main>
      </div>
    </div>
  );
}
