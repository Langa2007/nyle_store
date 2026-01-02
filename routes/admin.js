// routes/admin.js
import express from "express";
import { verifyAdmin } from "../middleware/adminAuth.js";
import {
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/adminController.js";

const router = express.Router();

//  Get all users (admin only)
router.get("/users", verifyAdmin, getAllUsers);

//  Get user by ID (admin only)
router.get("/users/:id", verifyAdmin, getUserById);

//  Delete user (admin only)
router.delete("/users/:id", verifyAdmin, deleteUser);

export default router;
