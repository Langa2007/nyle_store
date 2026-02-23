import express from "express";
import { subscribeNewsletter, getSubscribers, sendAnnouncement } from "../controllers/newsletterController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";
import { newsletterLimiter, adminActionLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

// Public — subscribe (rate limited)
router.post("/subscribe", newsletterLimiter, subscribeNewsletter);

// Admin — view subscribers list
router.get("/subscribers", verifyAdmin, getSubscribers);

// Admin — send newsletter (also rate limited to prevent runaway sends)
router.post("/send", verifyAdmin, adminActionLimiter, sendAnnouncement);

export default router;
