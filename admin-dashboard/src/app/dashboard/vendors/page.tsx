"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import AdminLayout from "@/app/components/AdminLayout";
import {
  Building2,
  Mail,
  CheckCircle,
  XCircle,
  MoreVertical,
  Filter,
  Search,
  Download,
  RefreshCw,
  UserPlus,
  Eye,
  Shield,
  TrendingUp,
  Users,
  Star,
  AlertTriangle,
  Edit,
  Trash2,
  ExternalLink,
  BarChart3,
  Clock,
  Zap,
  ChevronDown,
  Calendar,
  Phone,
  Globe,
  CreditCard,
  FileText,
  Package
} from "lucide-react";

interface Vendor {
  id: number;
  company_name: string;
  email: string;
  status: "pending" | "approved" | "rejected" | "active"; // Add approved, keep active for safety
  is_verified: boolean;
  phone?: string;
  website?: string;
  created_at?: string; // Backend uses created_at
  product_count?: number;
  total_sales?: number;
  rating?: number;
  address?: string;
  contact_person?: string;
}

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedVendors, setSelectedVendors] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("company_name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedVendor, setExpandedVendor] = useState<number | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/admin/vendors`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setVendors(data);
        } else {
          setVendors([]);
        }
      } else {
        toast.error("Failed to fetch vendors");
        setVendors([]);
      }
    } catch (err) {
      console.error("Error fetching vendors:", err);
      setVendors([]);
      toast.error("Failed to load vendors", {
        description: "Please check your network connection",
        icon: <AlertTriangle className="w-5 h-5 text-amber-500" />
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // Filter and sort vendors
  const filteredVendors = vendors
    .filter(vendor => {
      const matchesSearch =
        vendor.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.contact_person?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "all" || vendor.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof Vendor];
      let bValue: any = b[sortBy as keyof Vendor];

      if (sortBy === "total_sales" || sortBy === "product_count" || sortBy === "rating") {
        aValue = aValue || 0;
        bValue = bValue || 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === "asc"
        ? (aValue || 0) - (bValue || 0)
        : (bValue || 0) - (aValue || 0);
    });

  const handleStatusUpdate = async (vendorId: number, targetStatus: "approve" | "reject") => {
    try {
      const endpoint = targetStatus === "approve" ? "approve" : "reject";
      const res = await fetch(`${API_URL}/api/admin/vendors/${vendorId}/${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        const finalStatus = targetStatus === "approve" ? "approved" : "rejected";
        setVendors(prev => prev.map(v =>
          v.id === vendorId ? { ...v, status: finalStatus } : v
        ));

        toast.success(`Vendor ${finalStatus}`, {
          description: `Status updated successfully`,
          icon: <CheckCircle className="w-5 h-5 text-emerald-500" />
        });
      } else {
        throw new Error("Action failed");
      }
    } catch (err) {
      toast.error("Update failed", {
        description: "Please try again",
        icon: <XCircle className="w-5 h-5 text-red-500" />
      });
    }
  };

  const handleDeleteVendor = async (vendorId: number) => {
    if (!confirm("Are you sure you want to delete this vendor? This action cannot be undone.")) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/vendors/${vendorId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setVendors(prev => prev.filter(v => v.id !== vendorId));
        toast.success("Vendor deleted", {
          description: "Vendor has been removed from the system",
          icon: <CheckCircle className="w-5 h-5 text-emerald-500" />
        });
      }
    } catch (err) {
      toast.error("Delete failed", {
        description: "Please try again",
        icon: <XCircle className="w-5 h-5 text-red-500" />
      });
    }
  };

  const handleSelectAll = () => {
    if (selectedVendors.length === filteredVendors.length) {
      setSelectedVendors([]);
    } else {
      setSelectedVendors(filteredVendors.map(v => v.id));
    }
  };

  const handleSelectVendor = (id: number) => {
    setSelectedVendors(prev =>
      prev.includes(id) ? prev.filter(vId => vId !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: Vendor["status"]) => {
    switch (status) {
      case "active":
      case "approved": return { bg: "bg-emerald-100", text: "text-emerald-800", dot: "bg-emerald-500" };
      case "pending": return { bg: "bg-amber-100", text: "text-amber-800", dot: "bg-amber-500" };

      case "rejected": return { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" };
      default: return { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" };
    }
  };

  const stats = {
    total: vendors.length,
    active: vendors.filter(v => v.status === "active" || v.status === "approved").length,
    pending: vendors.filter(v => v.status === "pending").length,
    verified: vendors.filter(v => v.is_verified).length,
    totalSales: vendors.reduce((sum, v) => sum + (v.total_sales || 0), 0),
    totalProducts: vendors.reduce((sum, v) => sum + (v.product_count || 0), 0)
  };

  const quickActions = [
    {
      label: "Approve Selected",
      icon: <CheckCircle className="w-4 h-4" />,
      onClick: () => selectedVendors.forEach(id => handleStatusUpdate(id, "approve")),
      color: "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white",
      disabled: selectedVendors.length === 0
    },
    {
      label: "Reject Selected",
      icon: <XCircle className="w-4 h-4" />,
      onClick: () => selectedVendors.forEach(id => handleStatusUpdate(id, "reject")),
      color: "bg-gradient-to-r from-red-600 to-red-700 text-white",
      disabled: selectedVendors.length === 0
    },
    {
      label: "Export CSV",
      icon: <Download className="w-4 h-4" />,
      onClick: () => toast.info("Export feature coming soon"),
      color: "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
    },
    {
      label: "Invite Vendor",
      icon: <UserPlus className="w-4 h-4" />,
      onClick: () => toast.info("Invite feature coming soon"),
      color: "bg-gradient-to-r from-purple-600 to-purple-700 text-white"
    }
  ];

  return (
    <AdminLayout
      title="Vendor Management"
      breadcrumbs={[
        { label: "Partners", href: "/dashboard/partners" },
        { label: "Vendors" }
      ]}
      headerActions={
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchVendors()}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-6 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Building2 className="w-6 h-6" />
                  </div>
                  Vendor Management
                </h1>
                <p className="text-blue-100 max-w-2xl">
                  Manage your vendor partnerships, review applications, and monitor vendor performance.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors flex items-center gap-2"
              >
                {viewMode === "grid" ? "List View" : "Grid View"}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            {
              title: "Total Vendors",
              value: stats.total,
              icon: <Building2 className="w-5 h-5" />,
              color: "from-blue-500 to-blue-600",
              change: "+12%"
            },
            {
              title: "Active",
              value: stats.active,
              icon: <CheckCircle className="w-5 h-5" />,
              color: "from-emerald-500 to-emerald-600",
              change: "+8%"
            },
            {
              title: "Pending",
              value: stats.pending,
              icon: <Clock className="w-5 h-5" />,
              color: "from-amber-500 to-amber-600",
              change: "+3"
            },
            {
              title: "Verified",
              value: stats.verified,
              icon: <Shield className="w-5 h-5" />,
              color: "from-purple-500 to-purple-600",
              change: "+5%"
            },
            {
              title: "Total Sales",
              value: `$${(stats.totalSales / 1000).toFixed(1)}k`,
              icon: <CreditCard className="w-5 h-5" />,
              color: "from-indigo-500 to-indigo-600",
              change: "+24%"
            },
            {
              title: "Products",
              value: stats.totalProducts,
              icon: <Package className="w-5 h-5" />,
              color: "from-rose-500 to-rose-600",
              change: "+18%"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="mt-2 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions & Search */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vendors by name, email, or contact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-10 p-4"
                    >
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <select title="Filter Vendors by Status"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                          <select title="Sort Vendors By"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="company_name">Company Name</option>
                            <option value="created_at">Registration Date</option>
                            <option value="total_sales">Total Sales</option>
                            <option value="product_count">Product Count</option>
                            <option value="rating">Rating</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden lg:flex items-center gap-2">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 hover:scale-[1.02] ${action.color} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {action.icon}
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Actions Bar */}
          {selectedVendors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-blue-200">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">
                      {selectedVendors.length} vendor{selectedVendors.length !== 1 ? 's' : ''} selected
                    </p>
                    <p className="text-sm text-blue-700">Apply actions to all selected vendors</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedVendors([])}
                    className="px-4 py-2 text-sm text-blue-700 hover:text-blue-900"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Vendor Grid/List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                <Zap className="absolute inset-0 m-auto w-8 h-8 text-blue-500 animate-pulse" />
              </div>
              <p className="mt-4 text-lg font-medium text-gray-700">Loading vendors</p>
              <p className="text-sm text-gray-500">Fetching vendor data...</p>
            </div>
          ) : filteredVendors.length === 0 ? (
            <div className="text-center py-16 px-6 rounded-2xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-white">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 mb-6">
                <Users className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Vendors Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchQuery || filterStatus !== "all"
                  ? "No vendors match your search criteria. Try adjusting your filters."
                  : "You haven't added any vendors yet. Start by inviting your first vendor partner."
                }
              </p>
              {searchQuery || filterStatus !== "all" ? (
                <button
                  onClick={() => { setSearchQuery(""); setFilterStatus("all"); }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  Clear Filters
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <UserPlus className="w-5 h-5" />
                  Invite Your First Vendor
                </motion.button>
              )}
            </div>
          ) : viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => {
                const statusColors = getStatusColor(vendor.status);
                const isSelected = selectedVendors.includes(vendor.id);
                const isExpanded = expandedVendor === vendor.id;

                return (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    className={`relative rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-gray-200'
                      }`}
                  >
                    {/* Selection Checkbox */}
                    <div className="absolute top-4 right-4 z-10">
                      <input title="Select Vendor"
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectVendor(vendor.id)}
                        className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                    </div>

                    {/* Vendor Card */}
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-blue-600" />
                            </div>
                            {vendor.is_verified && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{vendor.company_name}</h3>
                            <p className="text-sm text-gray-600">{vendor.contact_person}</p>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="mb-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusColors.bg} ${statusColors.text}`}>
                          <div className={`w-2 h-2 rounded-full ${statusColors.dot}`}></div>
                          <span className="text-xs font-medium capitalize">{vendor.status}</span>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{vendor.email}</span>
                        </div>
                        {vendor.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{vendor.phone}</span>
                          </div>
                        )}
                        {vendor.website && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Globe className="w-4 h-4" />
                            <span className="truncate">{vendor.website}</span>
                          </div>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">{vendor.product_count || 0}</p>
                          <p className="text-xs text-gray-600">Products</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">${(vendor.total_sales || 0) / 1000}k</p>
                          <p className="text-xs text-gray-600">Sales</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-900">{vendor.rating || 'N/A'}</p>
                          <p className="text-xs text-gray-600">Rating</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setExpandedVendor(isExpanded ? null : vendor.id)}
                          className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Details
                        </motion.button>
                        <div className="relative">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-gray-200 bg-gray-50 p-6"
                        >
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Address</h4>
                              <p className="text-sm text-gray-600">{vendor.address || 'Not provided'}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Registration Date</h4>
                              <p className="text-sm text-gray-600">{vendor.created_at ? new Date(vendor.created_at).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleStatusUpdate(vendor.id, "approve")}
                                className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(vendor.id, "reject")}
                                className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => handleDeleteVendor(vendor.id)}
                                className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // Table View (simplified for space)
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left">
                      <input title="Select All Vendors"
                        type="checkbox"
                        checked={selectedVendors.length === filteredVendors.length}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Company</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Products</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Sales</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVendors.map((vendor) => {
                    const statusColors = getStatusColor(vendor.status);
                    return (
                      <tr key={vendor.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-4">
                          <input title="Select Vendor"
                            type="checkbox"
                            checked={selectedVendors.includes(vendor.id)}
                            onChange={() => handleSelectVendor(vendor.id)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{vendor.company_name}</p>
                              <p className="text-sm text-gray-600">{vendor.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-900">{vendor.contact_person}</p>
                          <p className="text-sm text-gray-600">{vendor.phone}</p>
                        </td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusColors.bg} ${statusColors.text}`}>
                            <div className={`w-2 h-2 rounded-full ${statusColors.dot}`}></div>
                            <span className="text-xs font-medium capitalize">{vendor.status}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-gray-900">{vendor.product_count || 0}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-gray-900">${(vendor.total_sales || 0).toLocaleString()}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleStatusUpdate(vendor.id, "approve")}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleDeleteVendor(vendor.id)}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}