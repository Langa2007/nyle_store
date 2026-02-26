// controllers/locationController.js
import * as LocationModel from '../models/locationModel.js';

/**
 * Handle saving a new location
 */
export const handleSaveLocation = async (req, res) => {
    const { name, address, latitude, longitude, is_default } = req.body;
    const userId = req.user?.id || req.body.user_id; // Support both auth middleware or direct body (for testing)

    if (!userId) {
        return res.status(401).json({ error: 'User identification required' });
    }

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const location = await LocationModel.saveUserLocation(userId, {
            name,
            address,
            latitude,
            longitude,
            is_default
        });
        res.status(201).json({ message: 'Location saved successfully', location });
    } catch (err) {
        console.error('Error saving location:', err.message);
        res.status(500).json({ error: 'Failed to save location' });
    }
};

/**
 * Handle fetching user locations
 */
export const handleGetLocations = async (req, res) => {
    const userId = req.user?.id || req.query.user_id;

    if (!userId) {
        return res.status(401).json({ error: 'User identification required' });
    }

    try {
        const locations = await LocationModel.getUserLocations(userId);
        res.status(200).json({ locations });
    } catch (err) {
        console.error('Error fetching locations:', err.message);
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
};

/**
 * Handle deleting a location
 */
export const handleDeleteLocation = async (req, res) => {
    const locationId = req.params.id;
    const userId = req.user?.id || req.body.user_id;

    if (!userId) {
        return res.status(401).json({ error: 'User identification required' });
    }

    try {
        const success = await LocationModel.deleteLocation(locationId, userId);
        if (!success) {
            return res.status(404).json({ error: 'Location not found or not owned by user' });
        }
        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (err) {
        console.error('Error deleting location:', err.message);
        res.status(500).json({ error: 'Failed to delete location' });
    }
};
