// nyle-frontend/src/app/checkout/Checkout.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export default function CheckoutPage() {
  const params = useSearchParams();
  const productId = params.get("productId");
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    fetch(`${API_URL}/api/products/${productId}`)
      .then((r) => r.json())
      .then((d) => setProduct(d))
      .finally(() => setLoading(false));
  }, [productId]);

  const placeOrder = async () => {
    const token = localStorage.getItem("userAccessToken") || localStorage.getItem("accessToken");
    if (!token) return router.push(`/auth/login?next=/checkout?productId=${productId}`);

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items: [{ product_id: product.id, quantity: 1 }],
          shipping_address: { address },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");
      router.push(`/orders/confirmation?orderId=${data.orderId}`);
    } catch (err) {
      alert("Order failed: " + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <img src={product.image_url} alt={product.name} className="w-full rounded" />
          <h3 className="mt-3 font-bold">{product.name}</h3>
          <p>Ksh {product.price}</p>
        </div>
        <div>
          <label>Shipping address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border rounded" />
          <button onClick={placeOrder} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Place Order</button>
        </div>
      </div>
    </div>
  );
}
