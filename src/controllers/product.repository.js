const Product = require('../model');
exports.products = async () => {
  const products = await Product.Product.find();
  return products;
};
exports.productById = async id => {
  const product = await Product.Product.findById(id);
  return product;
};
exports.createProduct = async payload => {
  const newProduct = await Product.Product.create(payload);
  return newProduct;
};
exports.removeProduct = async _id => {
  const product = await Product.Product.findByIdAndRemove(_id);
  return product;
};
