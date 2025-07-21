import express from 'express';
import { getCart, getProfile, updateProfile } from '../controllers/user.js';

const router = express.Router();

router.get('/profile/:userId', getProfile);
router.put('/profile/:userId', updateProfile);
router.get('/:userId/cart', getCart);

export default router;