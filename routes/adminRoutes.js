// routes/adminRoutes.js
import express from "express";
import { verifyAdmin } from "../middleware/adminAuth.js";
import { adminActionLimiter, searchLimiter } from "../middleware/rateLimit.js";

import {
  getAllUsers,
  getUserSummary,
  searchUsers,
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
  upload as categoryUpload
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
  adminToggleHotDeal,
  upload as productUpload
} from "../controllers/adminProductController.js";

import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminOrderController.js";

import {
  getPendingProducts,
  approveProduct,
  rejectProduct,
  approveDeal,
  rejectDeal
} from "../controllers/adminProductApprovalController.js";

import {
  createSlide,
  getAllSlides,
  updateSlide,
  deleteSlide
} from "../controllers/adminHeroController.js";

const router = express.Router();

//  PRODUCTS 
router.post("/products", verifyAdmin, adminActionLimiter, productUpload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'gallery_images', maxCount: 5 }]), adminCreateProduct);
router.get("/products", verifyAdmin, searchLimiter, adminGetAllProducts);
router.put("/products/:id", verifyAdmin, adminActionLimiter, productUpload.single("image"), adminUpdateProduct);
router.put("/products/:id/stock", verifyAdmin, adminActionLimiter, adminUpdateStock);
router.put("/products/:id/toggle-hot-deal", verifyAdmin, adminActionLimiter, adminToggleHotDeal);
router.delete("/products/:id", verifyAdmin, adminActionLimiter, adminDeleteProduct);

// VENDOR PRODUCT APPROVALS
router.get("/products/pending", verifyAdmin, getPendingProducts);
router.put("/products/:id/approve", verifyAdmin, adminActionLimiter, approveProduct);
router.put("/products/:id/reject", verifyAdmin, adminActionLimiter, rejectProduct);
router.put("/products/:id/approve-deal", verifyAdmin, adminActionLimiter, approveDeal);
router.put("/products/:id/reject-deal", verifyAdmin, adminActionLimiter, rejectDeal);


// PRODUCT VENDOR HELPERS
router.post("/vendors/create-or-select", verifyAdmin, adminActionLimiter, productUpload.fields([{ name: 'company_logo', maxCount: 1 }]), createOrSelectVendor);
router.get("/vendors/active-list", verifyAdmin, getActiveVendors);
router.get("/vendors/details/:id", verifyAdmin, getVendorDetails);
router.get("/vendors/:vendor_id/products", verifyAdmin, getProductsByVendor);

//  USERS
router.get("/users/summary", verifyAdmin, getUserSummary);
router.get("/users/search", verifyAdmin, searchLimiter, searchUsers);
router.get("/users", verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyAdmin, adminActionLimiter, deleteUser);
router.put("/users/:id/promote", verifyAdmin, adminActionLimiter, promoteUser);

//  VENDORS (Admin Management) 
router.get("/vendors", verifyAdmin, searchLimiter, getAllVendors);
router.put("/vendors/:id/approve", verifyAdmin, adminActionLimiter, approveVendor);
router.put("/vendors/:id/reject", verifyAdmin, adminActionLimiter, rejectVendor);

//  CATEGORIES 
router.post("/categories", verifyAdmin, adminActionLimiter, categoryUpload, createCategory);
router.get("/categories", getAllCategories); // public read — covered by publicLimiter globally
router.put("/categories/:id", verifyAdmin, adminActionLimiter, categoryUpload, updateCategory);
router.delete("/categories/:id", verifyAdmin, adminActionLimiter, deleteCategory);

//  ORDERS 
router.get("/orders", verifyAdmin, getAllOrders);
router.put("/orders/:id/status", verifyAdmin, adminActionLimiter, updateOrderStatus);

//  HERO SLIDES
router.post("/hero-slides", verifyAdmin, adminActionLimiter, productUpload.single("image"), createSlide);
router.get("/hero-slides", verifyAdmin, getAllSlides);
router.put("/hero-slides/:id", verifyAdmin, adminActionLimiter, productUpload.single("image"), updateSlide);
router.delete("/hero-slides/:id", verifyAdmin, adminActionLimiter, deleteSlide);

export default router;
