// controllers/adminAuthController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/connect.js";

// --- TOKEN GENERATION ---
const generateTokens = (admin) => {
  const accessToken = jwt.sign(
    { id: admin.id, email: admin.email, is_admin: true },
    process.env.JWT_SECRET,
    { expiresIn: "2h" } // access token short-lived
  );

  const refreshToken = jwt.sign(
    { id: admin.id, email: admin.email, is_admin: true },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "1d" } // refresh token longer-lived
  );

  return { accessToken, refreshToken };
};

// --- LOGIN ---
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const ip = req.ip;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND is_admin = true",
      [email]
    );

    if (!result.rows.length)
      return res.status(401).json({ error: "Admin not found or not authorized" });

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Update last IP
    await pool.query("UPDATE users SET last_ip = $1 WHERE id = $2", [ip, admin.id]);

    const { accessToken, refreshToken } = generateTokens(admin);

    await pool.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [
      refreshToken,
      admin.id,
    ]);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      admin: { id: admin.id, email: admin.email, last_ip: ip },
    });
  } catch (err) {
    console.error("Admin login error:", err.message);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
};

// --- VERIFY ADMIN TOKEN (Middleware) ---
export const verifyAdminToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.is_admin)
      return res.status(403).json({ message: "Not an admin" });

    // Check last IP
    const result = await pool.query("SELECT last_ip FROM users WHERE id=$1", [decoded.id]);
    const lastIP = req.headers[ 'x-client-ip' ] || req.ip;
    if (lastIP && lastIP !== req.ip)
      return res.status(401).json({ message: "IP changed, please log in again" });

    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// --- REFRESH TOKEN ---
export const refreshAdminToken = async (req, res) => {
  const { refreshToken } = req.body;
  const ip = req.ip;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token provided" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Fetch admin & verify refresh token and IP
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND refresh_token = $2 AND is_admin = true",
      [decoded.id, refreshToken]
    );

    if (!result.rows.length)
      return res.status(403).json({ error: "Invalid refresh token" });

    const admin = result.rows[0];

    if (admin.last_ip !== ip)
      return res.status(401).json({ error: "IP mismatch, login required" });

    const newAccessToken = jwt.sign(
      { id: admin.id, email: admin.email, is_admin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("❌ Token refresh error:", err.message);
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

// --- LOGOUT ---
export const adminLogout = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(400).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await pool.query("UPDATE users SET refresh_token = NULL WHERE id=$1", [decoded.id]);
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
