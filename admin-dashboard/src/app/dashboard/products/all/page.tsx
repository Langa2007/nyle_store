"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminLayout from "@/app/components/AdminLayout";
import {
  FaTrash, FaPlus, FaSearch, FaFilter,
  FaBolt, FaEye, FaEdit, FaBox,
  FaChevronLeft, FaChevronRight, FaWarehouse
} from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  category?: string;
  vendor_name?: string;
  vendor_id?: number;
  sku?: string;
  is_hot_deal?: boolean;
  brand?: string;
}

const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://nyle-store.onrender.com";

const getAdminAuthHeaders = (): HeadersInit => {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminAccessToken") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function AllProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [vendorFilter, setVendorFilter] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);

  // Deletion state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, venRes] = await Promise.all([
        fetch(`${baseurl}/api/admin/products`, { headers: getAdminAuthHeaders() }),
        fetch(`${baseurl}/api/admin/categories`, { headers: getAdminAuthHeaders() }),
        fetch(`${baseurl}/api/admin/vendors`, { headers: getAdminAuthHeaders() })
      ]);

      if (prodRes.ok) setProducts(await prodRes.json());
      if (catRes.ok) setCategories(await catRes.json());
      if (venRes.ok) setVendors(await venRes.json());

    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const toggleHotDeal = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`${baseurl}/api/admin/products/${id}/toggle-hot-deal`, {
        method: "PUT",
        headers: {
          ...getAdminAuthHeaders(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ is_hot_deal: !currentStatus })
      });

      if (res.ok) {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, is_hot_deal: !currentStatus } : p));
        toast.success(`Hot Deal status updated`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const handleDeleteInitiate = (id: number) => {
    setProductToDelete(id);
    setDeleteReason("");
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete || !deleteReason) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${baseurl}/api/admin/products/${productToDelete}`, {
        method: "DELETE",
        headers: {
          ...getAdminAuthHeaders(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ reason: deleteReason })
      });

      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== productToDelete));
        toast.success("Product deleted successfully");
        setShowDeleteModal(false);
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    const matchesVendor = !vendorFilter || p.vendor_name === vendorFilter;
    return matchesSearch && matchesCategory && matchesVendor;
  });

  return (
    <AdminLayout title="All Products Catalog">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <FaWarehouse className="mr-3 text-blue-500" />
              Product Catalog
            </h1>
            <p className="text-gray-400 mt-1">Manage and monitor all products across all vendors ({filteredProducts.length} of {products.length})</p>
          </div>
          <Link 
            href="/dashboard/products"
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20"
          >
            <FaPlus className="mr-2" />
            Create New Product
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <select
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                value={vendorFilter}
                onChange={(e) => setVendorFilter(e.target.value)}
              >
                <option value="">All Vendors</option>
                {vendors.map(v => (
                  <option key={v.id} value={v.legal_name}>{v.legal_name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-800/40 text-gray-400 text-sm uppercase">
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Stock</th>
                  <th className="px-6 py-4 font-semibold">Vendor</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="mt-4 text-gray-500">Inventory loading...</p>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center text-gray-500">
                      <FaBox className="text-5xl mx-auto mb-4 text-gray-800" />
                      <p className="text-lg">No products found matching your criteria</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-blue-600/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-lg bg-gray-800 border border-gray-700 overflow-hidden mr-4">
                            {p.image_url ? (
                              <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-600">
                                <FaBox size={18} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-white font-medium">{p.name}</div>
                            <div className="text-xs text-gray-500 font-mono mt-0.5">{p.sku || 'NO-SKU'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {p.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white">Ksh {p.price.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm ${p.stock <= 5 ? 'text-red-400 font-bold' : 'text-gray-300'}`}>
                          {p.stock} units
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {p.vendor_name || 'System Admin'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                           {p.is_hot_deal && (
                             <span className="bg-red-500/20 text-red-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-red-500/30 flex items-center">
                               <FaBolt className="mr-1" /> Hot Deal
                             </span>
                           )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                             onClick={() => toggleHotDeal(p.id, !!p.is_hot_deal)}
                             className={`p-2 rounded-lg transition ${p.is_hot_deal ? 'bg-red-500 text-white shadow-lg shadow-red-900/20' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}`}
                             title={p.is_hot_deal ? "Remove from Hot Deals" : "Mark as Hot Deal"}
                          >
                            <FaBolt size={14} />
                          </button>
                          <Link 
                            href={`https://nyle-store.onrender.com/products/${p.id}`}
                            target="_blank"
                            className="p-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition"
                            title="View product"
                          >
                            <FaEye size={14} />
                          </Link>
                          <button 
                            onClick={() => router.push(`/dashboard/products?edit=${p.id}`)}
                            className="p-2 bg-gray-800 text-blue-400 hover:text-blue-300 rounded-lg hover:bg-gray-700 transition"
                            title="Edit product"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteInitiate(p.id)}
                            className="p-2 bg-gray-800 text-red-400 hover:text-red-300 rounded-lg hover:bg-gray-700 transition"
                            title="Delete product"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DELETE DIALOG */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                <FaTrash className="text-red-500 mr-3" />
                Confirm Deletion
              </h3>
              <p className="text-gray-400 mb-6">This action will permanently remove the product. The vendor will be notified immediately.</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason for removal *</label>
                <select 
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-red-500"
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                >
                  <option value="">Select a reason...</option>
                  <option value="Inappropriate Content">Inappropriate Content</option>
                  <option value="Counterfeit Product">Counterfeit Product</option>
                  <option value="Policy Violation">Policy Violation</option>
                  <option value="Out of Stock (Long term)">Out of Stock (Long term)</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-800 text-white rounded-xl py-3 font-semibold hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmDelete}
                  disabled={!deleteReason || submitting}
                  className={`flex-1 bg-red-600 text-white rounded-xl py-3 font-semibold transition ${(!deleteReason || submitting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                >
                  {submitting ? 'Deleting...' : 'Confirm Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
