// routes/adminAuthRoutes.js
import express from "express";
import {
    adminLogin,
    adminRefreshToken,
} from "../controllers/adminAuthController.js";

const router = express.Router();

// POST /api/admin/login
router.post("/login", adminLogin);

// POST /api/admin/refresh-token
router.post("/refresh-token", adminRefreshToken);

export default router;
