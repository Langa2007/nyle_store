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

const JWT_EXPIRES = process.env.JWT_EXPIRES || "2h";

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(`[Auth] Attempting registration for: ${email}`);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check duplicate
    const exists = await pool.query("SELECT id FROM users WHERE email = $1", [normalizedEmail]);
    if (exists.rows.length) {
      console.log(`[Auth] Registration failed: Email ${normalizedEmail} already exists (409)`);
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
    console.log(`[Auth] User created successfully: ID ${user.id}`);

    // Auto-login: create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    return res.status(201).json({
      message: "Account created",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("[Auth] Register error:", err);
    return res.status(500).json({ message: "Server error during registration." });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`[Auth] Attempting login for: ${email}`);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const q = await pool.query("SELECT * FROM users WHERE email = $1", [normalizedEmail]);

    if (q.rows.length === 0) {
      console.log(`[Auth] Login failed: User not found for ${normalizedEmail} (404)`);
      return res.status(404).json({ message: "User not found." });
    }

    const user = q.rows[0];

    // Check if password matches
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      console.log(`[Auth] Login failed: Password mismatch for ${normalizedEmail} (401)`);
      // Check if it's one of those plaintext 6-char passwords from diagnosis
      if (user.password.length <= 10 && user.password === password) {
        console.warn(`[Auth] WARNING: Plaintext password match detected for ${normalizedEmail}. Updating to hash...`);
        const rehashed = await bcrypt.hash(password, 10);
        await pool.query("UPDATE users SET password = $1 WHERE id = $2", [rehashed, user.id]);
        // Proceed as if comparison passed
      } else {
        return res.status(401).json({ message: "Invalid password." });
      }
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    console.log(`[Auth] Login successful for: ${normalizedEmail}`);
    return res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("[Auth] Login error:", err);
    return res.status(500).json({ message: "Server error during login." });
  }
};
