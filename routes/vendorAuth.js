// routes/vendorAuth.js
import express from "express";
import {
  vendorSignup,
  vendorLogin,
  verifyEmail,
} from "../controllers/vendorAuthController.js";

const router = express.Router();

// --- Signup (sends Gmail verification email) ---
router.post("/signup", vendorSignup);

// --- Login (only if verified + approved) ---
router.post("/login", vendorLogin);

// --- Verify email (via Gmail link) ---
router.get("/verify-email", verifyEmail);

export default router;
