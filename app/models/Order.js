import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productNumber: {
    type: Number,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export { Order };
