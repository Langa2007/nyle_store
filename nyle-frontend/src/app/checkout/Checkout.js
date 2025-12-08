"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export default function CheckoutPage() {
  const params = useSearchParams();
  const productId = params.get("productId");
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      router.push("/");
      return;
    }

    fetch(`${API_URL}/api/products/${productId}`)
      .then((r) => r.json())
      .then((d) => setProduct(d))
      .finally(() => setLoading(false));
  }, [productId]);

  const placeOrder = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token)
      return router.push(`/auth/login?next=/checkout?productId=${productId}`);

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [{ product_id: product.id, quantity: 1 }],
          shipping_address: { address },
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      router.push(`/orders/confirmation?orderId=${data.orderId}`);
    } catch (err) {
      alert("Order failed");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <img src={product.image_url} className="w-full" />
          <h3 className="font-bold mt-2">{product.name}</h3>
          <p>Ksh {product.price}</p>
        </div>

        <div>
          <textarea
            placeholder="Shipping address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2"
          />

          <button
            onClick={placeOrder}
            className="mt-3 bg-blue-600 text-white px-4 py-2 w-full"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
