// controllers/productsController.js
import pool from '../db/connect.js'; // adjust path

export const listProducts = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, name, description, price, image, stock FROM products ORDER BY created_at DESC LIMIT 100');
    res.json(rows);
  } catch (err) {
    console.error('Failed to list products', err);
    res.status(500).json({ error: 'Failed to list products' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT id, name, description, price, image, stock FROM products WHERE id=$1', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Failed to fetch product', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};
