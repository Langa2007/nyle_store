"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AdminAuthContext";

interface Vendor {
  id: number;
  company_name: string;
  email: string;
  status: string;
  is_verified: boolean;
}

export default function AdminVendorsPage() {
  const { accessToken } = useAuth();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchVendors = async () => {
    if (!accessToken) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/vendors`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) setVendors(data);
    } catch (err) {
      console.error("❌ Error fetching vendors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [accessToken]);

  if (loading) return <p className="p-4">Loading vendors...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vendor Management</h1>
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Company</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Verified</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v.id} className="border-t">
              <td className="p-2">{v.company_name}</td>
              <td className="p-2">{v.email}</td>
              <td className="p-2">{v.status}</td>
              <td className="p-2">{v.is_verified ? "✅" : "❌"}</td>
              <td className="p-2 text-center space-x-2">
                <button className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                  Approve
                </button>
                <button className="px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                  Reject
                </button>
                <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {vendors.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No vendors found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
