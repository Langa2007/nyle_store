// models/categoryModel.js
import pool from '../db/connect.js';

//  Create categories table if not exists
const createCategoryTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log(" Categories table ready");
  } catch (err) {
    console.error(" Failed to create categories table:", err.message);
  }
};
createCategoryTable();

// Create category
export const createCategory = async (name) => {
  const result = await pool.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};

//  Get all categories
export const getAllCategories = async () => {
  const result = await pool.query("SELECT * FROM categories ORDER BY id DESC");
  return result.rows;
};

//  Update category
export const updateCategory = async (id, name) => {
  const result = await pool.query(
    "UPDATE categories SET name=$1 WHERE id=$2 RETURNING *",
    [name, id]
  );
  return result.rows[0];
};

// Delete category
export const deleteCategory = async (id) => {
  const result = await pool.query(
    "DELETE FROM categories WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
