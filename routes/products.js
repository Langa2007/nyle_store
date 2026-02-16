// products.js
import express from "express";
import {
  listProducts,
  getProductById,
  searchAndFilterProducts,

} from "../controllers/productController.js";

const router = express.Router();

router.get("/search", searchAndFilterProducts);
router.get("/categories", (req, res, next) => {
  // We'll delegate to the admin controller or moved logic
  import("../controllers/adminCategoryController.js").then(module => {
    module.getAllCategories(req, res);
  }).catch(next);
});
router.get("/", listProducts);
router.get("/:id", getProductById);

export default router;
