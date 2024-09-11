import Cart from "../models/Cart.js";
import { Order } from "../models/Order.js";

export const addToCart = async (req, res) => {
  const { orderId, quantity } = req.body;
  const userId = req.user.id;

  if (!orderId || !quantity) {
    return res
      .status(400)
      .json({ message: "Order ID and quantity are required" });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.orderId.toString() === orderId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ orderId, quantity });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.orderId");

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteFromCart = async (req, res) => {
  const { orderId } = req.body;
  const userId = req.user.id;

  if (!orderId) {
    return res.status(400).json({ message: "Order ID is required" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.orderId.toString() === orderId
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json({ message: "Item removed from cart", cart });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error deleting from cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
