// userRoutes.js - For customer frontend
import express from "express";
import { forgotPassword, resetPassword } from "../controllers/passwordResetController.js";
import { passwordResetLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

// CUSTOMER PASSWORD RESET
router.post("/auth/forgot-password", passwordResetLimiter, (req, res) => {
  req.body.user_type = 'user';
  forgotPassword(req, res);
});

router.post("/auth/reset-password", passwordResetLimiter, (req, res) => {
  req.body.user_type = 'user';
  resetPassword(req, res);
});

export default router;
