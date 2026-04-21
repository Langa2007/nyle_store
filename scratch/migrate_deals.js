import pool from '../db/connect.js';

const migrate = async () => {
  try {
    console.log("Starting migration: Adding deal-related columns to products table...");
    
    const query = `
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS discount_percentage NUMERIC DEFAULT 0,
      ADD COLUMN IF NOT EXISTS is_deal_requested BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS deal_status TEXT DEFAULT 'none',
      ADD COLUMN IF NOT EXISTS is_hot_deal BOOLEAN DEFAULT FALSE;
    `;
    
    await pool.query(query);
    console.log("Migration successful: Columns added to products table.");
    
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exit(1);
  }
};

migrate();
