"use client";

import { motion } from "framer-motion";
import { Trash2, Pencil } from "lucide-react";

export interface Category {
  id: number;
  name: string;
  image_url?: string;
}

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => Promise<void>;
  loading: boolean;
}

export default function CategoryTable({ categories, onEdit, onDelete, loading }: CategoryTableProps) {
  if (loading) {
    return <div className="text-center text-gray-500 py-10">Loading categories...</div>;
  }

  if (categories.length === 0) {
    return <div className="text-center text-gray-500 py-10">No categories found. Add one above.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100"
    >
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr
              key={cat.id}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-t border-gray-100`}
            >
              <td className="px-6 py-3">{cat.id}</td>
              <td className="px-6 py-3">
                {cat.image_url ? (
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    className="w-10 h-10 object-cover rounded-md border border-gray-200"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
                    No Img
                  </div>
                )}
              </td>
              <td className="px-6 py-3 font-medium">{cat.name}</td>
              <td className="px-6 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(cat)}
                    aria-label={`Edit category ${cat.name}`}
                    title={`Edit category ${cat.name}`}
                    className="text-blue-600 hover:text-blue-800 transition p-2 rounded-full hover:bg-blue-50"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(cat.id)}
                    aria-label={`Delete category ${cat.name}`}
                    title={`Delete category ${cat.name}`}
                    className="text-red-600 hover:text-red-800 transition p-2 rounded-full hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
