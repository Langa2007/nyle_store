// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/connect.js";

// Ensure users table exists (runs on load)
const ensureUsersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (err) {
    console.error("Failed to ensure users table:", err.message);
  }
};
ensureUsersTable();

const JWT_EXPIRES = process.env.JWT_EXPIRES || "2h"; // adjust if needed

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check duplicate
    const exists = await pool.query("SELECT id FROM users WHERE email = $1", [normalizedEmail]);
    if (exists.rows.length) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert user
    const insert = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email`,
      [name || null, normalizedEmail, hashed]
    );

    const user = insert.rows[0];

    // Auto-login: create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    // Return token + profile (frontend will store token)
    return res.status(201).json({
      message: "Account created",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error during registration." });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required." });

    const normalizedEmail = email.trim().toLowerCase();
    const q = await pool.query("SELECT * FROM users WHERE email = $1", [normalizedEmail]);
    if (q.rows.length === 0) return res.status(400).json({ message: "Invalid credentials." });

    const user = q.rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user.id, email: user.email, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    return res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login." });
  }
};
