const { createProduct, getAllProducts } = require('../models/productsModel');

const handleCreateProduct = async (req, res) => {
  try {
    console.log('🔵 Product POST hit:', req.body); // 🔍 Debug line
    const { name, description, price, stock } = req.body;
    const newProduct = await createProduct(name, description, price, stock);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

const handleGetAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

module.exports = {
  handleCreateProduct,
  handleGetAllProducts,
};
