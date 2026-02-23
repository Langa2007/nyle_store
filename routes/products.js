// products.js
import express from "express";
import {
  listProducts,
  getProductById,
  searchAndFilterProducts,
} from "../controllers/productController.js";
import { searchLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

router.get("/search", searchLimiter, searchAndFilterProducts);
router.get("/categories", (req, res, next) => {
  // Delegate to adminCategoryController
  import("../controllers/adminCategoryController.js").then(module => {
    module.getAllCategories(req, res);
  }).catch(next);
});
router.get("/", searchLimiter, listProducts);
router.get("/:id", getProductById);

export default router;
