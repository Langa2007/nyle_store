// routes/user.js
import express from 'express';
import { getProfile, register } from '../controllers/userController.js';
const router = express.Router();

router.get('/:id', getProfile);
router.post('/register', register);

export default router;
