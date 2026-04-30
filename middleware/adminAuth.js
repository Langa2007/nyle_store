// middleware/adminAuth.js
import jwt from "jsonwebtoken";

//  General user authentication middleware
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.adminAccessToken || req.headers["authorization"]?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    console.log(" Raw Authorization Header:", req.headers["authorization"]);

  } catch (err) {
    console.error(" Auth error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

//  Admin-only authentication middleware
export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.adminAccessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(" Decoded admin:", decoded);

    //  FIX: use correct property name
    if (!decoded.is_admin) {
      return res.status(403).json({ message: "Access denied: not an admin" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error(" JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

