// routes/vendorAuth.js
import express from "express";
import {
  vendorSignup,
  vendorLogin,
  verifyToken,
  magicLogin,
  resendVerificationCode
} from "../controllers/vendorAuthController.js";

// Import password reset functions from passwordResetController
import {
  forgotPassword,
  validateResetToken,
  resetPassword
} from "../controllers/passwordResetController.js";

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

// 🔐 PASSWORD RESET ENDPOINTS

// Forgot password - POST { email, user_type: 'vendor' }
router.post("/forgot-password", (req, res) => {
  // Force user_type to be 'vendor' for vendor password reset
  req.body.user_type = 'vendor';
  return forgotPassword(req, res);
});

// Validate reset token - GET /api/vendor/auth/validate-reset-token?token=xxx&user_type=vendor
router.get("/validate-reset-token", (req, res) => {
  // Force user_type to be 'vendor'
  req.query.user_type = 'vendor';
  return validateResetToken(req, res);
});

// Reset password - POST { token, newPassword, user_type: 'vendor' }
router.post("/reset-password", (req, res) => {
  // Force user_type to be 'vendor'
  req.body.user_type = 'vendor';
  return resetPassword(req, res);
});

export default router;