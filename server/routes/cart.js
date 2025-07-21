import express from 'express';
import { addToCart, clearCart, removeFromCart } from '../controllers/cart.js';

const router = express.Router();

router.post('/:userId/:productId', addToCart);
router.delete('/:userId/:productId', removeFromCart);
router.delete('/:userId/clear', clearCart);

export default router;