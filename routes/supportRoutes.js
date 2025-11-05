// routes/supportRoutes.js
import express from "express";
import { body, validationResult } from "express-validator";
import {
  createSupportMessage,
  listSupportMessages,
  updateSupportStatus
} from "../controllers/supportController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/contact", createSupportMessage);
router.get("/messages", verifyAdmin, listSupportMessages);
router.patch("/messages/:id/status", verifyAdmin, updateSupportStatus);


export default router;
