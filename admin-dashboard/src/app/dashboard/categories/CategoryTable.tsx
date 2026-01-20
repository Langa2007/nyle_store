"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, 
  Pencil, 
  MoreVertical, 
  Eye, 
  TrendingUp,
  Package,
  Calendar,
  Users,
  ArrowUpDown,
  Search,
  Filter,
  Download,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ExternalLink,
  BarChart3,
  Tag,
  Layers,
  Sparkles
} from "lucide-react";
import Image from "next/image";

export interface Category {
  id: number;
  name: string;
  image_url?: string;
  productCount?: number;
  status?: 'active' | 'inactive' | 'draft';
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => Promise<void>;
  loading: boolean;
}

export default function CategoryTable({ categories, onEdit, onDelete, loading }: CategoryTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  // Filter and sort categories
  const filteredCategories = categories
    .filter(cat => {
      const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "all" || cat.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof Category];
      let bValue: any = b[sortBy as keyof Category];
      
      if (sortBy === "productCount") {
        aValue = a.productCount || 0;
        bValue = b.productCount || 0;
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

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredCategories.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredCategories.map(cat => cat.id));
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' };
      case 'inactive': return { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' };
      case 'draft': return { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' };
      default: return { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' };
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-blue-500 animate-pulse" />
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading categories</p>
        <p className="text-sm text-gray-500">Fetching your inventory data...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 px-6 rounded-2xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 mb-6">
          <Layers className="w-12 h-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Categories Yet</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Start organizing your products by creating your first category. Categories help customers find products easily.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <Tag className="w-5 h-5" />
          Create Your First Category
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Table Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Categories</h3>
            <p className="text-sm text-gray-600">
              {filteredCategories.length} of {categories.length} categories
              {selectedRows.length > 0 && ` • ${selectedRows.length} selected`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select title= "Filter by Status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {selectedRows.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (confirm(`Delete ${selectedRows.length} selected categories?`)) {
                      selectedRows.forEach(id => onDelete(id));
                      setSelectedRows([]);
                    }
                  }}
                  className="px-4 py-2.5 bg-red-50 text-red-700 text-sm font-medium rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete ({selectedRows.length})
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-lg"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                <th className="w-12 p-4">
                  <input title= "Select All Categories"
                    type="checkbox"
                    checked={selectedRows.length === filteredCategories.length && filteredCategories.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-gray-900"
                  >
                    Category
                    <ArrowUpDown className={`w-3 h-3 ${sortBy === "name" ? "text-blue-600" : "text-gray-400"}`} />
                  </button>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <Package className="w-3 h-3" />
                    Products
                  </div>
                </th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort("status")}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-gray-900"
                  >
                    Status
                    <ArrowUpDown className={`w-3 h-3 ${sortBy === "status" ? "text-blue-600" : "text-gray-400"}`} />
                  </button>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <Calendar className="w-3 h-3" />
                    Created
                  </div>
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat, index) => {
                const statusColors = getStatusColor(cat.status);
                const isSelected = selectedRows.includes(cat.id);
                const isExpanded = expandedRow === cat.id;

                return (
                  <motion.tr
                    key={cat.id}
                    initial={false}
                    animate={{ 
                      backgroundColor: isSelected ? '#EFF6FF' : index % 2 === 0 ? '#FFFFFF' : '#F9FAFB'
                    }}
                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${isSelected ? 'bg-blue-50' : ''}`}
                  >
                    {/* Checkbox */}
                    <td className="p-4">
                      <input title= {`Select category ${cat.name}`}
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(cat.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                    </td>

                    {/* Category Info */}
                    <td className="p-4">
                      <div 
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setExpandedRow(isExpanded ? null : cat.id)}
                      >
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 overflow-hidden">
                            {cat.image_url ? (
                              <img
                                src={cat.image_url}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Tag className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                            <Layers className="w-3 h-3 text-gray-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {cat.name}
                          </h4>
                          <p className="text-xs text-gray-500">ID: {cat.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Product Count */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                          {cat.productCount || 0}
                        </div>
                        <TrendingUp className={`w-4 h-4 ${(cat.productCount || 0) > 0 ? 'text-emerald-500' : 'text-gray-400'}`} />
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusColors.bg} ${statusColors.text}`}>
                        <div className={`w-2 h-2 rounded-full ${statusColors.dot}`}></div>
                        <span className="text-xs font-medium capitalize">
                          {cat.status || 'active'}
                        </span>
                      </div>
                    </td>

                    {/* Created Date */}
                    <td className="p-4">
                      <div className="text-sm text-gray-700">
                        {cat.createdAt || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">
                        Last updated: {cat.updatedAt || 'N/A'}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onEdit(cat)}
                          className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 group"
                          title="Edit category"
                        >
                          <Pencil className="w-4 h-4" />
                          <span className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Edit
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowDeleteConfirm(cat.id)}
                          className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 group"
                          title="Delete category"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Delete
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setExpandedRow(isExpanded ? null : cat.id)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            isExpanded 
                              ? 'text-white bg-gray-700' 
                              : 'text-gray-600 hover:text-white hover:bg-gray-600'
                          }`}
                          title={isExpanded ? "Collapse" : "View details"}
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Expanded Row Details */}
        <AnimatePresence>
          {expandedRow && (() => {
            const category = categories.find(cat => cat.id === expandedRow);
            if (!category) return null;

            return (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white"
              >
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Image Preview */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Category Image</h4>
                      <div className="relative w-full h-48 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 overflow-hidden">
                        {category.image_url ? (
                          <img
                            src={category.image_url}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Category Details */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Category ID:</span>
                          <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">#{category.id}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Name:</span>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(category.status).bg} ${getStatusColor(category.status).text}`}>
                            {category.status || 'active'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Created:</span>
                          <span className="text-sm">{category.createdAt || 'Not available'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full text-left px-4 py-2.5 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl transition-colors flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          View Analytics
                        </button>
                        <button className="w-full text-left px-4 py-2.5 text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl transition-colors flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Preview Category
                        </button>
                        <button 
                          onClick={() => onEdit(category)}
                          className="w-full text-left px-4 py-2.5 text-sm bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl transition-colors flex items-center gap-2"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">No categories found</h4>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => { setSearchQuery(""); setFilterStatus("all"); }}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Clear all filters
            </button>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowDeleteConfirm(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Delete Category</h3>
                    <p className="text-sm text-gray-600">This action cannot be undone</p>
                  </div>
                </div>
                
                <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100">
                  <p className="text-red-700 font-medium">
                    Are you sure you want to delete "
                    {categories.find(c => c.id === showDeleteConfirm)?.name}"?
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    All associated products will be moved to "Uncategorized".
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      await onDelete(showDeleteConfirm);
                      setShowDeleteConfirm(null);
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Category
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}