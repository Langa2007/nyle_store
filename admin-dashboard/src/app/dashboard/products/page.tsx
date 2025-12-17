// admin-dashboard/src/app/dashboard/products/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import AdminLayout from "@/app/components/AdminLayout";
import { 
  FaPlus, FaTrash, FaImage, FaTruck, 
  FaBox, FaTag, FaWarehouse, FaBuilding,
  FaChevronDown, FaChevronUp, FaSave,
  FaPalette, FaRuler, FaWeightHanging
} from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  category?: string;
  vendor_name?: string;
  vendor_id?: number;
  sku?: string;
  weight?: number;
  dimensions?: string;
  shipping_cost?: number;
}

interface Vendor {
  id: number;
  legal_name: string;
  business_email: string;
  business_type?: string;
}

interface Category {
  id: number;
  name: string;
}

interface ProductVariant {
  id?: number;
  sku: string;
  price: string;
  stock: string;
  attributes: {
    size?: string;
    color?: string;
    material?: string;
  };
  image_url?: string;
}

const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://nyle-store.onrender.com";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [showVendorForm, setShowVendorForm] = useState<boolean>(false);
  const [showVariants, setShowVariants] = useState<boolean>(false);
  const [variants, setVariants] = useState<ProductVariant[]>([
    { sku: `SKU-${Date.now()}-1`, price: "", stock: "", attributes: {} }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "0",
    category: "",
    vendor_id: "",
    sku: `PROD-${Date.now()}`,
    weight: "",
    dimensions: "",
    shipping_cost: "",
    free_shipping_threshold: "",
    product_type: "simple"
  });

  const [vendorForm, setVendorForm] = useState({
    legal_name: "",
    business_email: "",
    phone: "",
    business_address: "",
    tax_id: "",
    business_type: "individual",
    shipping_policy: "",
    return_policy: ""
  });

  // Fetch products, vendors, categories
  useEffect(() => {
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      
      // Fetch products and categories first
      const [prodRes, catRes] = await Promise.all([
        fetch(`${baseurl}/api/admin/products`, { credentials: "include" }),
        fetch(`${baseurl}/api/admin/categories`, { credentials: "include" })
      ]);

      const [prodData, catData] = await Promise.all([
        prodRes.ok ? prodRes.json() : [],
        catRes.ok ? catRes.json() : []
      ]);

      setProducts(prodData);
      setCategories(catData);

      // Then fetch vendors separately (important for forms)
      fetchVendors();
      
    } catch (err) {
      toast.error("Failed to load products and categories");
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await fetch(`${baseurl}/api/admin/vendors`, {
        credentials: "include",
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      if (res.ok) {
        const vendorData = await res.json();
        setVendors(vendorData);
        
        // Show success message
        if (vendorData.length > 0) {
          toast.success(`Loaded ${vendorData.length} vendors`);
        }
      }
    } catch (err) {
      console.error("Vendor fetch error:", err);
      toast.warning("Could not load vendor list");
    }
  };

  fetchInitialData();
}, [baseurl]);

  // Handle image uploads
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedFiles.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setSelectedFiles(prev => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Auto-generate SKU when name changes
    if (name === 'name' && !formData.sku.startsWith('PROD-')) {
      const skuBase = value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 8);
      setFormData(prev => ({
        ...prev,
        sku: skuBase ? `${skuBase}-${Date.now().toString().slice(-4)}` : `PROD-${Date.now()}`
      }));
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVendorFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setVendorForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Vendor management
  const handleCreateVendor = async () => {
    if (!vendorForm.legal_name || !vendorForm.business_email) {
      toast.error("Legal name and business email are required");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(vendorForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await fetch(`${baseurl}/api/admin/vendors`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Vendor created successfully");
        setVendors(prev => [...prev, data]);
        setFormData(prev => ({ ...prev, vendor_id: data.id.toString() }));
        setShowVendorForm(false);
        setVendorForm({
          legal_name: "",
          business_email: "",
          phone: "",
          business_address: "",
          tax_id: "",
          business_type: "individual",
          shipping_policy: "",
          return_policy: ""
        });
      } else {
        toast.error(data.error || "Failed to create vendor");
      }
    } catch (err: any) {
      toast.error("Error creating vendor: " + err.message);
    }
  };

  // Variant management
  const addVariant = () => {
    setVariants(prev => [
      ...prev,
      { 
        sku: `VAR-${Date.now()}-${prev.length + 1}`, 
        price: "", 
        stock: "", 
        attributes: {} 
      }
    ]);
  };

  const removeVariant = (index: number) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: string, value: string) => {
    setVariants(prev => prev.map((variant, i) => {
      if (i === index) {
        if (field.startsWith('attributes.')) {
          const attrField = field.split('.')[1];
          return {
            ...variant,
            attributes: { ...variant.attributes, [attrField]: value }
          };
        }
        return { ...variant, [field]: value };
      }
      return variant;
    }));
  };

  // CREATE product with vendor and variants
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, price, vendor_id } = formData;
    if (!name || !price || !vendor_id) {
      toast.error("Name, price, and vendor are required");
      return;
    }

    setSubmitting(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    // Add main image
    if (selectedFiles[0]) {
      form.append("main_image", selectedFiles[0]);
    }

    // Add gallery images
    selectedFiles.slice(1).forEach((file, index) => {
      form.append("gallery_images", file);
    });

    // Add variants if any
    if (showVariants && variants.length > 0) {
      const validVariants = variants.filter(v => v.price && v.stock);
      if (validVariants.length > 0) {
        form.append("variant_data", JSON.stringify(validVariants));
      }
    }

    try {
      const res = await fetch(`${baseurl}/api/admin/products`, {
        method: "POST",
        body: form,
        credentials: "include"
      });

      const data = await res.json();

      if (res.ok) {
        setProducts(prev => [data, ...prev]);
        toast.success("Product created successfully!");

        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "0",
          category: "",
          vendor_id: "",
          sku: `PROD-${Date.now()}`,
          weight: "",
          dimensions: "",
          shipping_cost: "",
          free_shipping_threshold: "",
          product_type: "simple"
        });
        setSelectedFiles([]);
        setPreviews([]);
        setVariants([{ sku: `SKU-${Date.now()}-1`, price: "", stock: "", attributes: {} }]);
        setShowVariants(false);
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
        credentials: "include"
      });

      const data = await res.json();

      if (res.ok) {
        setProducts(prev => prev.filter((p) => p.id !== id));
        toast.success("Product deleted");
      } else {
        toast.error(data.error || "Failed to delete product");
      }
    } catch (err) {
      toast.error("Delete error");
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Manage Products">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Product Management">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-2">Add and manage products with vendor associations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: CREATE PRODUCT FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <FaPlus className="mr-2 text-blue-600" />
                  Create New Product
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Auto-save SKU: {formData.sku}
                </span>
              </div>

              <form onSubmit={handleCreate}>
                {/* Product Basics Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FaTag className="mr-2 text-blue-600" />
                    Product Basics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (KES) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Ksh</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category" title="Product Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Initial Stock
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Detailed product description..."
                    />
                  </div>
                </div>

                {/* Vendor Selection Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <FaBuilding className="mr-2 text-green-600" />
                      Vendor Information
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowVendorForm(!showVendorForm)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      {showVendorForm ? (
                        <>
                          <FaChevronUp className="mr-1" />
                          Hide New Vendor Form
                        </>
                      ) : (
                        <>
                          <FaPlus className="mr-1" />
                          Create New Vendor
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Vendor *
                    </label>
                    <select
                      name="vendor_id" title="Select Vendor"
                      value={formData.vendor_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Choose a vendor...</option>
                      {vendors.map((vendor) => (
                        <option key={vendor.id} value={vendor.id}>
                          {vendor.legal_name} ({vendor.business_email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <AnimatePresence>
                    {showVendorForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                      >
                        <h4 className="font-medium text-gray-900 mb-4">New Vendor Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="legal_name"
                            placeholder="Legal Business Name *"
                            value={vendorForm.legal_name}
                            onChange={handleVendorFormChange}
                            className="px-4 py-2 border rounded"
                            required
                          />
                          <input
                            type="email"
                            name="business_email"
                            placeholder="Business Email *"
                            value={vendorForm.business_email}
                            onChange={handleVendorFormChange}
                            className="px-4 py-2 border rounded"
                            required
                          />
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={vendorForm.phone}
                            onChange={handleVendorFormChange}
                            className="px-4 py-2 border rounded"
                          />
                          <input
                            type="text"
                            name="tax_id"
                            placeholder="Tax ID/VAT Number"
                            value={vendorForm.tax_id}
                            onChange={handleVendorFormChange}
                            className="px-4 py-2 border rounded"
                          />
                          <select
                            name="business_type" title="seller business type"
                            value={vendorForm.business_type}
                            onChange={handleVendorFormChange}
                            className="px-4 py-2 border rounded"
                          >
                            <option value="individual">Individual</option>
                            <option value="llc">LLC</option>
                            <option value="corporation">Corporation</option>
                            <option value="partnership">Partnership</option>
                          </select>
                          <textarea
                            name="business_address"
                            placeholder="Business Address"
                            value={vendorForm.business_address}
                            onChange={handleVendorFormChange}
                            rows={2}
                            className="px-4 py-2 border rounded md:col-span-2"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleCreateVendor}
                          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                          Create Vendor
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Details Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FaBox className="mr-2 text-purple-600" />
                    Product Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaWeightHanging className="mr-2 text-gray-400" />
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.5"
                        step="0.01"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaRuler className="mr-2 text-gray-400" />
                        Dimensions
                      </label>
                      <input
                        type="text"
                        name="dimensions"
                        value={formData.dimensions}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="10x5x3 cm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Type
                      </label>
                      <select
                        name="product_type" title="Product Type"
                        value={formData.product_type}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChangeCapture={(e) => {
                          const value = (e.target as HTMLSelectElement).value;
                          setShowVariants(value === 'variable');
                        }}
                      >
                        <option value="simple">Simple Product</option>
                        <option value="variable">Variable Product (with variants)</option>
                        <option value="digital">Digital Product</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Variants Section */}
                <AnimatePresence>
                  {showVariants && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                          <FaPalette className="mr-2 text-pink-600" />
                          Product Variants
                        </h3>
                        <button
                          type="button"
                          onClick={addVariant}
                          className="text-sm bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center"
                        >
                          <FaPlus className="mr-2" />
                          Add Variant
                        </button>
                      </div>

                      <div className="space-y-4">
                        {variants.map((variant, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-medium text-gray-700">
                                Variant #{index + 1}
                              </span>
                              {variants.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeVariant(index)} title="Remove Variant"
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <FaTrash />
                                </button>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <input
                                type="text"
                                value={variant.sku}
                                onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                                placeholder="SKU"
                                className="px-3 py-2 border rounded"
                              />
                              <input
                                type="number"
                                value={variant.price}
                                onChange={(e) => updateVariant(index, 'price', e.target.value)}
                                placeholder="Price"
                                className="px-3 py-2 border rounded"
                              />
                              <input
                                type="number"
                                value={variant.stock}
                                onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                                placeholder="Stock"
                                className="px-3 py-2 border rounded"
                              />
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={variant.attributes.size || ''}
                                  onChange={(e) => updateVariant(index, 'attributes.size', e.target.value)}
                                  placeholder="Size"
                                  className="flex-1 px-3 py-2 border rounded"
                                />
                                <input
                                  type="text"
                                  value={variant.attributes.color || ''}
                                  onChange={(e) => updateVariant(index, 'attributes.color', e.target.value)}
                                  placeholder="Color"
                                  className="flex-1 px-3 py-2 border rounded"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Shipping Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FaTruck className="mr-2 text-orange-600" />
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipping Cost (KES)
                      </label>
                      <input
                        type="number"
                        name="shipping_cost"
                        value={formData.shipping_cost}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Leave as 0 for free shipping
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Free Shipping Threshold (KES)
                      </label>
                      <input
                        type="number"
                        name="free_shipping_threshold"
                        value={formData.free_shipping_threshold}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="5000"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Order amount to qualify for free shipping
                      </p>
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FaImage className="mr-2 text-indigo-600" />
                    Product Images
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      id="product-images"
                    />
                    <label htmlFor="product-images" className="cursor-pointer block">
                      <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <FaImage className="text-indigo-600 text-xl" />
                      </div>
                      <p className="text-gray-600 mb-2">
                        Click to upload product images
                      </p>
                      <p className="text-sm text-gray-500">
                        Upload up to 5 images. First image will be the main product image.
                      </p>
                    </label>
                    
                    {previews.length > 0 && (
                      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {previews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            {index === 0 && (
                              <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                Main
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeImage(index)} title="Remove Image"
                              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-lg flex items-center justify-center ${
                      submitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg"
                    } transition-all`}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Creating Product...
                      </>
                    ) : (
                      <>
                        <FaSave className="mr-3" />
                        Create Product
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: PRODUCT LIST */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <FaWarehouse className="mr-2 text-gray-600" />
                  Products ({products.length})
                </h2>
                <span className="text-sm text-gray-500">
                  Total: {products.length}
                </span>
              </div>

              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                {products.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FaBox className="text-4xl mx-auto mb-3 text-gray-300" />
                    <p>No products yet</p>
                    <p className="text-sm mt-1">Create your first product</p>
                  </div>
                ) : (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <FaBox />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Ksh {product.price.toLocaleString()}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              Stock: {product.stock}
                            </span>
                            <span className="text-xs text-gray-500">
                              {product.vendor_name || 'No vendor'}
                            </span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete product"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Recent Activity</span>
                  <span className="text-blue-600 font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  All products are linked to their respective vendors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}