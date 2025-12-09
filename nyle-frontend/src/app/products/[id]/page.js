"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data); // ✅ OBJECT, not array
      })
      .catch((e) => console.error("Fetch error:", e))
      .finally(() => setLoading(false));
  }, [id]);

  const ensureAuthThen = (cb) => {
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("userAccessToken");

    if (!token) {
      router.push(`/auth/login?next=/products/${id}`);
      return;
    }

    cb();
  };

  const goToCheckout = () => {
    ensureAuthThen(() => {
      router.push(`/checkout?productId=${id}`);
    });
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product || product.error) return <div className="p-6">Not found</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full rounded"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">
            Ksh {Number(product.price).toLocaleString()}
          </p>

          <div className="mb-4">
            <h3 className="font-semibold">Seller</h3>
            <p>{product.vendor_name || "Nyle Store"}</p>
          </div>

          <button
            onClick={goToCheckout}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
