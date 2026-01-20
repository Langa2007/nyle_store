"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import AdminLayout from "@/app/components/AdminLayout";
import CategoryForm from "./CategoryForm";
import CategoryTable, { Category } from "./CategoryTable";
import {
  Layers,
  TrendingUp,
  Package,
  Filter,
  Download,
  RefreshCw,
  Plus,
  AlertTriangle,
  BarChart3,
  Shield,
  Sparkles,
  Grid3x3,
  Zap
} from "lucide-react";

// ✅ Base URL
export const baseurl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://nyle-store.onrender.com";

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    withProducts: 0,
    recent: 0
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Calculate statistics
  const calculateStats = useCallback((data: Category[]) => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    const total = data.length;
    const active = data.filter(cat => cat.status === 'active').length;
    const withProducts = data.filter(cat => (cat.productCount || 0) > 0).length;
    const recent = data.filter(cat => {
      const createdAt = new Date(cat.createdAt || '');
      return createdAt > thirtyDaysAgo;
    }).length;

    return { total, active, withProducts, recent };
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch(`${baseurl}/api/admin/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();

      // Transform data to match enhanced interface
      const enhancedData: Category[] = data.map((cat: any, index: number) => ({
        ...cat,
        productCount: Math.floor(Math.random() * 100), // Replace with actual data if available
        status: ['active', 'inactive', 'draft'][index % 3] as 'active' | 'inactive' | 'draft',
        createdAt: new Date(Date.now() - index * 86400000).toLocaleDateString(),
        updatedAt: new Date(Date.now() - index * 43200000).toLocaleDateString()
      }));

      setCategories(enhancedData);
      setStats(calculateStats(enhancedData));
    } catch (err) {
      console.error("Failed to fetch categories", err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [calculateStats]);

  // Create category
  const handleCreate = async (name: string, file: File | null) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (file) {
        formData.append("image", file);
      }

      const res = await fetch(`${baseurl}/api/admin/categories`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        const newCategory: Category = {
          ...data,
          productCount: 0,
          status: 'active',
          createdAt: new Date().toLocaleDateString(),
          updatedAt: new Date().toLocaleDateString()
        };

        setCategories((prev) => [newCategory, ...prev]);
        setStats(calculateStats([newCategory, ...categories]));
        toast.success("Category created successfully", {
          description: `${name} has been added to your inventory.`,
          icon: <Sparkles className="w-5 h-5 text-emerald-500" />
        });
      } else {
        toast.error(data.error || "Failed to create category", {
          icon: <AlertTriangle className="w-5 h-5 text-red-500" />
        });
      }
    } catch {
      toast.error("Error creating category", {
        description: "Please check your network connection and try again.",
        icon: <AlertTriangle className="w-5 h-5 text-red-500" />
      });
    }
  };

  // Update category
  const handleUpdate = async (name: string, file: File | null) => {
    if (!editingCategory) return;
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (file) {
        formData.append("image", file);
      }

      const res = await fetch(`${baseurl}/api/admin/categories/${editingCategory.id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        const updatedCategory: Category = {
          ...data,
          productCount: editingCategory.productCount,
          status: editingCategory.status,
          createdAt: editingCategory.createdAt,
          updatedAt: new Date().toLocaleDateString()
        };

        setCategories((prev) => prev.map(cat =>
          cat.id === editingCategory.id ? updatedCategory : cat
        ));

        toast.success("Category updated successfully", {
          description: `${name} has been updated.`,
          icon: <Sparkles className="w-5 h-5 text-emerald-500" />
        });
        setEditingCategory(null);
      } else {
        toast.error(data.error || "Failed to update category", {
          icon: <AlertTriangle className="w-5 h-5 text-red-500" />
        });
      }
    } catch {
      toast.error("Error updating category", {
        description: "Please check your network connection and try again.",
        icon: <AlertTriangle className="w-5 h-5 text-red-500" />
      });
    }
  };

  const handleFormSubmit = async (name: string, file: File | null) => {
    if (editingCategory) {
      await handleUpdate(name, file);
    } else {
      await handleCreate(name, file);
    }
  };

  // Delete category
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${baseurl}/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        const deletedCategory = categories.find(cat => cat.id === id);
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        setStats(calculateStats(categories.filter(cat => cat.id !== id)));

        toast.success("Category deleted successfully", {
          description: `${deletedCategory?.name} has been removed.`,
          icon: <Sparkles className="w-5 h-5 text-emerald-500" />
        });
      } else {
        toast.error(data.error || "Failed to delete category", {
          icon: <AlertTriangle className="w-5 h-5 text-red-500" />
        });
      }
    } catch {
      toast.error("Error deleting category", {
        description: "Please check your network connection and try again.",
        icon: <AlertTriangle className="w-5 h-5 text-red-500" />
      });
    }
  };

  // Export categories
  const handleExport = async () => {
    try {
      setExportLoading(true);
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));

      const csvContent = "data:text/csv;charset=utf-8,"
        + ["ID,Name,Products,Status,Created"].join("\n")
        + categories.map(cat =>
          `${cat.id},${cat.name},${cat.productCount || 0},${cat.status || 'active'},${cat.createdAt}`
        ).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `categories_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Export completed", {
        description: "Category data has been exported as CSV.",
        icon: <Download className="w-5 h-5 text-emerald-500" />
      });
    } catch {
      toast.error("Export failed", {
        icon: <AlertTriangle className="w-5 h-5 text-red-500" />
      });
    } finally {
      setExportLoading(false);
    }
  };

  // Quick actions
  const quickActions = [
    {
      label: "Add Category",
      icon: <Plus className="w-4 h-4" />,
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      color: "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
    },
    {
      label: "Export Data",
      icon: <Download className="w-4 h-4" />,
      onClick: handleExport,
      color: "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white",
      loading: exportLoading
    },
    {
      label: "Refresh",
      icon: <RefreshCw className="w-4 h-4" />,
      onClick: fetchCategories,
      color: "bg-gradient-to-r from-purple-600 to-purple-700 text-white",
      loading: isRefreshing
    }
  ];

  return (
    <AdminLayout
      title="Categories"
      breadcrumbs={[
        { label: "Inventory", href: "/dashboard/products" },
        { label: "Categories" }
      ]}
      headerActions={
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditingCategory(null)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Category
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
                    <Grid3x3 className="w-6 h-6" />
                  </div>
                  Category Management
                </h1>
                <p className="text-blue-100 max-w-2xl">
                  Organize your products with categories. Manage, sort, and analyze your inventory structure.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchCategories}
                disabled={isRefreshing}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Total Categories",
              value: stats.total,
              icon: <Layers className="w-5 h-5" />,
              color: "from-blue-500 to-blue-600",
              change: "+12%"
            },
            {
              title: "Active Categories",
              value: stats.active,
              icon: <Shield className="w-5 h-5" />,
              color: "from-emerald-500 to-emerald-600",
              change: "+8%"
            },
            {
              title: "With Products",
              value: stats.withProducts,
              icon: <Package className="w-5 h-5" />,
              color: "from-purple-500 to-purple-600",
              change: "+15%"
            },
            {
              title: "Recent (30d)",
              value: stats.recent,
              icon: <TrendingUp className="w-5 h-5" />,
              color: "from-amber-500 to-amber-600",
              change: "+5%"
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
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="mt-2 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  style={{ width: `${(stat.value / Math.max(stats.total, 1)) * 100}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.onClick}
                disabled={action.loading}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 hover:scale-[1.02] ${action.color} disabled:opacity-50`}
              >
                {action.loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  action.icon
                )}
                {action.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid xl:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-6"
            >
              <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-1 shadow-lg">
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-500" />
                    {editingCategory ? 'Edit Category' : 'Create Category'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    {editingCategory
                      ? 'Update your category details'
                      : 'Add a new category to organize products'
                    }
                  </p>

                  <CategoryForm
                    initialData={editingCategory}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setEditingCategory(null)}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Table */}
          <div className="xl:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CategoryTable
                categories={categories}
                onEdit={setEditingCategory}
                onDelete={handleDelete}
                loading={loading}
              />
            </motion.div>
          </div>
        </div>

        {/* Tips & Best Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Best Practices</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-sm text-gray-700">
                  <span className="font-medium text-blue-700">✓ Keep it organized</span>
                  <p className="mt-1">Use descriptive names that customers will understand.</p>
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium text-blue-700">✓ Add quality images</span>
                  <p className="mt-1">High-quality images improve customer engagement.</p>
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium text-blue-700">✓ Regular maintenance</span>
                  <p className="mt-1">Review and update categories quarterly.</p>
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium text-blue-700">✓ Balance depth</span>
                  <p className="mt-1">Aim for 5-15 main categories with subcategories.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Action Button */}
        <AnimatePresence>
          {editingCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <button
                onClick={() => {
                  setEditingCategory(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <Plus className="w-5 h-5" />
                Add New Category
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}