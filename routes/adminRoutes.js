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
router.get("/vendors",  getAllVendors);
router.put("/vendors/:id/approve", approveVendor);
router.put("/vendors/:id/reject", rejectVendor);

// --- Categories ---
router.post("/categories", createCategory);
router.get("/categories",  getAllCategories);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id",  deleteCategory);

// --- Products (Admin CRUD) ---
router.post("/products", upload.single("image"),  handleCreateProduct);
router.get("/products",  handleGetAllProducts);
router.put("/products/:id", upload.single("image"),  handleUpdateProduct);
router.delete("/products/:id",  handleDeleteProduct);

// --- Orders ---
router.get("/orders", verifyAdmin, getAllOrders);
router.put("/orders/:id/status", verifyAdmin, updateOrderStatus);

export default router;
