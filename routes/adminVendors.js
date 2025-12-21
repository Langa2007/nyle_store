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
// ================= PRODUCT APPROVAL ROUTES ================= //

// ✅ Get all pending products
router.get("/products/pending", getPendingProducts);
// ✅ Approve a product
router.post("/products/:id/approve", approveProduct);
// ✅ Reject a product
router.post("/products/:id/reject", rejectProduct);
// ✅ Bulk approve products
router.post("/products/bulk-approve", bulkApproveProducts);

export default router;
