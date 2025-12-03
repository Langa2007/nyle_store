// products.js
import express from "express";
import {
  listProducts,
  getProductById,
  searchAndFilterProducts,
  
} from "../controllers/productController.js";

const router = express.Router();

router.get("/search",  searchAndFilterProducts);
router.get("/",  listProducts);
router.get("/:id", getProductById);

export default router;
