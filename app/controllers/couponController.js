import { Coupon } from '../models/Coupon.js';

export const getUserCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({
      isUsed: false,
      validUntil: { $gte: new Date() }
    });

    res.json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error.message);
    res.status(500).json({ message: 'Error fetching coupons', error: error.message });
  }
};
