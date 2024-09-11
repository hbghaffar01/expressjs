import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getUserData } from '../controllers/userController.js';

const router = express.Router();

// Protected route
router.get('/user', authMiddleware, getUserData);

export default router;
