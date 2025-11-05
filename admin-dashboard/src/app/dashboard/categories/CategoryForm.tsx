"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface CategoryFormProps {
  onCreate: (name: string) => Promise<void>;
}

export default function CategoryForm({ onCreate }: CategoryFormProps) {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await onCreate(name);
    setName("");
    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 mb-10 border border-gray-100"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter new category name"
        className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        <Plus size={18} />
        {loading ? "Adding..." : "Add"}
      </button>
    </motion.form>
  );
}
