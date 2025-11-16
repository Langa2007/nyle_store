import pool from '../db/connect.js';

// ✅ Ensure the products table exists with category + image_url
const createProductTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price NUMERIC(10, 2) NOT NULL,
      stock INTEGER DEFAULT 0,
      category TEXT,        -- ✅ Added
      image_url TEXT,       -- ✅ Cloudinary URL
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ products table verified/created successfully");
  } catch (err) {
    console.error('❌ Failed to create products table:', err.message);
  }
};

createProductTable(); // Auto-run table initialization

//  CREATE PRODUCT

export const createProduct = async (
  name,
  description,
  price,
  stock,
  category,
  imageUrl
) => {
  const result = await pool.query(
    `
    INSERT INTO products
      (name, description, price, stock, category, image_url)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,
    [name, description, price, stock, category, imageUrl]
  );

  return result.rows[0];
};


// GET ALL PRODUCT
export const getAllProducts = async () => {
  const result = await pool.query(
    'SELECT * FROM products ORDER BY id DESC'
  );
  return result.rows;
};

//  GET PRODUCT BY ID

export const getProductById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

//  UPDATE PRODUCT
export const updateProductById = async (
  id,
  name,
  description,
  price,
  stock,
  category,
  imageUrl
) => {
  let query, values;

  if (imageUrl) {
    // Update with new image
    query = `
      UPDATE products
      SET name = $1,
          description = $2,
          price = $3,
          stock = $4,
          category = $5,
          image_url = $6
      WHERE id = $7
      RETURNING *;
    `;
    values = [name, description, price, stock, category, imageUrl, id];
  } else {
    // Update without changing the image
    query = `
      UPDATE products
      SET name = $1,
          description = $2,
          price = $3,
          stock = $4,
          category = $5
      WHERE id = $6
      RETURNING *;
    `;
    values = [name, description, price, stock, category, id];
  }

  const result = await pool.query(query, values);
  return result.rows[0];
};

//  DELETE PRODUCT
export const deleteProductById = async (id) => {
  const result = await pool.query(
    'DELETE FROM products WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};
