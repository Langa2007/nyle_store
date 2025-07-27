console.log('🟡 Server booting up')
console.log('🟢 Product routes loaded');


const express = require('express');
const dotenv = require('dotenv');
const {connectDB} = require('./db/connect'); // ✅ FIXED
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products'); // ✅ NEW


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // to parse JSON body

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // ✅ NEW

// Home route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to Nyle Store API');
});

// Connect DB and Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  }
};

startServer();
