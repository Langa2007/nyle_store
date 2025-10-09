// controllers/vendorController.js
import pool from "../db/connect.js";

// Vendor applies for account
export const createVendor = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO vendors (name, email, phone, address, status)
       VALUES ($1, $2, $3, $4, 'pending') RETURNING *`,
      [name, email, phone, address]
    );
    res.status(201).json({
      vendor: result.rows[0],
      message: "Application received. Awaiting approval.",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Vendor views their own profile (after login)
export const myVendor = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM vendors WHERE id=$1",
      [req.user.vendor_id]
    );
    res.json(result.rows[0] || null);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vendor", details: err.message });
  }
};

// Admin: List all vendors
export const getAllVendors = async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM vendors ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vendors", details: err.message });
  }
};

// Admin: Approve vendor
export const approveVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE vendors SET status = 'approved' WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.status(200).json({ message: "Vendor approved", vendor: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to approve vendor", details: err.message });
  }
};

// Admin: Reject vendor
export const rejectVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE vendors SET status = 'rejected' WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.status(200).json({ message: "Vendor rejected", vendor: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to reject vendor", details: err.message });
  }
};
