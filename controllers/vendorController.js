
const { pool } = require('../db/connect');

exports.createVendor = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const v = await pool.query(
      `INSERT INTO vendors (name, email, phone, address, status)
       VALUES ($1,$2,$3,$4,'pending') RETURNING *`,
      [name, email, phone, address]
    );
    // Optionally create vendor_members row linking this user as vendor_admin after payment succeed webhook
    res.status(201).json({ vendor: v.rows[0], message: 'Application received. Awaiting approval.' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.listVendors = async (_req, res) => {
  const r = await pool.query('SELECT * FROM vendors ORDER BY created_at DESC');
  res.json(r.rows);
};

exports.approveVendor = async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE vendors SET status='active' WHERE id=$1`, [id]);
  res.json({ message: 'Vendor approved' });
};

exports.myVendor = async (req, res) => {
  const r = await pool.query('SELECT * FROM vendors WHERE id=$1', [req.user.vendor_id]);
  res.json(r.rows[0] || null);
};
