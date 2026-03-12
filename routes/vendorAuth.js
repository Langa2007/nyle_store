// routes/vendorAuth.js
import express from "express";
import {
  vendorSignup,
  vendorLogin,
  verifyToken,
  magicLogin,
  resendVerificationCode,
  verifySession
} from "../controllers/vendorAuthController.js";
import { getNotificationSummary } from "../controllers/vendorNotificationController.js";
import { verifyVendor } from "../middleware/vendorAuth.js";

// Import updated password reset functions
import {
  forgotPassword,
  verifyResetCode,
  resetPassword,
  resendResetCode
} from "../controllers/passwordResetController.js";
import { authLimiter, passwordResetLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

// Signup (sends verification code)
router.post("/signup", authLimiter, vendorSignup);

// Login (email/password) - requires verified + approved
router.post("/login", authLimiter, vendorLogin);

// Verify token (code) - POST { email, code }
router.post("/verify-token", authLimiter, verifyToken);

// Exchange magic token for auth JWT - POST { token }
router.post("/magic-login", authLimiter, magicLogin);

// Resend verification code - POST { email }
router.post("/resend-code", authLimiter, resendVerificationCode);

// Verify session - GET (Requires Token)
router.get("/verify-session", verifyVendor, verifySession);

// Get notification summary - GET (Requires Token)
router.get("/notification-summary", verifyVendor, getNotificationSummary);

// 🔐 PASSWORD RESET ENDPOINTS (USING CODES)

// Forgot password - sends 6-digit code
router.post("/forgot-password", passwordResetLimiter, (req, res) => {
  req.body.user_type = 'vendor';
  return forgotPassword(req, res);
});

// Verify reset code - POST { email, code, user_type: 'vendor' }
router.post("/verify-reset-code", passwordResetLimiter, (req, res) => {
  req.body.user_type = 'vendor';
  return verifyResetCode(req, res);
});

// Reset password after code verification - POST { reset_token, newPassword, user_type: 'vendor' }
router.post("/reset-password", passwordResetLimiter, (req, res) => {
  req.body.user_type = 'vendor';
  return resetPassword(req, res);
});

// Resend reset code - POST { email, user_type: 'vendor' }
router.post("/resend-reset-code", passwordResetLimiter, (req, res) => {
  req.body.user_type = 'vendor';
  return resendResetCode(req, res);
});

export default router;

