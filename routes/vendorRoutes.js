// routes/vendorRoutes.js
import express from "express";
import { pool } from "../db/connect.js";

const router = express.Router();

// --- Get all pending vendors (admin only) ---
router.get("/pending", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, legal_name, company_name, email, status, is_verified FROM vendors WHERE status = 'pending'"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch pending vendors error:", err);
    res.status(500).json({ message: "Error fetching pending vendors" });
  }
});

// --- Approve vendor ---
router.put("/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("UPDATE vendors SET status = 'approved' WHERE id = $1", [id]);
    res.json({ message: "Vendor approved" });
  } catch (err) {
    console.error("Approve vendor error:", err);
    res.status(500).json({ message: "Error approving vendor" });
  }
});

// --- Reject vendor ---
router.put("/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("UPDATE vendors SET status = 'rejected' WHERE id = $1", [id]);
    res.json({ message: "Vendor rejected" });
  } catch (err) {
    console.error("Reject vendor error:", err);
    res.status(500).json({ message: "Error rejecting vendor" });
  }
});

export default router;
