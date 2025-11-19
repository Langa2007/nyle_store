import express from "express";
import {
  adminLogin,
  refreshAdminToken,
  verifyAdminToken
} from "../controllers/adminAuthController.js";

const router = express.Router();

// Auth routes
router.post("/login", adminLogin);
router.post("/refresh", refreshAdminToken);  // new
router.get("/verify-token",verifyAdminToken); // new

export default router;
