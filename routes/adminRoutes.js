// routes/adminRoutes.js
import express from "express";
import { getAllUsers, deleteUser, promoteUser } from "../controllers/adminController.js";
import { getAllVendors, approveVendor, rejectVendor } from "../controllers/adminVendorController.js";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../controllers/adminCategoryController.js";
import { getAllOrders, updateOrderStatus } from "../controllers/adminOrderController.js";
import { handleCreateProduct, handleGetAllProducts, handleDeleteProduct, handleUpdateProduct } from "../controllers/productController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";
import  upload  from "../middleware/upload.js";

const router = express.Router();

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

// --- Products (Admin CRUD) ---
router.post("/products", upload.single("image"), verifyAdmin, handleCreateProduct);
router.get("/products", verifyAdmin, handleGetAllProducts);
router.put("/products/:id", upload.single("image"), verifyAdmin, handleUpdateProduct);
router.delete("/products/:id", verifyAdmin, handleDeleteProduct);

// --- Orders ---
router.get("/orders", verifyAdmin, getAllOrders);
router.put("/orders/:id/status", verifyAdmin, updateOrderStatus);

export default router;
