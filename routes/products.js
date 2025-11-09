// products.js
import express from "express";
import upload from "../middleware/upload.js";
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

router.get("/search",  searchAndFilterProducts);
router.post("/",  handleCreateProduct);
router.get("/",  handleGetAllProducts);
router.get("/:id", handleGetProductById);
router.put("/:id",  handleUpdateProduct);
router.delete("/:id",  handleDeleteProduct);
router.put("/:id/stock", updateProductStock);
router.post("/", upload.single("image"), handleCreateProduct);

export default router;
