// routes/reportRoutes.js
import express from "express";
import { 
  createSupportMessage as submitComplaint, 
  listSupportMessages as listComplaints, 
  updateSupportStatus as resolveComplaint 
} from "../controllers/supportController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";
import { reportLimiter, adminActionLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

// Public — submit a report (rate limited to 3 per hour)
router.post("/", reportLimiter, submitComplaint);

// Admin only
router.get("/", verifyAdmin, listComplaints);
router.put("/:id/resolve", verifyAdmin, adminActionLimiter, resolveComplaint);

export default router;
