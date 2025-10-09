// routes/vendors.js
import express from "express";
import {
  createVendor,
  myVendor,
  getAllVendors,
  approveVendor,
  rejectVendor,
} from "../controllers/vendorController.js";
import { verifyAdmin } from "../middleware/adminAuth.js"; // if you have admin middleware
import { verifyVendor } from "../middleware/vendorAuth.js"; // if you have vendor middleware

const router = express.Router();

// Vendor applies
router.post("/apply", createVendor);

// Vendor profile (vendor must be logged in)
router.get("/me", verifyVendor, myVendor);

// Admin: list vendors
router.get("/", verifyAdmin, getAllVendors);

// Admin: approve vendor
router.put("/:id/approve", verifyAdmin, approveVendor);

// Admin: reject vendor
router.put("/:id/reject", verifyAdmin, rejectVendor);

export default router;
