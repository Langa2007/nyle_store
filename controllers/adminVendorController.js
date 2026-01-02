// controllers/adminVendorController.js
import  pool  from "../db/connect.js";

//  Get all vendors (any status)
export const getAllVendors = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, legal_name, company_name, email, status, is_verified, created_at FROM vendors ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching all vendors:", err);
    res.status(500).json({ message: "Server error fetching vendors" });
  }
};

//  Get only pending vendors
export const getPendingVendors = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, legal_name, company_name, email, status, is_verified, created_at FROM vendors WHERE status = 'pending' ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching pending vendors:", err);
    res.status(500).json({ message: "Server error fetching pending vendors" });
  }
};

//  Approve vendor
export const approveVendor = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("UPDATE vendors SET status = 'approved' WHERE id = $1", [id]);
    res.json({ message: "Vendor approved successfully" });
  } catch (err) {
    console.error("Error approving vendor:", err);
    res.status(500).json({ message: "Server error approving vendor" });
  }
};

//  Reject vendor
export const rejectVendor = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("UPDATE vendors SET status = 'rejected' WHERE id = $1", [id]);
    res.json({ message: "Vendor rejected successfully" });
  } catch (err) {
    console.error("Error rejecting vendor:", err);
    res.status(500).json({ message: "Server error rejecting vendor" });
  }
};
// Delete vendor
export const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM vendors WHERE id=$1", [id]);
    res.json({ message: "Vendor deleted successfully" });
  } catch (err) {
    console.error("Delete vendor error:", err);
    res.status(500).json({ message: "Error deleting vendor" });
  }
};
