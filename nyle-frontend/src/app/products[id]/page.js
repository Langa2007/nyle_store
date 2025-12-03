"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_URL}/api/products/${id}`)
      .then((r) => r.json())
      .then((d) => setProduct(d))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [id]);

  const ensureAuthThen = (cb) => {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("adminAccessToken"); // adapt for user token
    if (!token) {
      // redirect to login with return-to param
      router.push(`/auth/login?next=/product/${id}`);
      return;
    }
    cb();
  };

  const goToCheckout = () => {
    ensureAuthThen(() => {
      router.push(`/checkout?productId=${id}`);
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Not found</div>;

  const vendor = {
    id: product.vendor_id,
    name: product.vendor_name || product.company_name || "Unknown Seller",
    shipping_profile: product.shipping_profile || {},
    shipping_rate: product.shipping_rate || 0,
    email: product.vendor_email,
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image_url || "/placeholder.png"} alt={product.name} className="w-full rounded" />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">Ksh {product.price}</p>

          <div className="mb-4">
            <h3 className="font-semibold">Seller</h3>
            <p>{vendor.name}</p>
            {vendor.shipping_rate !== undefined && <p>Shipping from vendor: Ksh {vendor.shipping_rate}</p>}
          </div>

          <button onClick={goToCheckout} className="bg-blue-600 text-white px-4 py-2 rounded">Buy now</button>
        </div>
      </div>
    </div>
  );
}
