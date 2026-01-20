"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface CategoryFormProps {
  onCreate: (name: string, file: File | null) => Promise<void>;
}

export default function CategoryForm({ onCreate }: CategoryFormProps) {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await onCreate(name, file);
    setName("");
    setFile(null);
    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-end md:items-center gap-4 mb-10 border border-gray-100"
    >
      <div className="flex-1 w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex-1 w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="w-full border border-gray-200 rounded-lg px-4 py-1.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 mt-4 md:mt-0"
      >
        <Plus size={18} />
        {loading ? "Adding..." : "Add"}
      </button>
    </motion.form>
  );
}
