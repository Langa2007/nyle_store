"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from '@/context/CartContext/page';
import {
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaTag,
  FaStore,
  FaCheckCircle,
  FaBox,
  FaBolt,
  FaPalette,
  FaWeightHanging,
  FaRuler,
  FaCalendarAlt,
  FaHashtag,
  FaShippingFast
} from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, setShowAuthModal, setAuthAction, setShowCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (!id) {
      router.push("/");
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        console.log("Product data:", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleAddToCart = async () => {
    if (!product) return;

    const result = await addToCart(product, quantity);

    if (result.success && !result.requiresAuth) {
      // Simple notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      `;
      notification.textContent = `Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2000);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;

    await addToCart(product, quantity, { buyNow: true });
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (!product.original_price || product.original_price <= product.price) return 0;
    const discount = ((product.original_price - product.price) / product.original_price) * 100;
    return Math.round(discount);
  };

  const discountPercentage = calculateDiscount();

  // Handle images (array or single)
  const productImages = product.image_url
    ? (Array.isArray(product.image_url) ? product.image_url : [product.image_url])
    : [];

  // Handle gallery images
  const galleryImages = product.gallery_images || [];
  const allImages = [...productImages, ...galleryImages];

  // Parse features if it's a string - with defensive try/catch and array normalization
  let features = [];
  try {
    const rawFeatures = product.features
      ? (typeof product.features === 'string' ? JSON.parse(product.features) : product.features)
      : [];
    features = Array.isArray(rawFeatures) ? rawFeatures : [];
  } catch (e) {
    console.error("Error parsing features:", e);
    features = [];
  }

  // Parse specifications if it's a string - with defensive try/catch
  let specifications = {};
  try {
    specifications = product.specifications
      ? (typeof product.specifications === 'string' ? JSON.parse(product.specifications) : product.specifications)
      : {};
  } catch (e) {
    console.error("Error parsing specifications:", e);
    specifications = {};
  }

  // Parse tags if it's a string - with defensive try/catch and array normalization
  let tags = [];
  try {
    const rawTags = product.tags
      ? (typeof product.tags === 'string' ? JSON.parse(product.tags) : product.tags)
      : [];
    tags = Array.isArray(rawTags) ? rawTags : [];
  } catch (e) {
    console.error("Error parsing tags:", e);
    tags = [];
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>›</span>
          <Link href="/#products-section" className="hover:text-blue-600">Products</Link>
          {product.category && (
            <>
              <span>›</span>
              <Link href={`/products?category=${product.category}`} className="hover:text-blue-600 capitalize">
                {product.category}
              </Link>
            </>
          )}
          <span>›</span>
          <span className="text-gray-800 font-medium truncate">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="rounded-xl overflow-hidden bg-gray-100 mb-4 relative">
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    {discountPercentage}% OFF
                  </div>
                )}

                {product.is_featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    Featured
                  </div>
                )}

                {product.is_bestseller && (
                  <div className="absolute top-16 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    Best Seller
                  </div>
                )}

                <img
                  src={allImages[selectedImage] || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop"}
                  alt={product.name}
                  className="w-full h-96 object-contain p-4"
                />
              </div>

              {/* Image Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx
                        ? 'border-blue-600 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {product.brand && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {product.brand}
                  </span>
                )}
                {product.color && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                    <FaPalette className="mr-1" /> {product.color}
                  </span>
                )}
                {product.material && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {product.material}
                  </span>
                )}
                {tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(product.rating || 4))}
                    {'☆'.repeat(5 - Math.floor(product.rating || 4))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {product.rating || 4.2} ({product.review_count || 128} reviews)
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold text-blue-700">
                    Ksh {Number(product.price).toLocaleString()}
                  </div>
                  {product.original_price && product.original_price > product.price && (
                    <>
                      <div className="text-2xl text-gray-400 line-through">
                        Ksh {Number(product.original_price).toLocaleString()}
                      </div>
                    </>
                  )}
                </div>
                {product.shipping_cost === 0 && (
                  <div className="text-green-600 mt-2 flex items-center">
                    <FaTruck className="mr-2" />
                    Free Shipping
                  </div>
                )}
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FaBolt className="mr-2 text-yellow-600" />
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Product Details */}
              <div className="mb-8 grid grid-cols-2 gap-4">
                {product.weight && (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaWeightHanging className="text-blue-600" />
                    <span>Weight: {product.weight} kg</span>
                  </div>
                )}

                {product.dimensions && (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaRuler className="text-blue-600" />
                    <span>Dimensions: {product.dimensions}</span>
                  </div>
                )}

                {product.sku && (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaHashtag className="text-blue-600" />
                    <span>SKU: {product.sku}</span>
                  </div>
                )}

                {product.estimated_delivery_days && (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaCalendarAlt className="text-blue-600" />
                    <span>Delivery: {product.estimated_delivery_days} days</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-3 border-x border-gray-300 w-16 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">{product.stock || 25}</span> items available
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-4 rounded-lg font-semibold text-lg transition-colors ${product.stock > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-4 rounded-lg font-semibold text-lg transition-colors ${product.stock > 0
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl text-blue-600">✓</div>
                  <div className="text-sm text-gray-700">Secure Payment</div>
                </div>
                <div className="text-center">
                  <FaShippingFast className="text-2xl text-green-600 mx-auto mb-1" />
                  <div className="text-sm text-gray-700">Fast Delivery</div>
                </div>
                <div className="text-center">
                  <FaShieldAlt className="text-2xl text-purple-600 mx-auto mb-1" />
                  <div className="text-sm text-gray-700">Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {["description", "specifications", "shipping", "warranty"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 font-medium text-lg border-b-2 transition-colors ${activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "description" && (
              <div>
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {product.description || "Premium quality product with excellent features and durability."}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-xl font-bold mb-6">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(specifications).map(([key, value], idx) => (
                    <div key={idx} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div>
                <h3 className="text-xl font-bold mb-6">Shipping Information</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    {product.shipping_info || "Standard shipping within 3-5 business days."}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Shipping Details:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Cost: Ksh {product.shipping_cost || 0}</li>
                      <li>• Free shipping on orders over Ksh {product.free_shipping_threshold || 5000}</li>
                      <li>• Estimated delivery: {product.estimated_delivery_days || 3 - 5} business days</li>
                      <li>• Nairobi: 1-2 days</li>
                      <li>• Major Cities: 2-3 days</li>
                      <li>• Countrywide: 3-5 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "warranty" && (
              <div>
                <h3 className="text-xl font-bold mb-6">Warranty & Returns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold mb-3 flex items-center">
                      <FaShieldAlt className="mr-2 text-green-600" />
                      Warranty Information
                    </h4>
                    <p className="text-gray-700">
                      {product.warranty_info || "This product comes with a standard manufacturer warranty. Contact support for warranty claims."}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3 flex items-center">
                      <FaUndo className="mr-2 text-orange-600" />
                      Return Policy
                    </h4>
                    <p className="text-gray-700">
                      {product.return_policy || "30-day return policy. Items must be unused with original packaging. Free returns for defective products."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vendor Info */}
        {product.vendor_name && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaStore className="mr-2 text-blue-600" />
              Vendor Information
            </h2>
            <div className="flex items-start space-x-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{product.vendor_name}</h3>
                {product.company_name && (
                  <p className="text-gray-600 mt-1">{product.company_name}</p>
                )}
                <div className="mt-4 space-y-2">
                  {product.business_email && (
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span> {product.business_email}
                    </p>
                  )}
                  {product.phone && (
                    <p className="text-gray-700">
                      <span className="font-medium">Phone:</span> {product.phone}
                    </p>
                  )}
                  {product.business_address && (
                    <p className="text-gray-700">
                      <span className="font-medium">Address:</span> {product.business_address}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end mb-2">
                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>
                  <span className="ml-2 text-gray-600">4.8 Rating</span>
                </div>
                <p className="text-gray-600">Seller since 2020</p>
                <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                  View All Products from this Seller →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}