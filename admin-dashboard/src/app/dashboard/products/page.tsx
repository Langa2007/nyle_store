"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import AdminLayout from "@/app/components/AdminLayout";
import {
  FaPlus, FaTrash, FaImage, FaTruck,
  FaBox, FaTag, FaWarehouse, FaBuilding,
  FaChevronDown, FaChevronUp, FaSave,
  FaPalette, FaRuler, FaWeightHanging,
  FaStar, FaAward, FaShippingFast,
  FaClipboardList, FaTags, FaInfoCircle,
  FaShieldAlt, FaUndo, FaBolt,
  FaPercent, FaCalendarAlt, FaHashtag
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
  // New fields
  original_price?: number;
  features?: string[];
  warranty_info?: string;
  shipping_info?: string;
  return_policy?: string;
  specifications?: Record<string, string>;
  tags?: string[];
  brand?: string;
  color?: string;
  material?: string;
  estimated_delivery_days?: number;
  is_featured?: boolean;
  is_bestseller?: boolean;
  is_hot_deal?: boolean;
  rating?: number;
  review_count?: number;
}

interface Vendor {
  id: number;
  legal_name: string;
  email: string;
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
    [key: string]: string | undefined;
  };
  image_url?: string;
}

const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://nyle-store.onrender.com";

const getAdminAuthHeaders = (): HeadersInit => {
  return {};
};

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminProductsContent />
    </Suspense>
  );
}

function AdminProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get("edit");
  const [products, setProducts] = useState<Product[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [showVendorForm, setShowVendorForm] = useState<boolean>(false);
  const [showVariants, setShowVariants] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [variants, setVariants] = useState<ProductVariant[]>([
    { sku: `VAR-${Date.now()}-1`, price: "", stock: "", attributes: {} }
  ]);
  const [features, setFeatures] = useState<string[]>([""]);
  const [specs, setSpecs] = useState<Array<{ key: string, value: string }>>([{ key: "", value: "" }]);
  const [tags, setTags] = useState<string[]>([""]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Hot Deals & Deletion Flow State
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [deleteReason, setDeleteReason] = useState<string>("");
  const [viewAllVendors, setViewAllVendors] = useState<boolean>(false);


  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    description: "",
    price: "",
    stock: "0",
    category: "",
    vendor_id: "",
    sku: `PROD-${Date.now()}`,

    // Product Details
    weight: "",
    dimensions: "",
    brand: "",
    color: "",
    material: "",

    // Shipping
    shipping_cost: "",
    free_shipping_threshold: "",
    estimated_delivery_days: "3",
    shipping_info: "",

    // Policies
    warranty_info: "",
    return_policy: "",

    // Pricing
    original_price: "",

    // SEO & Meta
    meta_title: "",
    meta_description: "",

    // Flags
    product_type: "simple",
    is_featured: "false",
    is_bestseller: "false",
    is_hot_deal: "false",
    rating: "0",
    review_count: "0"
  });

  const [vendorForm, setVendorForm] = useState({
    legal_name: "",
    email: "",
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

        const [prodRes, catRes] = await Promise.all([
          fetch(`${baseurl}/api/admin/products`, { 
            headers: getAdminAuthHeaders(),
            credentials: "include" 
          }),
          fetch(`${baseurl}/api/admin/categories`, { 
            headers: getAdminAuthHeaders(),
            credentials: "include" 
          })
        ]);

        const [prodData, catData] = await Promise.all([
          prodRes.ok ? prodRes.json() : [],
          catRes.ok ? catRes.json() : []
        ]);

        setProducts(prodData);
        setCategories(catData);
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
          headers: getAdminAuthHeaders(),
          credentials: "include"
        });

        if (res.ok) {
          const vendorData = await res.json();
          setVendors(vendorData);
        }
      } catch (err) {
        console.error("Vendor fetch error:", err);
        toast.warning("Could not load vendor list");
      }
    };

    fetchInitialData();
  }, [baseurl]);

  // Handle edit mode from query param
  useEffect(() => {
    if (editId && products.length > 0) {
      const productToEdit = products.find(p => p.id === parseInt(editId));
      if (productToEdit) {
        handleEditClick(productToEdit);
      }
    }
  }, [editId, products]);

  // Handle image uploads
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedFiles.length > 10) {
      toast.error("Maximum 10 images allowed");
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

  // Features management
  const addFeature = () => {
    setFeatures(prev => [...prev, ""]);
  };

  const updateFeature = (index: number, value: string) => {
    setFeatures(prev => prev.map((feature, i) => i === index ? value : feature));
  };

  const removeFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  // Specifications management
  const addSpec = () => {
    setSpecs(prev => [...prev, { key: "", value: "" }]);
  };

  const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
    setSpecs(prev => prev.map((spec, i) => i === index ? { ...spec, [field]: value } : spec));
  };

  const removeSpec = (index: number) => {
    setSpecs(prev => prev.filter((_, i) => i !== index));
  };

  // Tags management
  const addTag = () => {
    setTags(prev => [...prev, ""]);
  };

  const updateTag = (index: number, value: string) => {
    setTags(prev => prev.map((tag, i) => i === index ? value : tag));
  };

  const removeTag = (index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  // Vendor management
  const handleCreateVendor = async () => {
    if (!vendorForm.legal_name || !vendorForm.email) {
      toast.error("Legal name and email are required");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(vendorForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await fetch(`${baseurl}/api/admin/vendors/create-or-select`, {
        method: "POST",
        body: formData,
        headers: getAdminAuthHeaders(),
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
          email: "",
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

  // CREATE product with all fields
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

    // Add arrays and objects
    const validFeatures = features.filter(f => f.trim());
    if (validFeatures.length > 0) {
      form.append("features", JSON.stringify(validFeatures));
    }

    const validSpecs = specs.filter(s => s.key.trim() && s.value.trim());
    if (validSpecs.length > 0) {
      const specsObj = validSpecs.reduce((acc, spec) => {
        acc[spec.key] = spec.value;
        return acc;
      }, {} as Record<string, string>);
      form.append("specifications", JSON.stringify(specsObj));
    }

    const validTags = tags.filter(t => t.trim());
    if (validTags.length > 0) {
      form.append("tags", JSON.stringify(validTags));
    }

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
        headers: getAdminAuthHeaders(),
        credentials: "include"
      });

      const data = await res.json();

      if (res.ok) {
        setProducts(prev => [data, ...prev]);
        toast.success("Product created successfully!");

        // Reset form
        resetForm();
      } else {
        toast.error(data.error || "Failed to create product");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsEditing(true);

    // Populate form data
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category || "",
      vendor_id: product.vendor_id?.toString() || "",
      sku: product.sku || `PROD-${Date.now()}`,
      weight: product.weight?.toString() || "",
      dimensions: product.dimensions || "",
      brand: product.brand || "",
      color: product.color || "",
      material: product.material || "",
      shipping_cost: product.shipping_cost?.toString() || "",
      free_shipping_threshold: "", // Add if needed
      estimated_delivery_days: product.estimated_delivery_days?.toString() || "3",
      shipping_info: product.shipping_info || "",
      warranty_info: product.warranty_info || "",
      return_policy: product.return_policy || "",
      original_price: product.original_price?.toString() || "",
      meta_title: "",
      meta_description: "",
      product_type: "simple",
      is_featured: product.is_featured ? 'true' : 'false',
      is_bestseller: product.is_bestseller ? 'true' : 'false',
      is_hot_deal: product.is_hot_deal ? 'true' : 'false',
      rating: product.rating?.toString() || "0",
      review_count: product.review_count?.toString() || "0"
    });

    if (product.features) setFeatures(product.features);
    if (product.tags) setTags(product.tags);
    if (product.specifications) {
      const specArray = Object.entries(product.specifications).map(([key, value]) => ({ key, value }));
      setSpecs(specArray.length > 0 ? specArray : [{ key: "", value: "" }]);
    }

    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setSubmitting(true);
    const form = new FormData();

    // Important: The backend PUT /products/:id uses productUpload.single("image")
    // We should probably generalize the backend to match the create route eventually,
    // but for now we follow the existing route's expectation if possible, or update the route.

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) form.append(key, value);
    });

    form.append("features", JSON.stringify(features.filter(f => f.trim())));
    form.append("tags", JSON.stringify(tags.filter(t => t.trim())));

    const specsObj = specs.filter(s => s.key.trim() && s.value.trim()).reduce((acc, spec) => {
      acc[spec.key] = spec.value;
      return acc;
    }, {} as Record<string, string>);
    form.append("specifications", JSON.stringify(specsObj));

    if (selectedFiles[0]) {
      form.append("image", selectedFiles[0]);
    }

    try {
      const res = await fetch(`${baseurl}/api/admin/products/${editingProduct.id}`, {
        method: "PUT",
        body: form,
        headers: getAdminAuthHeaders(),
        credentials: "include"
      });

      if (res.ok) {
        const updated = await res.json();
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? updated : p));
        toast.success("Product updated successfully!");
        resetForm();
      } else {
        const errData = await res.json();
        toast.error(errData.error || "Failed to update product");
      }
    } catch (err: any) {
      toast.error("Update error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };


  const resetForm = () => {
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
      brand: "",
      color: "",
      material: "",
      shipping_cost: "",
      free_shipping_threshold: "",
      estimated_delivery_days: "3",
      shipping_info: "",
      warranty_info: "",
      return_policy: "",
      original_price: "",
      meta_title: "",
      meta_description: "",
      product_type: "simple",
      is_featured: "false",
      is_bestseller: "false",
      is_hot_deal: "false",
      rating: "0",
      review_count: "0"
    });
    setSelectedFiles([]);
    setPreviews([]);
    setVariants([{ sku: `VAR-${Date.now()}-1`, price: "", stock: "", attributes: {} }]);
    setFeatures([""]);
    setSpecs([{ key: "", value: "" }]);
    setTags([""]);
    setShowVariants(false);
    setShowAdvanced(false);
    setIsEditing(false);
    setEditingProduct(null);
  };


  // TOGGLE hot deal
  const toggleHotDeal = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`${baseurl}/api/admin/products/${id}/toggle-hot-deal`, {
        method: "PUT",
        headers: {
          ...getAdminAuthHeaders(),
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ is_hot_deal: !currentStatus })
      });

      if (res.ok) {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, is_hot_deal: !currentStatus } : p));
        toast.success(`Product ${!currentStatus ? 'marked as Hot Deal' : 'removed from Hot Deals'}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  // DELETE flow
  const handleDeleteInitiate = (id: number) => {
    setProductToDelete(id);
    setDeleteReason("");
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    if (!deleteReason) {
      toast.error("Please provide a reason for deletion");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${baseurl}/api/admin/products/${productToDelete}`, {
        method: "DELETE",
        headers: {
          ...getAdminAuthHeaders(),
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ reason: deleteReason })
      });

      const data = await res.json();

      if (res.ok) {
        setProducts(prev => prev.filter((p) => p.id !== productToDelete));
        toast.success("Product deleted and vendor notified");
        setShowDeleteModal(false);
        setProductToDelete(null);
      } else {
        toast.error(data.error || "Failed to delete product");
      }
    } catch (err) {
      toast.error("An error occurred during deletion");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <p className="text-gray-600 mt-2">Create unique products with detailed specifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: CREATE PRODUCT FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <FaPlus className="mr-2 text-blue-600" />
                  {isEditing ? `Editing: ${editingProduct?.name}` : "Create Unique Product"}
                </h2>

                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  {showAdvanced ? (
                    <>
                      <FaChevronUp className="mr-1" />
                      Hide Advanced
                    </>
                  ) : (
                    <>
                      <FaChevronDown className="mr-1" />
                      Show Advanced
                    </>
                  )}
                </button>
              </div>

              <form onSubmit={isEditing ? handleUpdate : handleCreate}>

                {/* Product Basics Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FaTag className="mr-2 text-blue-600" />
                    Basic Information
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
                        Original Price (KES)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Ksh</span>
                        <input
                          type="number"
                          name="original_price"
                          value={formData.original_price}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="For discounts"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select title="Select Category"
                        name="category"
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
                        Brand
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Brand name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SKU
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Auto-generated"
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
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Detailed product description..."
                    />
                  </div>
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
                      <select title="Select Product Type"
                        name="product_type"
                        value={formData.product_type}
                        onChange={(e) => {
                          handleChange(e);
                          setShowVariants(e.target.value === 'variable');
                        }}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="simple">Simple Product</option>
                        <option value="variable">Variable Product (with variants)</option>
                        <option value="digital">Digital Product</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color
                      </label>
                      <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Black, Red, Blue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Material
                      </label>
                      <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Cotton, Leather, Plastic"
                      />
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
                </div>

                {/* Features Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FaBolt className="mr-2 text-yellow-600" />
                    Key Features
                  </h3>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder={`Feature ${index + 1}`}
                        />
                        {features.length > 1 && (
                          <button title="remove feature"
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <FaTrash />
                          </button>
                        )}
                        {index === features.length - 1 && (
                          <button title="addFeature"
                            type="button"
                            onClick={addFeature}
                            className="text-green-600 hover:text-green-800 p-2"
                          >
                            <FaPlus />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FaClipboardList className="mr-2 text-green-600" />
                    Specifications
                  </h3>
                  <div className="space-y-3">
                    {specs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={spec.key}
                          onChange={(e) => updateSpec(index, 'key', e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Key (e.g., Processor)"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => updateSpec(index, 'value', e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Value (e.g., Intel i7)"
                        />
                        {specs.length > 1 && (
                          <button title="remove specifications"
                            type="button"
                            onClick={() => removeSpec(index)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <FaTrash />
                          </button>
                        )}
                        {index === specs.length - 1 && (
                          <button title="Add Specification"
                            type="button"
                            onClick={addSpec}
                            className="text-green-600 hover:text-green-800 p-2"
                          >
                            <FaPlus />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FaTags className="mr-2 text-purple-600" />
                    Tags
                  </h3>
                  <div className="space-y-3">
                    {tags.map((tag, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => updateTag(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder={`Tag ${index + 1}`}
                        />
                        {tags.length > 1 && (
                          <button title="Remove Tag"
                            type="button"
                            onClick={() => removeTag(index)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <FaTrash />
                          </button>
                        )}
                        {index === tags.length - 1 && (
                          <button title="Add Tag"
                            type="button"
                            onClick={addTag}
                            className="text-green-600 hover:text-green-800 p-2"
                          >
                            <FaPlus />
                          </button>
                        )}
                      </div>
                    ))}
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
                                <button title="Remove Variant"
                                  type="button"
                                  onClick={() => removeVariant(index)}
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
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        Estimated Delivery (Days)
                      </label>
                      <input
                        type="number"
                        name="estimated_delivery_days"
                        value={formData.estimated_delivery_days}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="3"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaShippingFast className="mr-2 text-gray-400" />
                        Shipping Info
                      </label>
                      <input
                        type="text"
                        name="shipping_info"
                        value={formData.shipping_info}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Free shipping nationwide"
                      />
                    </div>
                  </div>
                </div>

                {/* Policies Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FaShieldAlt className="mr-2 text-blue-600" />
                    Policies & Warranty
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaShieldAlt className="mr-2 text-gray-400" />
                        Warranty Information
                      </label>
                      <input
                        type="text"
                        name="warranty_info"
                        value={formData.warranty_info}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 1-year warranty"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaUndo className="mr-2 text-gray-400" />
                        Return Policy
                      </label>
                      <input
                        type="text"
                        name="return_policy"
                        value={formData.return_policy}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 30-day return policy"
                      />
                    </div>
                  </div>
                </div>

                {/* Vendor Selection Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <FaBuilding className="mr-2 text-green-600" />
                      Vendor Information *
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
                    <select title="Select existing vendor"
                      name="vendor_id"
                      value={formData.vendor_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Choose a vendor...</option>
                      {vendors.map((vendor) => (
                        <option key={vendor.id} value={vendor.id}>
                          {vendor.legal_name} ({vendor.email})
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
                            name="email"
                            placeholder="vendor@example.com"
                            value={vendorForm.email}
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
                          <select title="Business type"
                            name="business_type"
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

                {/* Advanced Options */}
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8"
                    >
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <FaInfoCircle className="mr-2 text-gray-600" />
                        Advanced Options
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name="is_featured"
                              checked={formData.is_featured === 'true'}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                is_featured: e.target.checked ? 'true' : 'false'
                              }))}
                              className="rounded"
                            />
                            <span className="text-gray-700 flex items-center">
                              <FaStar className="mr-2 text-yellow-500" />
                              Featured Product
                            </span>
                          </label>
                        </div>

                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name="is_bestseller"
                              checked={formData.is_bestseller === 'true'}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                is_bestseller: e.target.checked ? 'true' : 'false'
                              }))}
                              className="rounded"
                            />
                            <span className="text-gray-700 flex items-center">
                              <FaAward className="mr-2 text-green-500" />
                              Best Seller
                            </span>
                          </label>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating (0-5)
                          </label>
                          <input title="Average product rating"
                            type="number"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                            min="0"
                            max="5"
                            step="0.1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Review Count
                          </label>
                          <input title="Number of reviews"
                            type="number"
                            name="review_count"
                            value={formData.review_count}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                            min="0"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meta Title (SEO)
                          </label>
                          <input
                            type="text"
                            name="meta_title"
                            value={formData.meta_title}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                            placeholder="For search engines"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meta Description (SEO)
                          </label>
                          <textarea
                            name="meta_description"
                            value={formData.meta_description}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                            placeholder="For search engines"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
                        Upload up to 10 images. First image will be the main product image.
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
                            <button title="Remove image"
                              type="button"
                              onClick={() => removeImage(index)}
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
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-lg flex items-center justify-center ${submitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg"
                      } transition-all`}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        {isEditing ? "Updating Product..." : "Creating Product..."}
                      </>
                    ) : (
                      <>
                        <FaSave className="mr-3" />
                        {isEditing ? "Update Product" : "Create Unique Product"}
                      </>
                    )}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full mt-3 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: ACTION CARDS */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6 space-y-6">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h2 className="text-xl font-semibold flex items-center text-blue-900 mb-2">
                  <FaWarehouse className="mr-2 text-blue-600" />
                  Inventory Management
                </h2>
                <p className="text-sm text-blue-700 mb-4">
                  View and manage all products, including hot deals, stock levels, and vendor assignments in a distraction-free view.
                </p>
                <button
                  onClick={() => router.push("/dashboard/products/all")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-lg shadow-blue-500/20 flex items-center justify-center"
                >
                  <FaBox className="mr-2" />
                  Show All Products
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <FaInfoCircle className="mr-2 text-gray-500" />
                  Quick Tips
                </h3>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li>• High-quality images increase sales by up to 40%.</li>
                  <li>• Detailed specifications help buyers make decisions faster.</li>
                  <li>• Marking products as "Hot Deals" features them on the homepage.</li>
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-100 italic text-center">
                <p className="text-xs text-gray-400">
                  Last session activity: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
      {/* DELETION CONFIRMATION MODAL */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaTrash className="text-red-600 mr-2" />
                  Confirm Deletion
                </h3>
                <button title= "Close delete confirmation" 
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaPlus className="rotate-45" />
                </button>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-sm text-red-700">
                  <strong>Warning:</strong> This action is permanent. The vendor will be notified of this removal and the reason provided.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Removal *
                </label>
                <select title= "Select reason for product deletion"
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a reason...</option>
                  <option value="Inappropriate Content">Inappropriate Content</option>
                  <option value="Counterfeit/Fake Product">Counterfeit/Fake Product</option>
                  <option value="Policy Violation">Policy Violation</option>
                  <option value="Duplicate Listing">Duplicate Listing</option>
                  <option value="Out of Stock/Unavailable">Out of Stock/Unavailable</option>
                  <option value="Incorrect Categorization">Incorrect Categorization</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={!deleteReason || submitting}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition flex items-center justify-center ${
                    !deleteReason || submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 active:scale-95 shadow-lg'
                  }`}
                >
                  {submitting ? 'Processing...' : 'Delete Product'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}