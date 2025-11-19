import express from "express";
import {
  adminLogin,
  refreshAdminToken,
  verifyAdminToken
} from "../controllers/adminAuthController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// Auth routes
router.post("/login",verifyAdmin, adminLogin);
router.post("/refresh",verifyAdmin, refreshAdminToken);  // new
router.get("/verify-token",verifyAdmin, verifyAdminToken); // new

export default router;
