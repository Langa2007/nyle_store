const pool = require('../db/connect'); // ⬅️ ensure this is included if not already

const {
  createProduct,
  getAllProducts,
  updateProductById,
  getProductById,
  deleteProductById,
} = require('../models/productsModel');

// ✅ Create a new product
const handleCreateProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const newProduct = await createProduct(name, description, price, stock);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('❌ Product Creation Error:', err.message);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// ✅ Get all products
const handleGetAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error('❌ Fetch Products Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// ✅ Get a product by ID
const handleGetProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error('❌ Fetch Product Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// ✅ Update a product by ID
const handleUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  try {
    const updated = await updateProductById(id, name, description, price, stock);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error('❌ Update Error:', err.message);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// ✅ Delete a product by ID
const handleDeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteProductById(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('❌ Delete Error:', err.message);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// ✅ Admin-only: update stock for a product
const updateProductStock = async (req, res) => {
  const productId = req.params.id;
  const { stock } = req.body;

  try {
    await pool.query('UPDATE products SET stock = $1 WHERE id = $2', [stock, productId]);
    res.status(200).json({ message: 'Stock updated successfully' });
  } catch (err) {
    console.error('❌ Stock update error:', err.message);
    res.status(500).json({ error: 'Failed to update stock' });
  }
};

// ✅ Search and filter products
const searchAndFilterProducts = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  let query = 'SELECT * FROM products WHERE 1=1';
  const values = [];
  let count = 1;

  if (name) {
    query += ` AND LOWER(name) LIKE $${count++}`;
    values.push(`%${name.toLowerCase()}%`);
  }

  if (category) {
    query += ` AND LOWER(category) = $${count++}`;
    values.push(category.toLowerCase());
  }

  if (minPrice) {
    query += ` AND price >= $${count++}`;
    values.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND price <= $${count++}`;
    values.push(maxPrice);
  }

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ Search/Filter error:', err.message);
    res.status(500).json({ error: 'Failed to search/filter products' });
  }
};

// ✅ Final single export
module.exports = {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetProductById,
  handleUpdateProduct,
  handleDeleteProduct,
  updateProductStock,
  searchAndFilterProducts
};
