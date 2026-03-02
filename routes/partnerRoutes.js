// routes/partnerRoutes.js
import express from 'express';
import PartnerController from '../controllers/partnerController.js';
// import { authenticateAdmin } from '../middleware/authMiddleware.js'; // Assuming you have admin auth

const router = express.Router();

// Public route for partner application
router.post('/apply', PartnerController.apply);

// Admin routes (should be protected)
router.get('/applications', PartnerController.getApplications);
router.put('/applications/:id/status', PartnerController.updateStatus);

export default router;
