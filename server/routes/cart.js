import express from 'express';
import { addToCart, clearCart, getCart, removeFromCart } from '../controllers/cart.js';

const router = express.Router();

router.post('/:userId/products/:productId', addToCart);
router.delete('/:userId/products/:productId', removeFromCart);
router.get('/:userId/cart', getCart);
router.delete('/:userId/clear', clearCart);

export default router;