"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Tag,
  Layers,
  Palette,
  TrendingUp
} from "lucide-react";

interface CategoryFormProps {
  initialData?: { name: string; image_url?: string } | null;
  onSubmit: (name: string, file: File | null) => Promise<void>;
  onCancel?: () => void;
}

export default function CategoryForm({ initialData, onSubmit, onCancel }: CategoryFormProps) {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setImagePreview(initialData.image_url || null);
    } else {
      setName("");
      setFile(null);
      setImagePreview(null);
    }
  }, [initialData]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (!initialData?.image_url) {
      setImagePreview(null);
    }
  }, [file, initialData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await onSubmit(name, file);
      setSuccess(true);

      // Reset form if not editing
      if (!initialData) {
        setName("");
        setFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }

      // Show success message briefly
      setTimeout(() => setSuccess(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const isEditing = !!initialData;
  const characterCount = name.length;
  const isValid = name.trim().length >= 2;
  const hasChanges = initialData ?
    (name !== initialData.name || file !== null) :
    (name.trim() !== "" || file !== null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            <Tag className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {isEditing ? 'Update Category' : 'Create New Category'}
            </h2>
            <p className="text-sm text-gray-500">
              {isEditing
                ? 'Modify category details and image'
                : 'Add a new product category to organize your inventory'
              }
            </p>
          </div>
        </div>

        {isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={16} />
            Cancel Edit
          </motion.button>
        )}
      </div>

      {/* Form Container */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-white to-gray-50/50 shadow-xl"
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20 opacity-50"></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-100 rounded-full opacity-20"></div>

        <div className="relative p-6 space-y-6">
          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl"
              >
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-emerald-800">
                    Category {isEditing ? 'updated' : 'created'} successfully!
                  </p>
                  <p className="text-sm text-emerald-600">
                    {isEditing
                      ? 'Your changes have been saved.'
                      : 'New category has been added to your inventory.'
                    }
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-6">
            {/* Left Column - Category Details */}
            <div className="space-y-6">
              {/* Category Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Tag className="w-4 h-4" />
                  Category Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Electronics, Clothing, Home Decor"
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Layers className="w-5 h-5" />
                  </div>
                </div>

                {/* Character Counter & Validation */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    {!isValid && name.length > 0 && (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span className="text-xs text-amber-600">Minimum 2 characters required</span>
                      </>
                    )}
                    {isValid && (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs text-emerald-600">Valid category name</span>
                      </>
                    )}
                  </div>
                  <span className={`text-xs ${characterCount > 50 ? 'text-amber-600' : 'text-gray-500'}`}>
                    {characterCount}/50
                  </span>
                </div>
              </div>

              {/* Stats Preview */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Category Stats</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-white rounded-lg border border-blue-100">
                    <p className="text-2xl font-bold text-blue-600">0</p>
                    <p className="text-xs text-blue-500">Products</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-blue-100">
                    <p className="text-2xl font-bold text-purple-600">0</p>
                    <p className="text-xs text-purple-500">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Palette className="w-4 h-4" />
                Category Image
                {isEditing && (
                  <span className="text-xs font-normal text-gray-500 ml-1">(Optional for updates)</span>
                )}
              </label>

              {/* Image Upload Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative cursor-pointer transition-all duration-300 rounded-2xl border-2 border-dashed ${dragOver
                    ? 'border-blue-500 bg-blue-50 scale-[1.02]'
                    : imagePreview
                      ? 'border-gray-300 hover:border-blue-400'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
                  }`}
              >
                <input title="Upload Category Image"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="p-6">
                    <div className="relative group">
                      <img
                        src={imagePreview}
                        alt="Category preview"
                        className="w-full h-48 object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Upload className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <ImageIcon className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-600">Click or drag to change image</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-10 text-center">
                    <div className="inline-flex p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-4">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="font-medium text-gray-700 mb-2">Upload Category Image</p>
                    <p className="text-sm text-gray-500 mb-4">Drag & drop or click to browse</p>
                    <p className="text-xs text-gray-400">Supports: PNG, JPG, WEBP • Max 5MB</p>
                  </div>
                )}
              </div>

              {/* Image Requirements */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs font-medium text-gray-700 mb-2">Recommended:</p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>Square ratio (1:1) works best</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>Minimum 400×400 pixels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>Use clear, high-quality images</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">
                {isEditing
                  ? 'Changes will be applied immediately'
                  : 'Category will be visible after creation'
                }
              </span>
            </div>

            <div className="flex items-center gap-3">
              {isEditing && onCancel && (
                <motion.button
                  type="button"
                  onClick={onCancel}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <X size={16} />
                  Discard Changes
                </motion.button>
              )}

              <motion.button
                type="submit"
                disabled={loading || !isValid || (!hasChanges && isEditing)}
                whileHover={{ scale: !loading && hasChanges ? 1.05 : 1 }}
                whileTap={{ scale: !loading && hasChanges ? 0.95 : 1 }}
                className={`px-8 py-3 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-3 ${loading
                    ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                    : !isValid || (!hasChanges && isEditing)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                  }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    {isEditing ? <Save size={18} /> : <Plus size={18} />}
                    {isEditing ? 'Update Category' : 'Create Category'}
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.form>
    </div>
  );
}