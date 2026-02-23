// routes/adminVendors.js
import express from "express";
import {
  getAllVendors,
  getPendingVendors,
  approveVendor,
  rejectVendor,
  deleteVendor,
} from "../controllers/adminVendorController.js";
import {
  getPendingProducts,
  approveProduct,
  rejectProduct,
  bulkApproveProducts
} from "../controllers/adminProductApprovalController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";
import { adminActionLimiter, searchLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

// ── VENDOR MANAGEMENT ─────────────────────────────────────────────────────────
router.get("/", verifyAdmin, searchLimiter, getAllVendors);
router.get("/pending", verifyAdmin, searchLimiter, getPendingVendors);
router.patch("/:id/approve", verifyAdmin, adminActionLimiter, approveVendor);
router.patch("/:id/reject", verifyAdmin, adminActionLimiter, rejectVendor);
router.delete("/:id", verifyAdmin, adminActionLimiter, deleteVendor);

// ── PRODUCT APPROVAL ROUTES ───────────────────────────────────────────────────
router.get("/products/pending", verifyAdmin, getPendingProducts);
router.post("/products/:id/approve", verifyAdmin, adminActionLimiter, approveProduct);
router.post("/products/:id/reject", verifyAdmin, adminActionLimiter, rejectProduct);
router.post("/products/bulk-approve", verifyAdmin, adminActionLimiter, bulkApproveProducts);

export default router;
