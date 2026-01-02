// routes/vendorAuth.js
import express from "express";
import {
  vendorSignup,
  vendorLogin,
  verifyToken,
  magicLogin,
  resendVerificationCode
} from "../controllers/vendorAuthController.js";

// Import updated password reset functions
import {
  forgotPassword,
  verifyResetCode,
  resetPassword,
  resendResetCode
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

// 🔐 PASSWORD RESET ENDPOINTS (USING CODES)

// Forgot password - sends 6-digit code
router.post("/forgot-password", (req, res) => {
  req.body.user_type = 'vendor';
  return forgotPassword(req, res);
});

// Verify reset code - POST { email, code, user_type: 'vendor' }
router.post("/verify-reset-code", (req, res) => {
  req.body.user_type = 'vendor';
  return verifyResetCode(req, res);
});

// Reset password after code verification - POST { reset_token, newPassword, user_type: 'vendor' }
router.post("/reset-password", (req, res) => {
  req.body.user_type = 'vendor';
  return resetPassword(req, res);
});

// Resend reset code - POST { email, user_type: 'vendor' }
router.post("/resend-reset-code", (req, res) => {
  req.body.user_type = 'vendor';
  return resendResetCode(req, res);
});

export default router;