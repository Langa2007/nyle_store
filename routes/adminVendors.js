// routes/adminVendors.js
import express from "express";
import {
  getAllVendors,
  getPendingVendors,
  approveVendor,
  rejectVendor,
  deleteVendor,
} from "../controllers/adminVendorController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// ✅ Get all vendors (any status)
router.get("/", verifyAdmin, getAllVendors);

// ✅ Get only pending vendors
router.get("/pending", verifyAdmin, getPendingVendors);

// ✅ Approve vendor
router.patch("/:id/approve", verifyAdmin, approveVendor);

// ✅ Reject vendor
router.patch("/:id/reject", verifyAdmin, rejectVendor);

// ✅ Delete vendor
router.delete("/:id", verifyAdmin, deleteVendor);

export default router;
