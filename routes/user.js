// routes/user.js
import express from 'express';
import { getProfile, register } from '../controllers/userController.js';
import { authLimiter } from '../middleware/rateLimit.js';
const router = express.Router();

router.get('/:id', getProfile);
router.post('/register', authLimiter, register);

export default router;
