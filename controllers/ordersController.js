// controllers/ordersController.js
import pool from "../db/connect.js";

//  CREATE ORDER (SINGLE PRODUCT CHECKOUT)
import { createOrder as createOrderInModel } from "../models/ordersModel.js";

export const createOrder = async (req, res) => {
  try {
    const user_id = req.user.id; // from JWT middleware
    const { product_id, quantity, shipping_address, shipping_location_id } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ error: "Missing required fields: product_id and quantity" });
    }

    // Unified model handles stock checking and items insertion
    const items = [{ product_id, quantity }];

    const { order_id, total } = await createOrderInModel(user_id, items, {
      shipping_address,
      shipping_location_id
    });

    res.status(201).json({
      message: "Order placed successfully",
      order_id,
      total
    });
  } catch (err) {
    console.error(" Checkout Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


export const listOrders = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id required' });

    const { rows } = await pool.query('SELECT id, total, status, created_at FROM orders WHERE user_id=$1 ORDER BY created_at DESC', [user_id]);
    res.json(rows);
  } catch (err) {
    console.error('listOrders failed', err);
    res.status(500).json({ error: 'Failed to list orders' });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM orders WHERE id=$1', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    const order = rows[0];
    const { rows: items } = await pool.query('SELECT oi.*, p.name, p.image FROM order_items oi LEFT JOIN products p ON p.id = oi.product_id WHERE oi.order_id=$1', [id]);
    res.json({ order, items });
  } catch (err) {
    console.error('getOrder failed', err);
    res.status(500).json({ error: 'Failed to get order' });
  }
};
