// routes/users.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/usersController.js';

const router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/login
router.post('/login', loginUser);

export default router;
