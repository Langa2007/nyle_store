// routes/adminAuthRoutes.js
import express from "express";
import {
    adminLogin,
    refreshAdminToken,
    verifyAdminToken
} from "../controllers/adminAuthController.js";

const router = express.Router();

// POST /api/admin/login
router.post("/login", adminLogin)

// POST /api/admin/refresh-token
router.post("/refresh-token", refreshAdminToken)

// GET /api/admin/verify-token
router.get("/verify-token", verifyAdminToken)

export default router;
