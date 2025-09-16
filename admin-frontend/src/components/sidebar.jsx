import React from "react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-gray-300">📊 Dashboard</Link>
        <Link to="/products" className="hover:text-gray-300">📦 Products</Link>
        <Link to="/orders" className="hover:text-gray-300">🧾 Orders</Link>
        <Link to="/users" className="hover:text-gray-300">👤 Users</Link>
      </nav>
    </aside>
  );
}
