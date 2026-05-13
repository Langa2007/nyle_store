import pool from './db/connect.js';

async function migrate() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS store_reviews (
        id SERIAL PRIMARY KEY,
        reviewer_name VARCHAR(255) NOT NULL,
        reviewer_email VARCHAR(255) NOT NULL,
        feedback_changes TEXT NOT NULL,
        would_recommend BOOLEAN NOT NULL,
        general_thoughts TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table created');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

migrate();
