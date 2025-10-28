// routes/vendorAuth.js
import express from "express";
import {
  vendorSignup,
  vendorLogin,
  verifyToken,
  magicLogin,
  resendVerificationCode
} from "../controllers/vendorAuthController.js";

const router = express.Router();

// Signup (sends verification code)
router.post("/signup", vendorSignup);

// Login (email/password) - requires verified + approved
router.post("/login", vendorLogin);

// Verify token (code) - POST { email, code }
router.post("/verify-token", verifyToken);

// Exchange magic token for auth JWT - POST { token }
router.post("/magic-login", magicLogin);

// Resend verification code - POST { email }
router.post("/resend-code", resendVerificationCode);

export default router;
