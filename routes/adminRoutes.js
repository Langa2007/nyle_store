// routes/adminRoutes.js
import express from "express";
import { verifyAdmin } from "../middleware/adminAuth.js";
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
  upload,
  handleCreateProduct,
  handleGetProductById,
  handleGetAllProducts,
  handleUpdateProduct,
  handleDeleteProduct
} from "../controllers/productController.js";
import { getAllOrders, updateOrderStatus } from "../controllers/adminOrderController.js";

const router = express.Router();

// ✅ Products (most important route)
router.post("/products",  upload.single("image"), handleCreateProduct);
router.get("/products", handleGetAllProducts);
router.get("/products/:id", handleGetProductById);
router.put("/products/:id", upload.single("image"), handleUpdateProduct);
router.delete("/products/:id", handleDeleteProduct);

// --- Users ---
router.get("/users", verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyAdmin, deleteUser);
router.put("/users/:id/promote", verifyAdmin, promoteUser);

// --- Vendors ---
router.get("/vendors", getAllVendors);
router.put("/vendors/:id/approve",  approveVendor);
router.put("/vendors/:id/reject",  rejectVendor);

// --- Categories ---
router.post("/categories",  createCategory);
router.get("/categories",  getAllCategories);
router.put("/categories/:id",  updateCategory);
router.delete("/categories/:id",  deleteCategory);

// --- Orders ---
router.get("/orders", getAllOrders);
router.put("/orders/:id/status",  updateOrderStatus);

export default router;
