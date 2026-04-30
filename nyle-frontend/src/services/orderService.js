// src/services/orderservice.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

// Fetch all orders for the logged-in user or vendor.

export async function fetchOrders(token) {
  const res = await fetch(`${API_URL}/api/orders`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

//  Create a new order with the provided order data.
export async function createOrder(orderData, token) {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

//Fetch a single order by ID
export async function getOrderById(orderId, token) {
  const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch order details");
  return res.json();
}
