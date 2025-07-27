const express = require('express');
const router = express.Router();
const {
  handleCreateProduct,
  handleGetAllProducts,
} = require('../controllers/productController');

// POST /api/products
router.post('/', handleCreateProduct);

// GET /api/products
router.get('/', handleGetAllProducts);

module.exports = router;
