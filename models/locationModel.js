// models/locationModel.js
import pool from '../db/connect.js';
import { getUsersIdSqlType } from '../db/userIdSchema.js';

/**
 * Initialize the user_locations table
 */
export const initLocationTable = async () => {
    const userIdSqlType = await getUsersIdSqlType();

    const query = `
    CREATE TABLE IF NOT EXISTS user_locations (
      id SERIAL PRIMARY KEY,
      user_id ${userIdSqlType} NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(100), -- e.g., "Home", "Office"
      address TEXT NOT NULL,
      latitude DECIMAL(10, 8),
      longitude DECIMAL(11, 8),
      is_default BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    await pool.query(query);
};

/**
 * Save or update a user's location
 */
export const saveUserLocation = async (userId, locationData) => {
    const { name, address, latitude, longitude, is_default } = locationData;

    // If is_default is true, unset other defaults for this user
    if (is_default) {
        await pool.query(
            'UPDATE user_locations SET is_default = false WHERE user_id = $1',
            [userId]
        );
    }

    const query = `
    INSERT INTO user_locations (user_id, name, address, latitude, longitude, is_default)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
    const result = await pool.query(query, [
        userId,
        name || 'Default',
        address,
        latitude,
        longitude,
        is_default || false
    ]);
    return result.rows[0];
};

/**
 * Get all saved locations for a user
 */
export const getUserLocations = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM user_locations WHERE user_id = $1 ORDER BY is_default DESC, updated_at DESC',
        [userId]
    );
    return result.rows;
};

/**
 * Get default location for a user
 */
export const getDefaultLocation = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM user_locations WHERE user_id = $1 AND is_default = true LIMIT 1',
        [userId]
    );
    return result.rows[0];
};

/**
 * Delete a specific location
 */
export const deleteLocation = async (locationId, userId) => {
    const result = await pool.query(
        'DELETE FROM user_locations WHERE id = $1 AND user_id = $2 RETURNING id',
        [locationId, userId]
    );
    return result.rowCount > 0;
};
