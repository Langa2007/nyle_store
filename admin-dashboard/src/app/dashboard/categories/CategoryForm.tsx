"use client";

import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Save, X } from "lucide-react";

interface CategoryFormProps {
  initialData?: { name: string; image_url?: string } | null;
  onSubmit: (name: string, file: File | null) => Promise<void>;
  onCancel?: () => void;
}

export default function CategoryForm({ initialData, onSubmit, onCancel }: CategoryFormProps) {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    } else {
      setName("");
      setFile(null);
    }
  }, [initialData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await onSubmit(name, file);
    if (!initialData) {
      setName("");
      setFile(null);
    }
    setLoading(false);
  };

  const isEditing = !!initialData;

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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isEditing ? "New Image (Optional)" : "Image"}
        </label>
        <div className="flex gap-2 items-center">
          {isEditing && initialData?.image_url && (
            <img src={initialData.image_url} alt="Current" className="w-10 h-10 rounded border object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full border border-gray-200 rounded-lg px-4 py-1.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
          >
            <X size={18} />
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isEditing ? <Save size={18} /> : <Plus size={18} />}
          {loading ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update" : "Add")}
        </button>
      </div>
    </motion.form>
  );
}
