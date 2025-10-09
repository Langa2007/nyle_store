// controllers/orderController.js
import { pool } from "../db/connect.js";
import {
  createOrder as createOrderInModel,
  getAllOrders as getAllOrdersFromModel,
  getOrdersByUser,
  updateStatus,
  getAllOrdersWithDetails,
} from "../models/ordersModel.js";

// ✅ Create order
export const createOrder = async (req, res) => {
  const { user_id, items } = req.body;

  try {
    if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "Invalid input. Please include user_id and at least one item.",
      });
    }

    let total = 0;

    for (const item of items) {
      const { product_id, quantity } = item;

      const productResult = await pool.query(
        "SELECT price FROM products WHERE id = $1",
        [product_id]
      );

      if (productResult.rows.length === 0) {
        return res.status(404).json({ error: `Product ID ${product_id} not found` });
      }

      const price = parseFloat(productResult.rows[0].price);
      total += price * quantity;
    }

    const orderResult = await pool.query(
      "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id",
      [user_id, total]
    );

    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)",
        [orderId, item.product_id, item.quantity]
      );
    }

    res.status(201).json({ message: "Order placed successfully", order_id: orderId, total });
  } catch (err) {
    console.error("❌ Error creating order:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// ✅ Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersFromModel();
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Fetch Orders Error:", err.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// ✅ Get orders by user ID
export const getOrdersByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const orders = await getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders by user:", err.message);
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
};

// ✅ Update order status
export const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  try {
    await updateStatus(orderId, status);
    res.status(200).json({ message: "Order status updated" });
  } catch (err) {
    console.error("❌ Update Error:", err.message);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

// ✅ Get all orders with user + product details
export const getAllOrdersWithUserAndProducts = async (req, res) => {
  try {
    const orders = await getAllOrdersWithDetails();
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Error fetching detailed orders:", err.message);
    res.status(500).json({ error: "Failed to fetch orders with details" });
  }
};
