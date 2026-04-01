import express from "express";
import {
  clearRecentlyViewed,
  getRecentlyViewed,
  syncRecentlyViewed,
  trackRecentlyViewed,
} from "../controllers/recentlyViewedController.js";

const router = express.Router();

router.get("/", getRecentlyViewed);
router.post("/", trackRecentlyViewed);
router.post("/sync", syncRecentlyViewed);
router.delete("/", clearRecentlyViewed);

export default router;
