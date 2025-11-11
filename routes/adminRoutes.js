// routes/adminRoutes.js
import express from "express";
import { verifyAdmin } from "../middleware/adminAuth.js";
import { upload, handleCreateProduct } from "../controllers/productController.js";
import {
  getAllUsers,
  deleteUser,
  promoteUser,
} from "../controllers/adminController.js";
import {
  getAllVendors,
  approveVendor,
  rejectVendor,
} from "../controllers/adminVendorController.js";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/adminCategoryController.js";
import {
  getAllProducts,
  deleteProduct,
  updateStock,
} from "../controllers/adminProductController.js";
import { getAllOrders, updateOrderStatus } from "../controllers/adminOrderController.js";

const router = express.Router();

// ✅ Products (most important route)
router.post("/products", verifyAdmin, upload.single("image"), handleCreateProduct);

// --- Users ---
router.get("/users", verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyAdmin, deleteUser);
router.put("/users/:id/promote", verifyAdmin, promoteUser);

// --- Vendors ---
router.get("/vendors", verifyAdmin, getAllVendors);
router.put("/vendors/:id/approve", verifyAdmin, approveVendor);
router.put("/vendors/:id/reject", verifyAdmin, rejectVendor);

// --- Categories ---
router.post("/categories", verifyAdmin, createCategory);
router.get("/categories", verifyAdmin, getAllCategories);
router.put("/categories/:id", verifyAdmin, updateCategory);
router.delete("/categories/:id", verifyAdmin, deleteCategory);

// --- Orders ---
router.get("/orders", verifyAdmin, getAllOrders);
router.put("/orders/:id/status", verifyAdmin, updateOrderStatus);

export default router;
