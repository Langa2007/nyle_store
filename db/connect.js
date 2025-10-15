// db/connect.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

// Decide environment automatically
const isProd = process.env.NODE_ENV === "production";

// Pick the right database URL
const connectionString = isProd
  ? process.env.DATABASE_URL_NEON
  : process.env.DATABASE_URL_LOCAL;

// Validate
if (!connectionString) {
  console.error("❌ Missing DATABASE_URL_LOCAL or DATABASE_URL_NEON in environment");
  process.exit(1);
}

// Initialize pool
const pool = new Pool({
  connectionString,
  ssl: isProd
    ? { require: true, rejectUnauthorized: false } // Neon (Render)
    : false, // Local PostgreSQL
});

// Log DB connection info
pool.query("SELECT current_database()", (err, res) => {
  if (err) console.error("❌ DB Connection Error:", err.message);
  else console.log(`🧠 Connected to ${isProd ? "Neon" : "Local"} DB:`, res?.rows?.[0]);
});

// Export
export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log(`✅ ${isProd ? "Neon" : "Local"} PostgreSQL connection successful`);
    client.release();
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
};

export { pool };
export default pool;
