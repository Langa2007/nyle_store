"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner"; // if not using Sonner, replace with your toast lib
import AdminLayout from "@/app/components/AdminLayout";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

interface Category {
  id: number;
  name: string;
}

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Create category
  const handleCreate = async (name: string) => {
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (res.ok) {
        setCategories((prev) => [...prev, data]);
        toast.success("Category created successfully");
      } else {
        toast.error(data.error || "Failed to create category");
      }
    } catch {
      toast.error("Error creating category");
    }
  };

  // ✅ Delete category
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        toast.success("Category deleted");
      } else {
        toast.error(data.error || "Failed to delete category");
      }
    } catch {
      toast.error("Error deleting category");
    }
  };

  return (
    <AdminLayout title="Manage Categories">
      <div className="max-w-5xl mx-auto py-10 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-gray-800 mb-6"
        >
          Category Management
        </motion.h1>

        <CategoryForm onCreate={handleCreate} />
        <CategoryTable categories={categories} onDelete={handleDelete} loading={loading} />
      </div>
    </AdminLayout>
  );
}
