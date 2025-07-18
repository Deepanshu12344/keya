import express from 'express';
import { getProfile, updateProfile } from '../controllers/user.js';

const router = express.Router();

router.get('/profile/:userId', getProfile);
router.put('/profile/:userId', updateProfile);

export default router;