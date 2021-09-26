const { model, Schema } = require('mongoose');

const schema = new Schema({
  userAccessKey: {
    type: String,
    default: '',
    unique: true,
  },
});

module.exports = model('User', schema);
