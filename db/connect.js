// db/connect.js
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // disable SSL for local development
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error('❌ Connection error:', err);
    throw err;
  }
};

module.exports = {
  pool,
  connectDB,
};
