const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./db/connect'); 

// Import route files
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const vendorRoutes = require('./routes/vendors');              // vendor profile management
const vendorAuthRoutes = require('./routes/vendorAuth');       // vendor auth (signup/login)
const vendorProductRoutes = require('./routes/vendorProducts'); // vendor product management

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vendors', vendorAuthRoutes); // ✅ handles /register & /login
app.use('/api/vendors', vendorRoutes);     // ✅ other vendor-related routes (profile, etc.)
app.use('/api/vendor/products', vendorProductRoutes); // ✅ vendor product management

// Home route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to Nyle Store API 🚀');
});

// Connect DB and Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to DB:', err);
    process.exit(1);
  }
};

startServer();
