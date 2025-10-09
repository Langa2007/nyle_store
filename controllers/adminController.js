// controllers/adminController.js
import pool from "../db/connect.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, role, created_at FROM users ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id, email", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully", user: result.rows[0] });
  } catch (err) {
    console.error("❌ Error deleting user:", err.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Promote user to admin
export const promoteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE users SET role = 'admin' WHERE id = $1 RETURNING id, email, role",
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User promoted to admin", user: result.rows[0] });
  } catch (err) {
    console.error("❌ Error promoting user:", err.message);
    res.status(500).json({ error: "Failed to promote user" });
  }
};

// ✅ Admin-only: Dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const userCount = await pool.query("SELECT COUNT(*) FROM users");
    const productCount = await pool.query("SELECT COUNT(*) FROM products");
    const orderCount = await pool.query("SELECT COUNT(*) FROM orders");
    const revenueResult = await pool.query(
      "SELECT COALESCE(SUM(total), 0) AS total_revenue FROM orders"
    );

    res.status(200).json({
      users: parseInt(userCount.rows[0].count),
      products: parseInt(productCount.rows[0].count),
      orders: parseInt(orderCount.rows[0].count),
      revenue: parseFloat(revenueResult.rows[0].total_revenue),
    });
  } catch (err) {
    console.error("❌ Dashboard stats error:", err); // ✅ SHOW FULL ERROR
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};