import pool from "../db/connect.js";

// ✅ Get all products
export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// ✅ Delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully", product: result.rows[0] });
  } catch (err) {
    console.error("❌ Error deleting product:", err.message);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

// ✅ Update stock
export const updateStock = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;
  try {
    const result = await pool.query(
      "UPDATE products SET stock = $1 WHERE id = $2 RETURNING *",
      [stock, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Stock updated successfully", product: result.rows[0] });
  } catch (err) {
    console.error("❌ Error updating stock:", err.message);
    res.status(500).json({ error: "Failed to update stock" });
  }
};
