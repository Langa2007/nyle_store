"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface CategoryTableProps {
  categories: Category[];
  onDelete: (id: number) => Promise<void>;
  loading: boolean;
}

export default function CategoryTable({ categories, onDelete, loading }: CategoryTableProps) {
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
              <td className="px-6 py-3 font-medium">{cat.name}</td>
              <td className="px-6 py-3 text-right">
                <button
                  onClick={() => onDelete(cat.id)}
                  aria-label={`Delete category ${cat.name}`}
                  title={`Delete category ${cat.name}`}
                  className="text-red-600 hover:text-red-800 transition p-2 rounded-full hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
