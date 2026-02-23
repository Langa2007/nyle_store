// routes/cart.js
import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  syncCart
} from '../controllers/cartController.js';
import { cartMutationLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

router.get('/', getCart); // ?user_id=... or ?session_id=...
router.post('/items', cartMutationLimiter, addToCart);
router.put('/items/:id', cartMutationLimiter, updateCartItem);
router.delete('/items/:id', cartMutationLimiter, removeCartItem);
router.post('/sync', cartMutationLimiter, syncCart);

export default router;
