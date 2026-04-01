"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useCart } from "@/context/CartContext/page";
import { useShopActivity } from "@/context/ShopActivityContext/page";

export default function WishlistPage() {
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist } = useShopActivity();

  const handleAddToCart = async (product) => {
    await addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-blue-50 py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <Link
              href="/#products-section"
              className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800 mb-4"
            >
              <FaArrowLeft className="mr-2" />
              Back to all products
            </Link>
            <div className="inline-flex items-center bg-rose-100 text-rose-700 px-4 py-2 rounded-full mb-4">
              <FaHeart className="mr-2" />
              <span className="font-medium">Wishlist</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Your saved products</h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Keep the products you love in one place, then jump back into the full catalogue whenever you want to keep shopping.
            </p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-rose-100">
            <p className="text-sm text-gray-500">Saved items</p>
            <p className="text-3xl font-bold text-gray-900">{wishlistItems.length}</p>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-rose-200 p-12 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-6 text-3xl">
              <FaHeart />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Tap the heart icon on any product card and it will show up here with a real live count in the navbar.
            </p>
            <Link
              href="/#products-section"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Explore products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {wishlistItems.map((product, index) => {
              const productId = product.id || product.product_id;
              return (
                <motion.div
                  key={productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden"
                >
                  <Link href={`/products/${productId}`} className="block">
                    <div className="h-64 bg-gradient-to-br from-rose-50 to-blue-50 overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <Link href={`/products/${productId}`} className="block">
                          <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{product.name}</h2>
                        </Link>
                        {product.category && (
                          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromWishlist(productId)}
                        className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition"
                        aria-label="Remove from wishlist"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem] mb-5">
                      {product.description || "Premium quality product with excellent features."}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-blue-700">
                          Ksh {Number(product.price || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">
                          Saved for later
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                      >
                        <FaShoppingCart />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
