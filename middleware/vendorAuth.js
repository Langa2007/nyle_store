// middleware/vendorAuth.js
import jwt from "jsonwebtoken";

export const verifyVendor = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "vendor") {
      return res.status(403).json({ error: "Access denied. Vendors only." });
    }

    req.user = decoded; // attach decoded vendor info
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};
