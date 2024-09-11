import { Order } from "../models/Order.js";
import { generateCoupon } from "../services/couponService.js";

export const createOrder = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productImage,
      productNumber,
      uniqueId,
      color,
      size,
      productPrice
    } = req.body;

    if (
      !productName ||
      !productDescription ||
      !productImage ||
      !productNumber ||
      !uniqueId ||
      !productPrice
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newOrder = new Order({
      productName,
      productPrice,
      productDescription,
      productImage,
      productNumber,
      uniqueId,
      color,
      size,
      userId: req.user.id,
    });

    const savedOrder = await newOrder.save();

    setTimeout(() => {
      generateCoupon(req.user.id, savedOrder._id, 10); // 10% discount coupon
    }, 5 * 60 * 1000);

    setTimeout(() => {
      generateCoupon(req.user.id, savedOrder._id, 20); // 20% discount coupon
    }, 10 * 60 * 1000);

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error details:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });

    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.json(orders);
  } catch (error) {
    console.error("Error details:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productName,
      productDescription,
      productImage,
      productNumber,
      uniqueId,
      color,
      size,
    } = req.body;

    const order = await Order.findOne({ _id: id, userId: req.user.id });

    if (!order) {
      return res.status(404).json({
        message: "Order not found or you do not have permission to update it",
      });
    }

    order.productName = productName || order.productName;
    order.productPrice = productPrice || order.productPrice;
    order.productDescription = productDescription || order.productDescription;
    order.productImage = productImage || order.productImage;
    order.productNumber = productNumber || order.productNumber;
    order.uniqueId = uniqueId || order.uniqueId;
    order.color = color || order.color;
    order.size = size || order.size;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error details:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found or you do not have permission to delete it",
      });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error details:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
