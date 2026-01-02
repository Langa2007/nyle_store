// routes/orders.js
import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
  getAllOrdersWithUserAndProducts,
} from "../controllers/orderController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

//  Create an order
router.post("/", createOrder);

//  Get all orders
router.get("/", getAllOrders);

//  Get all orders with details (admin only)
router.get("/details", verifyAdmin, getAllOrdersWithUserAndProducts);

// Get orders by user ID
router.get("/user/:id", getOrdersByUserId);

//  Update order status (admin only)
router.put("/:id/status", verifyAdmin, updateOrderStatus);

export default router;
