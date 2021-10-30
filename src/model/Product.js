const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    default: '',
  },
  composition: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: '',
  },
  priceFor: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
  },
  category: {
    type: ObjectId,
    ref: 'Category',
  },
});

module.exports = model('Product', schema);
