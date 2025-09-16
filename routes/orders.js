// routes/orders.js
const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');

const {
  handleCreateOrder,
  handleGetAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
  getAllOrdersWithUserAndProducts
} = require('../controllers/ordersController');
const { getAllOrders } = require('../models/ordersModel');

// Route: POST /api/orders — Create a new order
router.post('/', handleCreateOrder);

// Route: GET /api/orders — Get all orders
router.get('/', handleGetAllOrders);

// Route: GET /api/orders/user/:id — Get orders by user ID
router.get('/user/:id', getOrdersByUserId);

// Route: PUT /api/orders/:id/status — Update order status
router.put('/:id/status', updateOrderStatus);

// Admin: Get detailed order view
router.get('/admin/details', adminAuth, getAllOrdersWithUserAndProducts);

module.exports = router;
