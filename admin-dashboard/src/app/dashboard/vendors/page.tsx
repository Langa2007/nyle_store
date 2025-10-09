"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Vendor {
  id: number;
  company_name: string;
  email: string;
  status: string;
  is_verified: boolean;
}

export default function AdminVendorsPage() {
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  //  Load token only on client
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (!storedToken) {
      router.push("/login"); // redirect if not logged in
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const fetchVendors = async (authToken: string) => {
    try {
      console.log("🟢 Token used to fetch vendors:", authToken);
      const res = await fetch("http://localhost:5000/api/admin/vendors", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch vendors: ${res.status}`);
      }

      const data = await res.json();
      if (Array.isArray(data)) setVendors(data);
      else setVendors([]);
    } catch (err) {
      console.error("❌ Error fetching vendors:", err);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchVendors(token); // only fetch when token exists
  }, [token]);

  const authorizedFetch = async (url: string, method: string) => {
    if (!token) return alert("You are not authorized!");
    return fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const approveVendor = async (id: number) => {
    await authorizedFetch(`http://localhost:5000/api/admin/vendors/${id}/approve`, "PATCH");
    fetchVendors(token!);
  };

  const rejectVendor = async (id: number) => {
    await authorizedFetch(`http://localhost:5000/api/admin/vendors/${id}/reject`, "PATCH");
    fetchVendors(token!);
  };

  const deleteVendor = async (id: number) => {
    if (!confirm("Are you sure you want to delete this vendor?")) return;
    await authorizedFetch(`http://localhost:5000/api/admin/vendors/${id}`, "DELETE");
    fetchVendors(token!);
  };

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
                <button
                  onClick={() => approveVendor(v.id)}
                  className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectVendor(v.id)}
                  className="px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => deleteVendor(v.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
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
