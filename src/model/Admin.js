const { model, Schema } = require('mongoose');

const schema = new Schema({
  login: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    default: '',
  },
});

module.exports = model('Admin', schema);
