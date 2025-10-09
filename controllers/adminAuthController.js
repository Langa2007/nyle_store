// controllers/adminAuthController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/connect.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND is_admin = true",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Admin not found or not authorized" });
    }

    const admin = result.rows[0];

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, is_admin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("❌ Admin login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
