// routes/customerOrders.js
import express from 'express';
import { createOrder, listOrders, getOrder } from '../controllers/ordersController.js';
import { orderCreationLimiter } from "../middleware/rateLimit.js";
const router = express.Router();

router.post('/', orderCreationLimiter, createOrder);
router.get('/', listOrders); // ?user_id=
router.get('/:id', getOrder);

export default router;
