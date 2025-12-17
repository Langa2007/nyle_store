
"use client";

import Link from 'next/link';

const ProductCard = ({ product, currency, convertPrice }) => {
  return (
    <div className="group bg-white p-5 rounded-xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="relative h-56 w-full rounded-lg overflow-hidden bg-gray-100 mb-4">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {product.name?.[0] || 'N'}
                </div>
                <div className="text-sm text-gray-500">No Image</div>
              </div>
            </div>
          )}
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium">
              View Details
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">
            {product.description || "No description available."}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xl font-bold text-blue-700">
                {currency} {convertPrice(product.price || 0)}
              </p>
              <p className="text-xs text-green-600 font-medium mt-1">
                ✓ Ships from seller
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-yellow-500 text-sm">
                {'★'.repeat(4)}☆ (128)
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Free delivery
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Quick Actions */}
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors text-sm">
          Add to Cart
        </button>
        <button className="px-3 border border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-lg transition-colors">
          ♡
        </button>
      </div>
    </div>
  );
};

export default ProductCard;