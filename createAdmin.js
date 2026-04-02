// createAdmin.js
import bcrypt from "bcrypt";
import pool from "./db/connect.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  const missingVars = ["ADMIN_NAME", "ADMIN_EMAIL", "ADMIN_PASSWORD"].filter(
    (key) => !process.env[key]
  );

  if (missingVars.length) {
    console.error(`Missing required env vars: ${missingVars.join(", ")}`);
    process.exit(1);
  }

  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1 LIMIT 1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      console.log("Admin user already exists");
      return;
    }

    await pool.query(
      `INSERT INTO users (name, email, password, is_admin)
       VALUES ($1, $2, $3, $4)`,
      [name, email, hashedPassword, true]
    );
    console.log(" Admin user created");
  } catch (err) {
    console.error(" Error creating admin:", err.message);
  } finally {
    pool.end();
  }
};

createAdmin();
