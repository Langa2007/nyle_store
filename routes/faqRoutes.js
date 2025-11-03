// routes/faqRoutes.js
import express from "express";
import { listFaqs, createFaq, deleteFaq } from "../controllers/faqController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", listFaqs);
router.post("/", verifyAdmin, createFaq);
router.delete("/:id", verifyAdmin, deleteFaq);

export default router;
