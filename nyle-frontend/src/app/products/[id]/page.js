// app/products/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaTag,
  FaStore,
  FaCheckCircle,
} from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!id) {
      router.push("/");
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log("Fetching product:", `${API_URL}/api/products/${id}`);
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

  const handleBuyNow = () => {
    // Store product in localStorage for checkout
    localStorage.setItem("cartItem", JSON.stringify({
      productId: id,
      quantity,
      product
    }));
    
    // Check if user is logged in
    const token = localStorage.getItem("accessToken") || 
                   localStorage.getItem("userAccessToken");
    
    if (!token) {
      router.push(`/auth/login?redirect=/checkout/${id}`);
    } else {
      router.push(`/checkout/${id}`);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find(item => item.productId === id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: id,
        quantity,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url
        }
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
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

  const productImages = product.image_url ? [product.image_url] : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>›</span>
          <Link href="/#products-section" className="hover:text-blue-600">Products</Link>
          <span>›</span>
          <span className="text-gray-800 font-medium truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="rounded-xl overflow-hidden bg-gray-100 mb-4">
                <img
                  src={productImages[selectedImage] || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop"}
                  alt={product.name}
                  className="w-full h-96 object-contain"
                />
              </div>
              
              {/* Image Thumbnails */}
              {productImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === idx ? 'border-blue-600' : 'border-gray-200'}`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(4)}☆
                  </div>
                  <span className="ml-2 text-gray-600">4.2 (128 reviews)</span>
                </div>
                <span className="text-green-600 font-medium">In Stock</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-blue-700">
                  Ksh {Number(product.price).toLocaleString()}
                </div>
                <div className="text-gray-500 mt-2">+ Free Shipping</div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description || "Premium quality product with excellent features and durability."}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 py-2 text-gray-600 hover:text-blue-600"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-4 py-2 text-gray-600 hover:text-blue-600"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-gray-600">Only 25 items left!</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2 text-gray-700">
                  <FaTruck className="text-blue-600" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <FaUndo className="text-blue-600" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <FaShieldAlt className="text-blue-600" />
                  <span>2-Year Warranty</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <FaCheckCircle className="text-blue-600" />
                  <span>Quality Assured</span>
                </div>
              </div>

              {/* Vendor Info */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaStore className="mr-2 text-blue-600" />
                  Vendor Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">TechGear Inc.</p>
                  <p className="text-sm text-gray-600">⭐ 4.8 Rating | 1,240 Sales</p>
                  <p className="text-sm text-gray-600 mt-2">Seller since 2020 | Fast Shipping</p>
                  <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Seller Profile →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping & Returns */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <FaTruck className="mr-2 text-green-600" />
              Shipping Rates
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Nairobi: Ksh 150 (1-2 days)</li>
              <li>• Major Cities: Ksh 300 (2-3 days)</li>
              <li>• Countrywide: Ksh 500 (3-5 days)</li>
              <li>• Express: Ksh 800 (24 hours)</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <FaUndo className="mr-2 text-orange-600" />
              Return Policy
            </h3>
            <p className="text-gray-600">
              30-day return policy. Items must be unused with original packaging. Free returns for defective products.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <FaTag className="mr-2 text-purple-600" />
              Why Buy From Us
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Authentic Products Guaranteed</li>
              <li>✓ Secure Payment Options</li>
              <li>✓ 24/7 Customer Support</li>
              <li>✓ Money Back Guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}