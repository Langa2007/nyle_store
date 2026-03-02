import express from "express";
import { submitLead, getLeads, updateLeadStatus, sendLeadSignupLink } from "../controllers/vendorLeadController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// Public lead submission
router.post("/submit", submitLead);

// Protected admin routes
router.get("/", verifyAdmin, getLeads);
router.patch("/:id", verifyAdmin, updateLeadStatus);
router.post("/:id/send-link", verifyAdmin, sendLeadSignupLink);

export default router;
