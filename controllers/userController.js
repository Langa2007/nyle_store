// controllers/userController.js
import pool from '../db/connect.js';
import bcrypt from 'bcrypt';

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.query.user_id;
    if (!userId) return res.status(400).json({ error: 'user_id required' });

    const { rows } = await pool.query('SELECT id, name, email, created_at FROM users WHERE id=$1', [userId]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('getProfile failed', err);
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

// Simple register (for testing)
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });
    const hashed = await bcrypt.hash(password, 10);
    const { rows } = await pool.query('INSERT INTO users(name,email,password_hash) VALUES($1,$2,$3) RETURNING id, name, email', [name, email, hashed]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('register failed', err);
    res.status(500).json({ error: 'Failed to register' });
  }
};
