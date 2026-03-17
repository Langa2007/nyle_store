import express from 'express';
import { getActiveSlides } from '../controllers/adminHeroController.js';

const router = express.Router();

router.get('/active', getActiveSlides);

export default router;
