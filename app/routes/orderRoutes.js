import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createOrder, getOrders, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/orders', authMiddleware, createOrder);
router.get('/orders/list', authMiddleware, getOrders);
// Route to update an order
router.put('/orders/:id', authMiddleware, updateOrder);
// Route to delete
router.delete('/orders/delete/:id', authMiddleware, deleteOrder);

export default router;
