// routes/user.js
import express from 'express';
import { getProfile, register, updateCookiePreferences } from '../controllers/userController.js';
import { authLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.get('/:id', getProfile);
router.post('/register', authLimiter, register);
router.post('/cookie-preferences', updateCookiePreferences);

export default router;
