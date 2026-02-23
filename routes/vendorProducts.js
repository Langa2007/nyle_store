// routes/vendorProducts.js
import express from "express";
import { verifyVendor } from "../middleware/vendorAuth.js";
import {
  addProduct,
  getVendorProducts,
  updateProduct,
  deleteProduct,
  submitForApproval,
  getProductStats,
  upload
} from "../controllers/vendorProductsController.js";
import { checkProductLimit } from "../middleware/productLimitMiddleware.js";
import { vendorMutationLimiter, searchLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

// Add product — requires vendor auth, product limit check, and mutation limiter
router.post("/", verifyVendor, checkProductLimit, vendorMutationLimiter, upload, addProduct);

// Get vendor's own products
router.get("/", verifyVendor, searchLimiter, getVendorProducts);

// Update vendor product
router.put("/:id", verifyVendor, vendorMutationLimiter, upload, updateProduct);

// Delete vendor product
router.delete("/:id", verifyVendor, vendorMutationLimiter, deleteProduct);

// Get product stats
router.get("/stats", verifyVendor, getProductStats);

// Submit product for admin approval
router.post("/:id/submit", verifyVendor, vendorMutationLimiter, submitForApproval);

// Filter by status
router.get("/drafts", verifyVendor, (req, res) => {
  req.query = { ...req.query, status: 'draft' };
  return getVendorProducts(req, res);
});
router.get("/pending", verifyVendor, (req, res) => {
  req.query = { ...req.query, status: 'pending' };
  return getVendorProducts(req, res);
});

export default router;
