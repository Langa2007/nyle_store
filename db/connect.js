// db/connect.js
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,                // Enforce SSL connection
    rejectUnauthorized: false,    // Allow self-signed certificates (required for Neon)
  },
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to Neon PostgreSQL successfully');
    client.release();
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1); // Exit process on fatal DB error
  }
};

// ✅ Export both for flexibility
export { pool };
export default pool;
