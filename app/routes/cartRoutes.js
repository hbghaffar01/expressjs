import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addToCart, getCart, deleteFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add-to-cart", authMiddleware, addToCart);

router.get("/get/cart", authMiddleware, getCart);

router.delete('/delete-from-cart', authMiddleware, deleteFromCart);

export default router;
