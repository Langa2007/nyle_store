import express from 'express';
import {
    forgotPassword,
    verifyResetCode,
    resetPassword,
    resendResetCode
} from '../controllers/passwordResetController.js';

const router = express.Router();

// 🔐 VENDOR PASSWORD RESET ROUTES (USING 6-DIGIT CODES)

// 1. Request password reset - sends 6-digit code to email
router.post('/vendor/auth/forgot-password', (req, res) => {
    req.body.user_type = 'vendor';
    return forgotPassword(req, res);
});

// 2. Verify reset code - checks if 6-digit code is valid
router.post('/vendor/auth/verify-reset-code', (req, res) => {
    req.body.user_type = 'vendor';
    return verifyResetCode(req, res);
});

// 3. Reset password - uses token from verified code to set new password
router.post('/vendor/auth/reset-password', (req, res) => {
    req.body.user_type = 'vendor';
    return resetPassword(req, res);
});

// 4. Resend reset code - sends new 6-digit code
router.post('/vendor/auth/resend-reset-code', (req, res) => {
    req.body.user_type = 'vendor';
    return resendResetCode(req, res);
});

// 5. USER PASSWORD RESET ROUTES (for regular users)

// Request password reset for users
router.post('/auth/forgot-password', (req, res) => {
    req.body.user_type = 'user';
    return forgotPassword(req, res);
});

// Verify reset code for users
router.post('/auth/verify-reset-code', (req, res) => {
    req.body.user_type = 'user';
    return verifyResetCode(req, res);
});

// Reset password for users
router.post('/auth/reset-password', (req, res) => {
    req.body.user_type = 'user';
    return resetPassword(req, res);
});

// Resend reset code for users
router.post('/auth/resend-reset-code', (req, res) => {
    req.body.user_type = 'user';
    return resendResetCode(req, res);
});

export default router;