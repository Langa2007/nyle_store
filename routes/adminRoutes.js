import express from "express";
import { verifyAdmin } from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";

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
  adminCreateProduct,
  adminDeleteProduct,
  adminGetAllProducts,
  adminUpdateStock,
} from "../controllers/adminProductController.js";

import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminOrderController.js";

const router = express.Router();

//  PRODUCTS
router.post("/products", upload.single("image"), adminCreateProduct);
router.get("/products", adminGetAllProducts);
router.put("/products/:id/stock", adminUpdateStock);
router.delete("/products/:id", adminDeleteProduct);

//  USERS
router.get("/users", verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyAdmin, deleteUser);
router.put("/users/:id/promote", verifyAdmin, promoteUser);

//  VENDORS
router.get("/vendors", getAllVendors);
router.put("/vendors/:id/approve", approveVendor);
router.put("/vendors/:id/reject", rejectVendor);

//  CATEGORIES
router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

//  ORDERS
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);

export default router;
