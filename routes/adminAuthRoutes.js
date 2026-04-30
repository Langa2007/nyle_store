import express from "express";
import {
  adminLogin,
  refreshAdminToken,
  verifyAdminToken,
  adminLogout
} from "../controllers/adminAuthController.js";
import { authLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

// prefix will be /api/admin/auth
router.post("/login", authLimiter, adminLogin);
router.post("/refresh", authLimiter, refreshAdminToken);
router.post("/refresh-token", authLimiter, refreshAdminToken); // keep for backward compatibility
router.post("/logout", adminLogout);

router.get("/verify-token", verifyAdminToken, (req, res) => {
  res.status(200).json({
    valid: true,
    admin: req.admin
  });
});

export default router;
