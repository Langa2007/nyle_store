// components/vendor/ProductForm.jsx
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  X, Upload, Image as ImageIcon, Package, DollarSign,
  Tag, Weight, Ruler, Truck, Hash, AlertCircle,
  Check, Loader2, Search, Plus
} from "lucide-react";
import { createVendorProduct, updateVendorProduct } from "@/services/VendorApi";


// Form validation schema
const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  price: z.number().min(0.01, "Price must be greater than 0"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  category: z.string().min(1, "Category is required"),
  sku: z.string().optional(),
  weight: z.string().optional(),
  dimensions: z.string().optional(),
  shipping_cost: z.number().min(0).optional(),
  free_shipping_threshold: z.number().optional(),
  product_type: z.enum(['simple', 'variable']).default('simple'),
  submit_for_approval: z.boolean().default(false),
  // NEW FIELDS
  original_price: z.number().optional(),
  brand: z.string().optional(),
  color: z.string().optional(),
  material: z.string().optional(),
  estimated_delivery_days: z.number().int().min(1).optional(),
  warranty_info: z.string().optional(),
  shipping_info: z.string().optional(),
  return_policy: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  features: z.array(z.string()).optional(),
  specifications: z.record(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});



export default function ProductForm({ product, onClose, onSuccess }) {
  const [mainImage, setMainImage] = useState(product?.image_url || null);
  const [galleryImages, setGalleryImages] = useState(product?.gallery_images || []);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [variants, setVariants] = useState([]);
  const [isVariable, setIsVariable] = useState(product?.product_type === 'variable');
  const specKeyRef = useRef(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      sku: "",
      weight: "",
      dimensions: "",
      shipping_cost: 0,
      product_type: "simple",
      submit_for_approval: false,
      original_price: 0,
      brand: "",
      color: "",
      material: "",
      estimated_delivery_days: 3,
      warranty_info: "",
      shipping_info: "",
      return_policy: "",
      meta_title: "",
      meta_description: "",
      features: [],
      specifications: {},
      tags: [],
    },
  });


  const handleImageUpload = async (file, type = "main") => {
    if (type === "main") {
      setMainImage(URL.createObjectURL(file));
      setValue("main_image", file); // Set the actual file object for the backend
    } else {
      setGalleryImages(prev => [...prev, URL.createObjectURL(file)]);
      // Get current gallery files and add the new one
      const currentFiles = watch("gallery_images") || [];
      setValue("gallery_images", [...currentFiles, file]);
    }
  };

  const handleRemoveImage = (index, type = "gallery") => {
    if (type === "main") {
      setMainImage(null);
      setValue("main_image", null);
    } else {
      const newPreviews = [...galleryImages];
      newPreviews.splice(index, 1);
      setGalleryImages(newPreviews);

      const currentFiles = watch("gallery_images") || [];
      const newFiles = [...currentFiles];
      newFiles.splice(index, 1);
      setValue("gallery_images", newFiles);
    }
  };


  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      let result;
      if (product) {
        result = await updateVendorProduct(product.id, {
          ...data,
          require_reapproval: data.submit_for_approval,
        });
      } else {
        result = await createVendorProduct(data);
      }

      onSuccess(result.product);
    } catch (error) {
      console.error("Failed to save product:", error);
      alert(error.response?.data?.error || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-gray-600 text-sm">
            {product ? "Update your product details" : "Fill in the details to add a new product"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6">
        <div className="space-y-8">
          {/* Basic Information */}
          <section className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  {...register("category")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Garden</option>
                  <option value="sports">Sports</option>
                  <option value="books">Books</option>
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", { valueAsNumber: true })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  {...register("stock", { valueAsNumber: true })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="mt-2 text-sm text-red-600">{errors.stock.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price ($) (Before Discount)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    {...register("original_price", { valueAsNumber: true })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  {...register("brand")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="Brand Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <input
                  {...register("color")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="Red, Blue, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material
                </label>
                <input
                  {...register("material")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="Leather, Cotton, etc."
                />
              </div>


              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
                  placeholder="Describe your product..."
                />
              </div>
            </div>
          </section>

          {/* Features & Specifications */}
          <section className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-600" />
              Features & Specifications
            </h3>

            <div className="space-y-6">
              {/* Features Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Features
                </label>
                <div className="space-y-2">
                  {(watch("features") || []).map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 outline-none"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...(watch("features") || [])];
                          newFeatures[index] = e.target.value;
                          setValue("features", newFeatures);
                        }}
                        placeholder="Feature description"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newFeatures = (watch("features") || []).filter((_, i) => i !== index);
                          setValue("features", newFeatures);
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setValue("features", [...(watch("features") || []), ""])}
                    className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>

              {/* Specifications Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Specifications
                </label>
                <div className="space-y-2">
                  {Object.entries(watch("specifications") || {}).map(([key, value], index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 outline-none font-medium bg-gray-50"
                        value={key}
                        readOnly
                      />
                      <input
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 outline-none"
                        value={value}
                        onChange={(e) => {
                          const newSpecs = { ...(watch("specifications") || {}) };
                          newSpecs[key] = e.target.value;
                          setValue("specifications", newSpecs);
                        }}
                        placeholder="Value (e.g. 5000mAh)"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newSpecs = { ...(watch("specifications") || {}) };
                          delete newSpecs[key];
                          setValue("specifications", newSpecs);
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                    <input
                      ref={specKeyRef}
                      className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 outline-none text-sm"
                      placeholder="Property (e.g. RAM)"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const key = specKeyRef.current?.value.trim();
                        if (key) {
                          const newSpecs = { ...(watch("specifications") || {}) };
                          newSpecs[key] = "";
                          setValue("specifications", newSpecs);
                          if (specKeyRef.current) specKeyRef.current.value = "";
                        }
                      }}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100"
                    >
                      Add Property
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* Images */}
          <section className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              Product Images
            </h3>

            <div className="space-y-6">
              {/* Main Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Image *
                </label>
                <div className="flex items-center gap-4">
                  {mainImage ? (
                    <div className="relative group">
                      <img
                        src={mainImage}
                        alt="Main"
                        className="w-32 h-32 rounded-lg object-cover border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(0, "main")}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-500 mt-2">Upload</span>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0], "main")}
                      />
                    </label>
                  )}
                  <div className="text-sm text-gray-500">
                    <p>• Recommended: 800x800px</p>
                    <p>• Format: JPG, PNG, WebP</p>
                    <p>• Max size: 10MB</p>
                  </div>
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Images
                </label>
                <div className="flex flex-wrap gap-4">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-24 h-24 rounded-lg object-cover border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {galleryImages.length < 10 && (
                    <label className="cursor-pointer">
                      <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition">
                        <Plus className="w-6 h-6 text-gray-400" />
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0], "gallery")}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Additional Details */}
          <section className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-blue-600" />
              Additional Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU (Stock Keeping Unit)
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("sku")}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="SKU-001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("weight")}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="0.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dimensions (L×W×H)
                </label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("dimensions")}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="10×5×2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Cost ($)
                </label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    {...register("shipping_cost", { valueAsNumber: true })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Warranty Information
                </label>
                <input
                  {...register("warranty_info")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="1 year manufacturer warranty"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Policy
                </label>
                <input
                  {...register("return_policy")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="30 days return policy"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Delivery (Days)
                </label>
                <input
                  type="number"
                  {...register("estimated_delivery_days", { valueAsNumber: true })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="3"
                />
              </div>
            </div>
          </section>

          {/* SEO Metadata */}
          <section className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              SEO & Metadata
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  {...register("meta_title")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="SEO optimized title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  {...register("meta_description")}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
                  placeholder="Detailed meta description for search engines"
                />
              </div>
            </div>
          </section>


          {/* Submission Options */}
          <section className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Submission Options</h3>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("submit_for_approval")}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <div>
                  <div className="font-medium text-gray-800">Submit for Approval</div>
                  <p className="text-sm text-gray-600">
                    Submit this product for admin review. If unchecked, product will be saved as draft.
                  </p>
                </div>
              </label>

              {product?.status === 'approved' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-yellow-800 mb-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Note:</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    This product is already approved. Making changes will require re-approval from admin.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </form>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 flex items-center justify-between bg-gray-50">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setValue("submit_for_approval", false);
              handleSubmit(onSubmit)();
            }}
            disabled={submitting}
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save as Draft"}
          </button>

          <button
            type="submit"
            onClick={() => {
              setValue("submit_for_approval", true);
              handleSubmit(onSubmit)();
            }}
            disabled={submitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                {product ? "Update Product" : "Submit for Approval"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
