// routes/adminRoutes.js
import express from "express";
import { getAllUsers, deleteUser, promoteUser } from "../controllers/adminController.js";
import { getAllVendors, approveVendor, rejectVendor } from "../controllers/adminVendorController.js";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../controllers/adminCategoryController.js";
import { getAllProducts, deleteProduct, updateStock } from "../controllers/adminProductController.js";
import { getAllOrders, updateOrderStatus } from "../controllers/adminOrderController.js";
import { verifyAdmin } from "../middleware/adminAuth.js"; // ✅ only admins can access these routes

const router = express.Router();

// --- Users ---
router.get("/users",verifyAdmin, getAllUsers);// only admin can view all users
router.delete("/users/:id",verifyAdmin, deleteUser);// only admin can delete users
router.put("/users/:id/promote",verifyAdmin, promoteUser);// only admin can promote users

// --- Vendors ---
router.get("/vendors", getAllVendors);// only admin can view all vendors
router.put("/vendors/:id/approve", approveVendor);// only admin can approve vendors
router.put("/vendors/:id/reject",rejectVendor);// only admin can reject vendors

// --- Categories ---
router.post("/categories", createCategory);// only admin can create categories
router.get("/categories", getAllCategories);// public route
router.put("/categories/:id", updateCategory);// only admin can update categories
router.delete("/categories/:id", deleteCategory);// only admin can delete categories

// --- Products ---
router.get("/products", getAllProducts);// only admin can view all products
router.delete("/products/:id", deleteProduct);// only admin can delete products
router.put("/products/:id/stock", updateStock);// only admin can update stock

// --- Orders ---
router.get("/orders", getAllOrders);// only admin can view all orders
router.put("/orders/:id/status", updateOrderStatus);// only admin can update order status

export default router;
