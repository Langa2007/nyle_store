// routes/customerOrders.js
import express from 'express';
import { createOrder, listOrders, getOrder } from '../controllers/ordersController.js';
const router = express.Router();

router.post('/', createOrder);
router.get('/', listOrders); // ?user_id=
router.get('/:id', getOrder);

export default router;
