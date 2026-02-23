// routes/users.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/usersController.js';
import { authLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// POST /api/users/register
router.post('/register', authLimiter, registerUser);

// POST /api/users/login
router.post('/login', authLimiter, loginUser);

export default router;
