"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import AdminLayout from "@/app/components/AdminLayout";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

interface Category {
  id: number;
  name: string;
  image_url?: string;
}

// ✅ Base URL
export const baseurl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://nyle-store.onrender.com";

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  //  Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${baseurl}/api/admin/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
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

  //  Create category
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
        setCategories((prev) => [...prev, data]);
        toast.success("Category created successfully");
      } else {
        toast.error(data.error || "Failed to create category");
      }
    } catch {
      toast.error("Error creating category");
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
        setCategories((prev) => prev.map(cat => cat.id === editingCategory.id ? data : cat));
        toast.success("Category updated successfully");
        setEditingCategory(null);
      } else {
        toast.error(data.error || "Failed to update category");
      }
    } catch {
      toast.error("Error updating category");
    }
  };

  const handleFormSubmit = async (name: string, file: File | null) => {
    if (editingCategory) {
      await handleUpdate(name, file);
    } else {
      await handleCreate(name, file);
    }
  };

  //  Delete category
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`${baseurl}/api/admin/categories/${id}`, {
        method: "DELETE",
      });
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

        <CategoryForm
          initialData={editingCategory}
          onSubmit={handleFormSubmit}
          onCancel={() => setEditingCategory(null)}
        />
        <CategoryTable
          categories={categories}
          onEdit={setEditingCategory}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
}
