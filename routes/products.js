// products.js
import express from "express";
import { verifyAdmin } from "../middleware/adminAuth.js";
import {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetProductById,
  searchAndFilterProducts,
  handleUpdateProduct,
  handleDeleteProduct,
  updateProductStock
} from "../controllers/productController.js";

const router = express.Router();

router.get("/search", verifyAdmin, searchAndFilterProducts);
router.post("/", verifyAdmin, handleCreateProduct);
router.get("/", verifyAdmin, handleGetAllProducts);
router.get("/:id", verifyAdmin, handleGetProductById);
router.put("/:id", verifyAdmin, handleUpdateProduct);
router.delete("/:id", verifyAdmin, handleDeleteProduct);
router.put("/:id/stock", verifyAdmin, updateProductStock);

export default router;
