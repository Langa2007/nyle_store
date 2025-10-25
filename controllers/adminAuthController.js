import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/connect.js";

// Helper: create both tokens
const generateTokens = (admin) => {
  const accessToken = jwt.sign(
    { id: admin.id, email: admin.email, is_admin: true },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // access token expires quickly
  );

  const refreshToken = jwt.sign(
    { id: admin.id, email: admin.email, is_admin: true },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // refresh token lasts longer
  );

  return { accessToken, refreshToken };
};

// ==================== LOGIN ====================
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND is_admin = true",
      [email]
    );

    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "Admin not found or not authorized" });
    }

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate new tokens
    const { accessToken, refreshToken } = generateTokens(admin);

    // Store refresh token in DB
    await pool.query(
      "UPDATE users SET refresh_token = $1 WHERE id = $2",
      [refreshToken, admin.id]
    );

    // Return both tokens
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("❌ Admin login error:", err.message);
    res.status(500).json({ error: "Server error during login" });
  }
};

// ==================== REFRESH TOKEN ====================
export const refreshAdminToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ error: "No refresh token provided" });

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Check if it’s still stored in DB
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND refresh_token = $2 AND is_admin = true",
      [decoded.id, refreshToken]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const admin = result.rows[0];

    // Generate a new access token (short-lived)
    const accessToken = jwt.sign(
      { id: admin.id, email: admin.email, is_admin: true },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (err) {
    console.error("❌ Token refresh error:", err.message);
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};
