// middleware/adminAuth.js
import jwt from "jsonwebtoken";

// ✅ General user authentication middleware
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    console.log("🟣 Raw Authorization Header:", req.headers["authorization"]);

  } catch (err) {
    console.error("❌ Auth error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// ✅ Admin-only authentication middleware
export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Admin auth header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded admin:", decoded);

    // ✅ FIX: use correct property name
    if (!decoded.is_admin) {
      return res.status(403).json({ message: "Access denied: not an admin" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

