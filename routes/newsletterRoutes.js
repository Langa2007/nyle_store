import express from "express";
import { subscribeNewsletter, getSubscribers, sendAnnouncement } from "../controllers/newsletterController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// public
router.post("/subscribe", subscribeNewsletter);

// admin
router.get("/subscribers", verifyAdmin, getSubscribers);
router.post("/send", verifyAdmin, sendAnnouncement);

export default router;
