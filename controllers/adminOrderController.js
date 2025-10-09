import pool from "../db/connect.js";

// ✅ Get all orders with user & items
export const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        o.id AS order_id,
        o.status,
        o.total_amount,
        o.created_at,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        json_agg(
          json_build_object(
            'product_id', p.id,
            'product_name', p.name,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) AS items
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      GROUP BY o.id, u.id
      ORDER BY o.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching orders:", err.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// ✅ Update order status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order status updated", order: result.rows[0] });
  } catch (err) {
    console.error("❌ Error updating order:", err.message);
    res.status(500).json({ error: "Failed to update order" });
  }
};
