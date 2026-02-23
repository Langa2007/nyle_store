// routes/reportRoutes.js
import express from "express";
import { createReport, listReports, updateReportStatus } from "../controllers/reportController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";
import { reportLimiter, adminActionLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

// Public — submit a report (rate limited)
router.post("/", reportLimiter, createReport);

// Admin only
router.get("/", verifyAdmin, listReports);
router.patch("/:id/status", verifyAdmin, adminActionLimiter, updateReportStatus);

export default router;
