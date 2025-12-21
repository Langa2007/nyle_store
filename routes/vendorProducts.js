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
} from "../controllers/vendorProductsController.js";
import { checkProductLimit } from "../middleware/productLimitMiddleware.js";

const router = express.Router();

// Add product
router.post("/", verifyVendor, addProduct);

// Get vendor’s products
router.get("/", verifyVendor, getVendorProducts);

// Update vendor product
router.put("/:id", verifyVendor, updateProduct);

// Delete vendor product
router.delete("/:id", verifyVendor, deleteProduct);
// Get product stats
router.get("/stats", verifyVendor, getProductStats);



// Apply product limit middleware to product creation
router.post("/products", checkProductLimit, addProduct);
router.get("/products", getVendorProducts);
router.put("/products/:id", updateProduct);
router.post("/products/:id/submit", submitForApproval);
router.get("/products/drafts", (req, res) => {
  req.query = { status: 'draft' };
  return getVendorProducts(req, res);
});
router.get("/products/pending", (req, res) => {
  req.query = { status: 'pending' };
  return getVendorProducts(req, res);
});

export default router;
