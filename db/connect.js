// db/connect.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ Missing DATABASE_URL in environment");
  process.exit(1);
}

// ✅ Works for Neon (requires SSL)
const pool = new Pool({
  connectionString,
  ssl: {
    require: true,
    rejectUnauthorized: false, // Neon uses managed certs
  },
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to Neon PostgreSQL successfully");
    client.release();
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
};

export { pool };
export default pool;
