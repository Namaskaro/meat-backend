const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const schema = new Schema({
  h1: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  introtext: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: '',
  },
  url: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
  },
});

module.exports = model('Product', schema);
