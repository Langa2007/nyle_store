import express from "express";
import {
  adminLogin,
  refreshAdminToken,
  verifyAdminToken
} from "../controllers/adminAuthController.js";

const router = express.Router();

// prefix will be /api/admin/auth
router.post("/login", adminLogin);
router.post("/refresh-token", refreshAdminToken);
router.get("/verify-token", verifyAdminToken, (req, res) => {
  res.status(200).json({
    valid: true,
    admin: req.admin
  });
});

export default router;
