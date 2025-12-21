// components/vendor/StatsOverview.jsx
"use client";

import { TrendingUp, TrendingDown, Package, DollarSign, ShoppingCart, Users } from "lucide-react";

export default function StatsOverview({ stats }) {
  const statCards = [
    {
      title: "Total Products",
      value: stats?.total || 0,
      icon: Package,
      color: "bg-blue-500",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Approved Products",
      value: stats?.approved || 0,
      icon: CheckCircle,
      color: "bg-green-500",
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Monthly Sales",
      value: "$12,340",
      icon: DollarSign,
      color: "bg-purple-500",
      trend: "+15%",
      trendUp: true,
    },
    {
      title: "Pending Approval",
      value: stats?.pending || 0,
      icon: Clock,
      color: "bg-yellow-500",
      trend: "-3%",
      trendUp: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`${card.color} p-3 rounded-lg`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              card.trendUp ? 'text-green-600' : 'text-red-600'
            }`}>
              {card.trendUp ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {card.trend}
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">{card.value}</div>
          <div className="text-sm text-gray-500">{card.title}</div>
        </div>
      ))}
    </div>
  );
}

function CheckCircle(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function Clock(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}