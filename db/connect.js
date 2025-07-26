const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('PostgreSQL connected...');
  } catch (err) {
    console.error('Connection error:', err.stack);
    throw err;
  }
};

module.exports = connectDB;
