"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Menu, X, ShoppingCart, Package, BarChart3, Settings, 
  Plus, Edit, Trash2, Eye, CheckCircle, Clock, AlertCircle,
  Upload, Image as ImageIcon, Tag, DollarSign, Package2,
  Filter, Search, ChevronRight, TrendingUp, Users,
  LogOut, Shield, UserCheck, AlertTriangle
} from "lucide-react";
import ProductForm from "@/components/vendor/ProductForm";
import ProductTable from "@/components/vendor/ProductTable";
import StatsOverview from "@/components/vendor/StatsOverview";
import { getVendorProducts, getProductStats, verifyVendorSession } from "@/services/VendorApi";

// Disable static generation
export const dynamic = 'force-dynamic';

export default function VendorDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vendorData, setVendorData] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: BarChart3 },
    { id: "products", name: "Products", icon: Package },
    { id: "orders", name: "Orders", icon: ShoppingCart },
    { id: "customers", name: "Customers", icon: Users },
    { id: "analytics", name: "Analytics", icon: TrendingUp },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  // Authentication check
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isVerified && (activeTab === "products" || activeTab === "dashboard")) {
      fetchProducts();
      fetchStats();
    }
  }, [activeTab, isVerified]);

  const checkAuth = async () => {
    try {
      setAuthLoading(true);
      const response = await verifyVendorSession();
      
      if (response?.authenticated && response?.verified) {
        setVendorData(response.vendor);
        setIsVerified(true);
      } else {
        // Not authenticated or not verified, redirect to sign-in
        router.push("/vendor/login?redirect=/vendor/dashboard");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/vendor/login?redirect=/vendor/dashboard&error=auth_failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getVendorProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      if (error.response?.status === 401) {
        // Token expired, redirect to sign-in
        router.push("/vendor/login?redirect=/vendor/dashboard&error=session_expired");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getProductStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleProductCreated = (newProduct) => {
    setProducts([newProduct, ...products]);
    setShowProductForm(false);
    fetchStats();
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const handleProductDeleted = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
    fetchStats();
  };

  const handleLogout = () => {
    // Clear vendor session
    localStorage.removeItem("vendor_token");
    localStorage.removeItem("vendor_data");
    sessionStorage.removeItem("vendor_session");
    router.push("/vendor/login");
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Verifying your vendor access...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we check your credentials</p>
        </div>
      </div>
    );
  }

  // Not verified - show verification required message
  if (!isVerified && !authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Verification Required</h1>
          
          <p className="text-gray-600 mb-6">
            Your vendor account needs verification before accessing the dashboard.
            Please complete your verification process to continue.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => router.push("/vendor/verification")}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              <UserCheck className="inline w-5 h-5 mr-2" />
              Complete Verification
            </button>
            
            <button
              onClick={() => router.push("/vendor/signin")}
              className="w-full border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Sign In Again
            </button>
            
            <button
              onClick={() => router.push("/")}
              className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm transition"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, {vendorData?.business_name || 'Vendor'}!</h1>
                  <p className="text-blue-100">Here's what's happening with your store today</p>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Verified Vendor</span>
                </div>
              </div>
            </div>
            
            <StatsOverview stats={stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Products */}
              <div className="bg-white shadow rounded-xl border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Products</h2>
                    <button 
                      onClick={() => setActiveTab("products")}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                    >
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {products.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition">
                      <div className="flex items-center gap-3">
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Package2 className="w-6 h-6 text-blue-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-gray-800">{product.name}</h3>
                          <p className="text-sm text-gray-500">Ksh {product.price?.toLocaleString()}</p>
                        </div>
                      </div>
                      <StatusBadge status={product.status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowProductForm(true)}
                    className="w-full bg-white text-blue-700 hover:bg-blue-50 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Product
                  </button>
                  <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition">
                    <Upload className="w-5 h-5" />
                    Bulk Upload Products
                  </button>
                  <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition">
                    <BarChart3 className="w-5 h-5" />
                    View Analytics Report
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-red-500/20 hover:bg-red-500/30 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "products":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
                <p className="text-gray-600">Manage your products and inventory</p>
              </div>
              <button
                onClick={() => setShowProductForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center gap-2 transition"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>

            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-blue-700">{stats.total || 0}</div>
                  <div className="text-sm text-gray-500">Total Products</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">
                    {stats.approved || 0}
                  </div>
                  <div className="text-sm text-gray-500">Approved</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-yellow-600">
                    {stats.pending || 0}
                  </div>
                  <div className="text-sm text-gray-500">Pending</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-blue-700">
                    {stats.limit?.remaining || 0}
                  </div>
                  <div className="text-sm text-gray-500">Remaining Slots</div>
                </div>
              </div>
            )}

            <ProductTable 
              products={products}
              loading={loading}
              onRefresh={fetchProducts}
              onEdit={(product) => {
                setShowProductForm(product);
              }}
              onDelete={handleProductDeleted}
            />
          </div>
        );

      default:
        return (
          <div className="bg-white shadow rounded-xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <p className="text-gray-500">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 shadow-xl`}
      >
        <div className="p-6 border-b border-blue-600/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-700 font-bold text-xl">N</span>
            </div>
            <div>
              <div className="font-bold text-xl text-white mb-1">Nyle Vendor</div>
              <div className="text-blue-200 text-sm">Business Portal</div>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-1">
          {menuItems.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === id 
                  ? "bg-white/10 text-white shadow-inner" 
                  : "text-blue-100 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{name}</span>
            </button>
          ))}
        </nav>

        {/* Vendor Profile Section */}
        <div className="p-4 mt-auto border-t border-blue-600/30">
          <div className="bg-blue-900/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={vendorData?.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(vendorData?.business_name || 'Vendor')}&background=3B82F6&color=ffffff`}
                alt="Vendor Logo"
                className="w-10 h-10 rounded-lg border-2 border-blue-200"
              />
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold truncate">{vendorData?.business_name}</div>
                <div className="text-blue-300 text-xs truncate">
                  {vendorData?.email}
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            </div>
            
            <div className="text-blue-200 text-sm mb-2">Plan Status</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">Premium Vendor</div>
                <div className="text-blue-300 text-xs">
                  {stats?.limit ? `${stats.limit.used}/${stats.limit.max} products` : 'Loading...'}
                </div>
              </div>
              <Shield className="w-5 h-5 text-green-400" />
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 text-blue-200 hover:text-white hover:bg-red-500/20 py-2 px-4 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-gray-600 hover:text-gray-900"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, orders..."
                  className="bg-transparent border-none focus:outline-none ml-2 w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-blue-600">
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </div>
                <BellIcon />
              </button>

              {/* Vendor Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="font-medium text-gray-800">{vendorData?.contact_person || 'Admin'}</div>
                  <div className="text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={vendorData?.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(vendorData?.business_name || 'Vendor')}&background=3B82F6&color=ffffff`}
                    alt="vendor logo"
                    className="w-10 h-10 rounded-full border-2 border-blue-100"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <ProductForm 
              product={typeof showProductForm === 'object' ? showProductForm : null}
              onClose={() => setShowProductForm(false)}
              onSuccess={typeof showProductForm === 'object' ? handleProductUpdated : handleProductCreated}
              vendorId={vendorData?.id}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }) {
  const config = {
    draft: { color: "bg-gray-100 text-gray-800", icon: Clock },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
    approved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    rejected: { color: "bg-red-100 text-red-800", icon: AlertCircle },
    active: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  };

  const { color, icon: Icon } = config[status] || config.draft;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${color}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// Bell Icon Component
function BellIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}