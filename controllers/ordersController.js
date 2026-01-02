// controllers/ordersController.js
import pool from "../db/connect.js";

//  CREATE ORDER (SINGLE PRODUCT CHECKOUT)
export const createOrder = async (req, res) => {
  const client = await pool.connect();
  try {
    const user_id = req.user.id; // from JWT middleware
    const { product_id, quantity, shipping_address } = req.body;

    if (!product_id || !quantity || !shipping_address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await client.query("BEGIN");

    //  1. Get product + vendor
    const productRes = await client.query(
      `SELECT id, price, stock, vendor_id 
       FROM products 
       WHERE id = $1`,
      [product_id]
    );

    if (productRes.rows.length === 0) {
      throw new Error("Product not found");
    }

    const product = productRes.rows[0];

    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }

    const total_amount = product.price * quantity;

    // 2. Create order (WITH vendor_id )
    const orderRes = await client.query(
      `INSERT INTO orders (user_id, vendor_id, total_amount, shipping_address, status)
       VALUES ($1, $2, $3, $4, 'pending')
       RETURNING *`,
      [user_id, product.vendor_id, total_amount, shipping_address]
    );

    const order = orderRes.rows[0];

    //  3. Insert order item (WITH vendor_id )
    await client.query(
      `INSERT INTO order_items (order_id, product_id, vendor_id, quantity, price)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        order.id,
        product.id,
        product.vendor_id,
        quantity,
        product.price,
      ]
    );

    //  4. Reduce stock
    await client.query(
      `UPDATE products 
       SET stock = stock - $1 
       WHERE id = $2`,
      [quantity, product.id]
    );

    await client.query("COMMIT");

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(" Checkout Error:", err.message);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
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
