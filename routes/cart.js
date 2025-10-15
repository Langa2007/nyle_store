// routes/cart.js
import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  syncCart
} from '../controllers/cartController.js';

const router = express.Router();

router.get('/', getCart); // ?user_id=... or ?session_id=...
router.post('/items', addToCart);
router.put('/items/:id', updateCartItem);
router.delete('/items/:id', removeCartItem);
router.post('/sync', syncCart);

export default router;
