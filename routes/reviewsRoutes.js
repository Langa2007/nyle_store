import express from "express";
import {
  submitReview,
  listReviews,
  updateReviewStatus
} from "../controllers/reviewsController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";
import { contactLimiter } from "../middleware/rateLimit.js"; // Reuse contact limiter

const router = express.Router();

router.post("/", contactLimiter, submitReview);
router.get("/admin/list", verifyAdmin, listReviews);
router.patch("/admin/:id/status", verifyAdmin, updateReviewStatus);

export default router;
