import express from "express";
import {
  getWishlist,
  removeWishlistItem,
  syncWishlist,
  toggleWishlistItem,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", getWishlist);
router.post("/toggle", toggleWishlistItem);
router.post("/sync", syncWishlist);
router.delete("/items/:productId", removeWishlistItem);

export default router;
