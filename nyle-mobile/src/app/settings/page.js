"use client";

import MobileLayout from "../mobile-layout";
import { User, Bell, Shield, HelpCircle } from "lucide-react";

export default function SettingsPage() {
  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: <User size={20} />, label: "Personal Information", sub: "Name, Email, Phone" },
        { icon: <Shield size={20} />, label: "Security", sub: "Password, Two-factor auth" },
      ]
    },
    {
      title: "Notifications",
      items: [
        { icon: <Bell size={20} />, label: "Push Notifications", sub: "Sales, Order updates" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: <HelpCircle size={20} />, label: "Help Center", sub: "FAQs, Contact Us" },
      ]
    }
  ];

  return (
    <MobileLayout>
      <div className="pt-6 pb-24">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="space-y-6">
          {settingsGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">
                {group.title}
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {group.items.map((item, i) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-4 p-4 text-left active:bg-gray-50 transition ${i < group.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                  >
                    <div className="text-blue-600">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
