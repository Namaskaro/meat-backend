const mongoose = require('mongoose');
const Item = require('./Item');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    userId: {
      type: String,
    },
    items: [
      {
        productId: {
          type: String,
          ref: 'item',
        },
        title: String,
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity can not be less then 1.'],
          deafult: 1,
        },
        price: Number,
        image: String,
        total: Number,
      },
    ],

    subTotal: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
