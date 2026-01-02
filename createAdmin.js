// createAdmin.js
import bcrypt from "bcrypt";
import pool from "./db/connect.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  const name = "Admin User"; //  required column
  const email = "fidellanga67@gmail.com";
  const password = "Stephanie@2007";
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
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
