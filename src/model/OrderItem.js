const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OrderItem = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('orderitem', OrderItem);
