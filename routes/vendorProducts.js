// routes/vendorProducts.js
import express from "express";
import { verifyVendor } from "../middleware/vendorAuth.js";
import {
  addProduct,
  getVendorProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/vendorProductsController.js";

const router = express.Router();

// Add product
router.post("/", verifyVendor, addProduct);

// Get vendor’s products
router.get("/", verifyVendor, getVendorProducts);

// Update vendor product
router.put("/:id", verifyVendor, updateProduct);

// Delete vendor product
router.delete("/:id", verifyVendor, deleteProduct);

export default router;
