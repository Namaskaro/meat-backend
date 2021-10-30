const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const OrderItem = require('./OrderItem');

const schema = new Schema({
  address: {
    type: String,
    default: '',
  },
  fullname: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    default: '',
    required: false,
  },
  paymentType: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'Pending',
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
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
      total: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = model('Order', schema);
