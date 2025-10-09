// controllers/adminCategoryController.js
import { pool } from "../db/connect.js";

// ✅ Create category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
     console.log("🟢 Creating category with name:", name);
    const result = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [name]
    );
     console.log("🟢 Creating category with name:", name);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error creating category:", err.message);
    next(err);// pass to error handler
  }
};


// ✅ Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching categories:", err.message);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// ✅ Update category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await pool.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error updating category:", err.message);
    res.status(500).json({ error: "Failed to update category" });
  }
};

// ✅ Delete category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting category:", err.message);
    res.status(500).json({ error: "Failed to delete category" });
  }
};
