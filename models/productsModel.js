// models/productsModel.js
const { pool } = require('../db/connect');

// Ensure the products table exists
const createProductTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price NUMERIC(10, 2) NOT NULL,
      stock INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('✅ Product table created or already exists');
  } catch (err) {
    console.error('❌ Failed to create products table:', err.message);
  }
};

createProductTable(); // ✅ Auto-run table check when model loads

// Create a product
const createProduct = async (name, description, price, stock) => {
  const result = await pool.query(
    `INSERT INTO products (name, description, price, stock) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [name, description, price, stock]
  );
  return result.rows[0];
};

// Get all products
const getAllProducts = async () => {
  const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
  return result.rows;
};

// Get product by ID
const getProductById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );
  return result.rows[0]; // will be undefined if not found
};

// Update product by ID
const updateProductById = async (id, name, description, price, stock) => {
  const result = await pool.query(
    `
    UPDATE products 
    SET name = $1,
        description = $2,
        price = $3,
        stock = $4
    WHERE id = $5
    RETURNING *;
    `,
    [name, description, price, stock, id]
  );
  return result.rows[0];
};

// Delete product by ID
const deleteProductById = async (id) => {
  const result = await pool.query(
    'DELETE FROM products WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0]; // will be undefined if not found
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
