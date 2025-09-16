const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');

const {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetProductById,
  searchAndFilterProducts, // ✅ Added missing comma
  handleUpdateProduct,
  handleDeleteProduct,
  updateProductStock
} = require('../controllers/productController');

// ✅ Search and filter products (MUST come before :id route to prevent conflict)
router.get('/search', searchAndFilterProducts);

// ✅ Create a product
router.post('/', handleCreateProduct);

// ✅ Get all products
router.get('/', handleGetAllProducts);

// ✅ Get a product by ID
router.get('/:id', handleGetProductById);

// ✅ Update product by ID
router.put('/:id', handleUpdateProduct);

// ✅ Delete product by ID
router.delete('/:id', handleDeleteProduct);

// ✅ Update stock (admin only)
router.put('/:id/stock', adminAuth, updateProductStock);

module.exports = router;
