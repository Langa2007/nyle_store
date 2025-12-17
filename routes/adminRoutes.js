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
  adminCreateProduct,
  adminDeleteProduct,
  adminGetAllProducts,
  adminUpdateProduct,
  adminUpdateStock,
  createOrSelectVendor,
  getAllVendors as getActiveVendors,
  getVendorDetails,
  getProductsByVendor,
  upload as productUpload
} from "../controllers/adminProductController.js";

import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminOrderController.js";

const router = express.Router();

//  PRODUCTS
router.post("/products", productUpload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'gallery_images', maxCount: 5 }]), adminCreateProduct);
router.get("/products", adminGetAllProducts);
router.put("/products/:id", productUpload.single("image"), adminUpdateProduct);
router.put("/products/:id/stock", adminUpdateStock);
router.delete("/products/:id", adminDeleteProduct);

// PRODUCT VENDOR HELPERS
router.post("/vendors/create-or-select", productUpload.fields([{ name: 'company_logo', maxCount: 1 }]), createOrSelectVendor);
router.get("/vendors/active-list", getActiveVendors);
router.get("/vendors/details/:id", getVendorDetails);
router.get("/vendors/:vendor_id/products", getProductsByVendor);

//  USERS
router.get("/users", verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyAdmin, deleteUser);
router.put("/users/:id/promote", verifyAdmin, promoteUser);

//  VENDORS (Admin Management)
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
