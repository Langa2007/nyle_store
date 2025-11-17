// admin-dashboard/src/app/dashboard/products/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import AdminLayout from "@/app/components/AdminLayout";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  category?: string;
}

interface Category {
  id: number;
  name: string;
}

const baseurl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://nyle-store.onrender.com";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  // Fetch products + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${baseurl}/api/admin/products`, { credentials: "include" }),
          fetch(`${baseurl}/api/admin/categories`, { credentials: "include" }),
        ]);

        if (!prodRes.ok || !catRes.ok) {
          throw new Error("Failed to fetch");
        }

        const [prodData, catData] = await Promise.all([
          prodRes.json(),
          catRes.json(),
        ]);

        setProducts(prodData);
        setCategories(catData);
      } catch (err) {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle preview image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CREATE product
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, description, price, stock, category } = formData;
    if (!name || !price || !stock) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);

    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("price", price);
    form.append("stock", stock);
    form.append("category", category);
    if (selectedFile) form.append("image", selectedFile);

    try {
      const res = await fetch(`${baseurl}/api/admin/products`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setProducts((prev) => [data, ...prev]);
        toast.success("Product created successfully");

        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
        });

        setSelectedFile(null);
        setPreview(null);
      } else {
        toast.error(data.error || "Failed to create product");
      }
    } catch (err: any) {
      toast.error("Error creating product: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // DELETE product
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${baseurl}/api/admin/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Product deleted");
      } else {
        toast.error(data.error || "Failed to delete product");
      }
    } catch (err) {
      toast.error("Delete error");
    }
  };

  if (loading)
    return (
      <AdminLayout title="Manage Products">
        <div className="text-center py-20 text-gray-500">Loading...</div>
      </AdminLayout>
    );

  return (
    <AdminLayout title="Manage Products">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6"
        >
          Product Management
        </motion.h1>

        {/* ADD PRODUCT FORM */}
        <form
          onSubmit={handleCreate}
          className="bg-white shadow-md rounded-lg p-6 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Product name"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-semibold mb-2">
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="999"
                required
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-semibold mb-2">
                Stock
              </label>
              <input
                id="stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Quantity"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-semibold mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                title="Select a Category"
                aria-label="Product Category"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-md p-2"
              placeholder="Product description"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="product-image" className="block text-sm font-semibold mb-2">
              Product Image
            </label>
            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-md p-2"
            />

            {preview && (
              <div className="mt-4 w-40 h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`mt-8 font-semibold py-2 px-6 rounded-md ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {submitting ? "Adding..." : "Add Product"}
          </button>
        </form>

        {/* PRODUCT TABLE */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Stock</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 italic">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      {p.image_url ? (
                        <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                          <img
                            src={p.image_url}
                            alt={p.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">{p.name}</td>
                    <td className="py-3 px-4">Ksh {p.price}</td>
                    <td className="py-3 px-4">{p.stock}</td>
                    <td className="py-3 px-4 capitalize">{p.category || "Uncategorized"}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
