"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaTrash, FaPlus, FaSearch, FaFilter,
  FaBolt, FaEye, FaEdit, FaBox,
  FaWarehouse, FaCheck, FaTimes, FaPercent, FaFire
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
  deal_status?: string;
  is_deal_requested?: boolean;
  discount_percentage?: number;
  original_price?: number;
}

const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://nyle-store.onrender.com";

const getAdminAuthHeaders = (): HeadersInit => {
  return { "Content-Type": "application/json" };
};

export default function AllProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [vendorFilter, setVendorFilter] = useState("");
  const [dealFilter, setDealFilter] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);

  // Deletion state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Deal rejection modal
  const [showRejectDealModal, setShowRejectDealModal] = useState(false);
  const [dealToReject, setDealToReject] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, venRes] = await Promise.all([
        fetch(`${baseurl}/api/admin/products`, { headers: getAdminAuthHeaders(), credentials: "include" }),
        fetch(`${baseurl}/api/admin/categories`, { headers: getAdminAuthHeaders(), credentials: "include" }),
        fetch(`${baseurl}/api/admin/vendors`, { headers: getAdminAuthHeaders(), credentials: "include" })
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
        headers: getAdminAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ is_hot_deal: !currentStatus })
      });
      if (res.ok) {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, is_hot_deal: !currentStatus, deal_status: !currentStatus ? 'approved' : 'none' } : p));
        toast.success(`${!currentStatus ? '🔥 Marked as Hot Deal!' : '❌ Removed from Hot Deals'}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const approveDeal = async (id: number) => {
    try {
      const res = await fetch(`${baseurl}/api/admin/products/${id}/approve-deal`, {
        method: "PUT",
        headers: getAdminAuthHeaders(),
        credentials: "include"
      });
      if (res.ok) {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, deal_status: 'approved', is_hot_deal: true } : p));
        toast.success("✅ Deal approved! Product is now a Hot Deal.");
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to approve deal");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const rejectDeal = async () => {
    if (!dealToReject || !rejectReason.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${baseurl}/api/admin/products/${dealToReject}/reject-deal`, {
        method: "PUT",
        headers: getAdminAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ reason: rejectReason })
      });
      if (res.ok) {
        setProducts(prev => prev.map(p => p.id === dealToReject ? { ...p, deal_status: 'rejected', is_deal_requested: false } : p));
        toast.success("Deal rejected. Vendor will be notified.");
        setShowRejectDealModal(false);
        setDealToReject(null);
        setRejectReason("");
      } else {
        toast.error("Failed to reject deal");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
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
        headers: getAdminAuthHeaders(),
        credentials: "include",
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

  const pendingDeals = products.filter(p => p.deal_status === 'pending' || p.is_deal_requested);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    const matchesVendor = !vendorFilter || p.vendor_name === vendorFilter;
    const matchesDeal = !dealFilter ||
      (dealFilter === 'hot' && p.is_hot_deal) ||
      (dealFilter === 'pending' && (p.deal_status === 'pending' || p.is_deal_requested)) ||
      (dealFilter === 'none' && !p.is_hot_deal && !p.is_deal_requested);
    return matchesSearch && matchesCategory && matchesVendor && matchesDeal;
  });

  const getDealBadge = (p: Product) => {
    if (p.is_hot_deal && p.deal_status === 'approved') {
      return (
        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg shadow-red-900/20">
          <FaFire className="text-yellow-300" /> Hot Deal
        </span>
      );
    }
    if (p.deal_status === 'pending' || p.is_deal_requested) {
      return (
        <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full text-[10px] font-bold border border-amber-500/30 animate-pulse">
          <FaPercent size={8} /> Deal Pending
        </span>
      );
    }
    if (p.deal_status === 'rejected') {
      return (
        <span className="inline-flex items-center gap-1 bg-red-900/20 text-red-400 px-2.5 py-1 rounded-full text-[10px] font-bold border border-red-900/30">
          <FaTimes size={8} /> Rejected
        </span>
      );
    }
    return null;
  };

  return (
    <>
      <div className="p-6 min-h-screen">

        {/* Pending Deals Alert Banner */}
        {pendingDeals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <FaPercent className="text-amber-400" />
              </div>
              <div>
                <p className="text-amber-400 font-bold">{pendingDeals.length} Deal Request{pendingDeals.length > 1 ? 's' : ''} Awaiting Approval</p>
                <p className="text-gray-500 text-sm">Vendors have submitted products to be featured as Hot Deals</p>
              </div>
            </div>
            <button
              onClick={() => setDealFilter('pending')}
              className="px-4 py-2 bg-amber-500 text-white rounded-xl font-semibold text-sm hover:bg-amber-600 transition"
            >
              Review Now
            </button>
          </motion.div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <FaWarehouse className="mr-3 text-blue-500" />
              Product Catalog
            </h1>
            <p className="text-gray-400 mt-1">Manage all products ({filteredProducts.length} of {products.length})</p>
          </div>
          <Link
            href="/dashboard/products"
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20"
          >
            <FaPlus className="mr-2" />
            Create New Product
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="relative">
              <select
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                value={vendorFilter}
                onChange={(e) => setVendorFilter(e.target.value)}
              >
                <option value="">All Vendors</option>
                {vendors.map(v => <option key={v.id} value={v.legal_name}>{v.legal_name}</option>)}
              </select>
            </div>
            <div className="relative">
              <FaBolt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <select
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                value={dealFilter}
                onChange={(e) => setDealFilter(e.target.value)}
              >
                <option value="">All Deal Statuses</option>
                <option value="hot">🔥 Hot Deals</option>
                <option value="pending">⏳ Pending Deals</option>
                <option value="none">No Deal</option>
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
                  <th className="px-6 py-4 font-semibold">Deal Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="mt-4 text-gray-500">Loading products...</p>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center text-gray-500">
                      <FaBox className="text-5xl mx-auto mb-4 text-gray-800" />
                      <p className="text-lg">No products found</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p, i) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`hover:bg-blue-600/5 transition-colors group ${(p.deal_status === 'pending' || p.is_deal_requested) ? 'bg-amber-500/5' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 overflow-hidden flex-shrink-0">
                            {p.image_url ? (
                              <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-600">
                                <FaBox size={18} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">{p.name}</div>
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
                        <div>
                          <div className="text-white font-semibold">Ksh {p.price.toLocaleString()}</div>
                          {p.discount_percentage && p.discount_percentage > 0 && (
                            <div className="text-xs text-green-400 font-bold mt-0.5">
                              {p.discount_percentage}% OFF requested
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm font-semibold ${p.stock <= 5 ? 'text-red-400' : 'text-gray-300'}`}>
                          {p.stock} units
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {p.vendor_name || 'System Admin'}
                      </td>
                      <td className="px-6 py-4">
                        {getDealBadge(p)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Approve Deal — shown only for pending deals */}
                          {(p.deal_status === 'pending' || p.is_deal_requested) && (
                            <>
                              <button
                                onClick={() => approveDeal(p.id)}
                                className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white transition border border-green-500/20"
                                title="Approve Deal"
                              >
                                <FaCheck size={12} />
                              </button>
                              <button
                                onClick={() => { setDealToReject(p.id); setShowRejectDealModal(true); }}
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition border border-red-500/20"
                                title="Reject Deal"
                              >
                                <FaTimes size={12} />
                              </button>
                            </>
                          )}

                          {/* Toggle Hot Deal */}
                          <button
                            onClick={() => toggleHotDeal(p.id, !!p.is_hot_deal)}
                            className={`p-2 rounded-lg transition ${p.is_hot_deal ? 'bg-red-500 text-white shadow-lg shadow-red-900/20' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}`}
                            title={p.is_hot_deal ? "Remove from Hot Deals" : "Mark as Hot Deal"}
                          >
                            <FaBolt size={13} />
                          </button>

                          <Link
                            href={`https://nyle-store.onrender.com/products/${p.id}`}
                            target="_blank"
                            className="p-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition"
                            title="View product"
                          >
                            <FaEye size={13} />
                          </Link>
                          <button
                            onClick={() => router.push(`/dashboard/products?edit=${p.id}`)}
                            className="p-2 bg-gray-800 text-blue-400 hover:text-blue-300 rounded-lg hover:bg-gray-700 transition"
                            title="Edit product"
                          >
                            <FaEdit size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteInitiate(p.id)}
                            className="p-2 bg-gray-800 text-red-400 hover:text-red-300 rounded-lg hover:bg-gray-700 transition"
                            title="Delete product"
                          >
                            <FaTrash size={13} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* REJECT DEAL MODAL */}
      <AnimatePresence>
        {showRejectDealModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-amber-500/30 rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                <FaTimes className="text-red-500 mr-3" />
                Reject Deal Request
              </h3>
              <p className="text-gray-400 mb-6 text-sm">The vendor will be notified with your feedback.</p>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason for rejection *</label>
                <textarea
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-500 resize-none h-24"
                  placeholder="e.g. Discount percentage too high, insufficient product info..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <button onClick={() => setShowRejectDealModal(false)} className="flex-1 bg-gray-800 text-white rounded-xl py-3 font-semibold hover:bg-gray-700 transition">Cancel</button>
                <button
                  onClick={rejectDeal}
                  disabled={!rejectReason.trim() || submitting}
                  className={`flex-1 bg-red-600 text-white rounded-xl py-3 font-semibold transition ${(!rejectReason.trim() || submitting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                >
                  {submitting ? 'Rejecting...' : 'Reject Deal'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE MODAL */}
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
              <p className="text-gray-400 mb-6">This action is irreversible. The vendor will be notified.</p>
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
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 bg-gray-800 text-white rounded-xl py-3 font-semibold hover:bg-gray-700 transition">Cancel</button>
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
    </>
  );
}
