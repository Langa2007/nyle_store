// routes/adminRoutes.js
import express from "express";
import { getAllUsers, deleteUser, promoteUser } from "../controllers/adminController.js";
import { getAllVendors, approveVendor, rejectVendor } from "../controllers/adminVendorController.js";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../controllers/adminCategoryController.js";
import { getAllProducts, deleteProduct, updateStock } from "../controllers/adminProductController.js";
import { getAllOrders, updateOrderStatus } from "../controllers/adminOrderController.js";
import { verifyAdmin } from "../middleware/adminAuth.js"; // ✅ only admins can access these routes
import { handleCreateProduct } from "../controllers/productController.js";

const router = express.Router();

// --- Users ---
router.get("/users",verifyAdmin, getAllUsers);// only admin can view all users
router.delete("/users/:id",verifyAdmin, deleteUser);// only admin can delete users
router.put("/users/:id/promote",verifyAdmin, promoteUser);// only admin can promote users

// --- Vendors ---
router.get("/vendors", getAllVendors);
router.put("/vendors/:id/approve", approveVendor);
router.put("/vendors/:id/reject",rejectVendor);

// --- Categories ---
router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// --- Products ---
router.post("/products", handleCreateProduct);
router.get("/products", getAllProducts);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id/stock", updateStock);

// --- Orders ---
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);

export default router;
