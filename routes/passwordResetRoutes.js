import express from 'express';
import {
    forgotPassword,
    resetPassword,
    validateResetToken,
    renderResetPage
} from '../controllers/passwordResetController.js';

const router = express.Router();

// PUBLIC: REQUEST PASSWORD RESET
router.post('/vendor/auth/forgot-password', forgotPassword);

// PUBLIC: VALIDATE RESET TOKEN
router.get('/vendor/auth/validate-reset-token', validateResetToken);

// PUBLIC: RENDER RESET PASSWORD PAGE (FOR SERVING HTML)
router.get('/vendor/reset-password', renderResetPage);
// PUBLIC: RESET PASSWORD
router.post('/vendor/auth/reset-password', resetPassword);
export default router;
