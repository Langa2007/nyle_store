"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export default function ProductPage({ params }) {
  const id = params?.id; // safe
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  console.log("PARAMS =", params);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const goToCheckout = () => {
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("userAccessToken");

    if (!token) {
      router.push(`/auth/login?next=/products/${id}`);
      return;
    }

    router.push(`/checkout?productId=${id}`);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product || product.error) return <div className="p-6">Not found</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full rounded"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">
            Ksh {Number(product.price).toLocaleString()}
          </p>

          <button
            onClick={goToCheckout}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
