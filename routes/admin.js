const express = require('express');
const router = express.Router();
const { handleAdminLogin, getAllUsers, getDashboardStats } = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

// ✅ Admin login
router.post('/login', handleAdminLogin);

// ✅ Admin-only dashboard analytics (stats)
router.get('/dashboard', adminAuth, getDashboardStats);

// ✅ Admin-only: View all users
router.get('/users', adminAuth, getAllUsers);

module.exports = router;
