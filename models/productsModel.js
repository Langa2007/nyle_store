const { pool } = require('../db/connect');

const createProductTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price NUMERIC(10, 2) NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('✅ Product table created or already exists');
  } catch (err) {
    console.error('❌ Failed to create product table:', err);
  }
};

createProductTable();

module.exports = {
  createProduct: async (name, description, price, imageUrl) => {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, imageUrl]
    );
    return result.rows[0];
  },

  getAllProducts: async () => {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    return result.rows;
  },

  getProductById: async (id) => {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  },

  updateProduct: async (id, name, description, price, imageUrl) => {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, image_url = $4 WHERE id = $5 RETURNING *',
      [name, description, price, imageUrl, id]
    );
    return result.rows[0];
  },

  deleteProduct: async (id) => {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
  }
};
