// routes/locationRoutes.js
import express from 'express';
import {
    handleSaveLocation,
    handleGetLocations,
    handleDeleteLocation
} from '../controllers/locationController.js';
import { authMiddleware } from '../middleware/adminAuth.js'; // Assuming this is the general user auth middleware

const router = express.Router();

/**
 * Public/User-facing routes
 */

// Save a new location (requires auth)
router.post('/', authMiddleware, handleSaveLocation);

// Get list of locations for a user (requires auth)
router.get('/', authMiddleware, handleGetLocations);

// Delete a location (requires auth)
router.delete('/:id', authMiddleware, handleDeleteLocation);

export default router;
