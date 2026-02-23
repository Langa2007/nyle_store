// routes/faqRoutes.js
import express from "express";
import { listFaqs, createFaq, deleteFaq } from "../controllers/faqController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";
import { searchLimiter, adminActionLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

// Public — limited to prevent abuse
router.get("/", searchLimiter, listFaqs);

// Admin only
router.post("/", verifyAdmin, adminActionLimiter, createFaq);
router.delete("/:id", verifyAdmin, adminActionLimiter, deleteFaq);

export default router;
