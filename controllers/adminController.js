// controllers/adminController.js
import pool from "../db/connect.js";

const NON_ADMIN_USER_FILTER = "COALESCE(is_admin, false) = false";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, is_admin, created_at
       FROM users
       WHERE ${NON_ADMIN_USER_FILTER}
       ORDER BY id DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(" Error fetching users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Admin-only: user count without listing all users
export const getUserSummary = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*)::int AS total_users
       FROM users
       WHERE ${NON_ADMIN_USER_FILTER}`
    );

    res.json({ totalUsers: result.rows[0]?.total_users ?? 0 });
  } catch (err) {
    console.error(" Error fetching user summary:", err.message);
    res.status(500).json({ error: "Failed to fetch user summary" });
  }
};

// Admin-only: targeted user search for GDPR lookup/delete
export const searchUsers = async (req, res) => {
  const query = String(req.query.q || "").trim().toLowerCase();

  if (query.length < 2) {
    return res.status(400).json({ error: "Search query must be at least 2 characters long" });
  }

  try {
    const result = await pool.query(
      `SELECT id, name, email, created_at
       FROM users
       WHERE ${NON_ADMIN_USER_FILTER}
         AND (
           LOWER(email) LIKE $1
           OR LOWER(COALESCE(name, '')) LIKE $1
           OR CAST(id AS TEXT) = $2
         )
       ORDER BY
         CASE
           WHEN LOWER(email) = $3 THEN 0
           WHEN LOWER(COALESCE(name, '')) = $3 THEN 1
           WHEN CAST(id AS TEXT) = $2 THEN 2
           ELSE 3
         END,
         created_at DESC
       LIMIT 10`,
      [`%${query}%`, query, query]
    );

    res.json({ users: result.rows });
  } catch (err) {
    console.error(" Error searching users:", err.message);
    res.status(500).json({ error: "Failed to search users" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const existingUser = await client.query(
      `SELECT id, email, is_admin
       FROM users
       WHERE id = $1
       FOR UPDATE`,
      [id]
    );

    if (existingUser.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "User not found" });
    }

    if (existingUser.rows[0].is_admin) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "Admin accounts cannot be deleted from this tool" });
    }

    await client.query(
      `DELETE FROM password_reset_tokens
       WHERE user_id = $1 AND user_type = 'user'`,
      [id]
    );

    const result = await client.query(
      "DELETE FROM users WHERE id = $1 RETURNING id, email",
      [id]
    );

    await client.query("COMMIT");
    res.json({ message: "User deleted successfully", user: result.rows[0] });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(" Error deleting user:", err.message);
    res.status(500).json({ error: "Failed to delete user" });
  } finally {
    client.release();
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
    console.error(" Error promoting user:", err.message);
    res.status(500).json({ error: "Failed to promote user" });
  }
};

// Admin-only: Dashboard stats
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
    console.error(" Dashboard stats error:", err); //  SHOW FULL ERROR
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
