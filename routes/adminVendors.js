// routes/adminVendors.js
import express from "express";
import {
  getAllVendors,
  getPendingVendors,
  approveVendor,
  rejectVendor,
  deleteVendor,
} from "../controllers/adminVendorController.js";


const router = express.Router();

// ✅ Get all vendors (any status)
router.get("/",  getAllVendors);

// ✅ Get only pending vendors
router.get("/pending",  getPendingVendors);

// ✅ Approve vendor
router.patch("/:id/approve",  approveVendor);

// ✅ Reject vendor
router.patch("/:id/reject",  rejectVendor);

// ✅ Delete vendor
router.delete("/:id", deleteVendor);

export default router;
