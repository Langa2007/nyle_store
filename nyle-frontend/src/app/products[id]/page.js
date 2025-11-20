"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductById } from "@src/services/productService";

export const dynamic = 'force-dynamic';

export default function ProductDetails({ params }) {
  const router = useRouter();
  const { id } = params;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };
    loadProduct();
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
      
      {/* IMAGE */}
      <div className="rounded-xl overflow-hidden shadow">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* DETAILS */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {product.name}
        </h1>

        <p className="text-2xl text-blue-700 font-bold mb-3">
          KES {product.price}
        </p>

        <p className="text-gray-500 text-lg mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Seller Info */}
        <div className="bg-gray-100 p-4 rounded-xl mb-6">
          <h2 className="font-semibold text-gray-800 mb-2">Vendor Information</h2>
          <p className="text-sm text-gray-600">Name: Coming Soon</p>
          <p className="text-sm text-gray-600">Location: Coming Soon</p>
          <p className="text-sm text-gray-600">Shipping Rate: Coming Soon</p>
        </div>

        <button
          onClick={() => router.push(`/login?redirect=/product/${id}`)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          Login to Continue
        </button>

      </div>
    </div>
  );
}
