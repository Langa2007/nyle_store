// routes/vendorProducts.js
const express = require('express');
const router = express.Router();
const vendorAuth = require('../middleware/vendorAuth');
const {
  addProduct,
  getVendorProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/vendorProductController');

// All routes require vendor authentication
router.post('/', vendorAuth, addProduct);
router.get('/', vendorAuth, getVendorProducts);
router.put('/:id', vendorAuth, updateProduct);
router.delete('/:id', vendorAuth, deleteProduct);

module.exports = router;
