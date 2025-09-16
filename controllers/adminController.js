const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/connect');
const { fetchAllUsers } = require('../models/usersModel');

// ✅ Admin Login
const handleAdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    if (!user.is_admin) {
      return res.status(403).json({ error: 'Access denied. Not an admin.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { user_id: user.id, is_admin: true },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('✅ Sending token:', token);
    res.status(200).json({ message: 'Admin login successful', token });
  } catch (err) {
    console.error('❌ Admin login error:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
};

// ✅ Admin-only: Get all users (excluding passwords)
const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// ✅ Admin-only: Dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const userCount = await pool.query('SELECT COUNT(*) FROM users');
    const productCount = await pool.query('SELECT COUNT(*) FROM products');
    const orderCount = await pool.query('SELECT COUNT(*) FROM orders');
    const revenueResult = await pool.query('SELECT COALESCE(SUM(total), 0) AS total_revenue FROM orders');

    res.status(200).json({
      users: parseInt(userCount.rows[0].count),
      products: parseInt(productCount.rows[0].count),
      orders: parseInt(orderCount.rows[0].count),
      revenue: parseFloat(revenueResult.rows[0].total_revenue),
    });
  } catch (err) {
  console.error('❌ Dashboard stats error:', err); // ✅ SHOW FULL ERROR
  res.status(500).json({ error: 'Failed to fetch dashboard stats' });
}

};

// ✅ Export all admin functions
module.exports = {
  handleAdminLogin,
  getAllUsers,
  getDashboardStats,
};
