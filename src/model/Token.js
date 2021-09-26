const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const schema = new Schema({
  token: {
    type: String,
    default: '',
  },
  admin: {
    type: ObjectId,
    ref: 'Admin',
  },
});

module.exports = model('Token', schema);
