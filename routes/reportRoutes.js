// routes/reportRoutes.js
import express from "express";
import { createReport, listReports, updateReportStatus } from "../controllers/reportController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/", createReport);
router.get("/", verifyAdmin, listReports);
router.patch("/:id/status", verifyAdmin, updateReportStatus);

export default router;
