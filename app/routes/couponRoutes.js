import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getUserCoupons } from '../controllers/couponController.js';

const router = express.Router();

router.get('/coupons', authMiddleware, getUserCoupons);

export default router;
