// routes/partnerRoutes.js
import express from 'express';
import PartnerController from '../controllers/partnerController.js';
import { verifyAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Public route for partner application
router.post('/apply', PartnerController.apply);

// Admin routes (should be protected)
router.get('/applications', verifyAdmin, PartnerController.getApplications);
router.put('/applications/:id/contacted', verifyAdmin, PartnerController.markContacted);
router.put('/applications/:id/status', verifyAdmin, PartnerController.updateStatus);

export default router;
