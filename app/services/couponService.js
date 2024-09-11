import { Coupon } from "../models/Coupon.js";

export const generateCoupon = async (userId, orderId, discount) => {
  try {
    const code = `Dis${discount}`;

    const validUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const newCoupon = new Coupon({
      code,
      discount,
      userId,
      orderId,
      validUntil,
    });

    await newCoupon.save();

    console.log(`Coupon generated: ${code} with ${discount}% discount`);
  } catch (error) {
    console.error("Error generating coupon:", error);
  }
};
