const productRepository = require('./product.repository');

exports.createProduct = async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      amount: req.body.amount,
      imageUrl: req.body.imageUrl,
    };
    const product = await productRepository.createProduct({
      ...payload,
    });
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await productRepository.products();
    res.status(200).json({
      status: true,
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const productDetails = await productRepository.productById(id);
    res.status(200).json({
      status: true,
      data: productDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};
exports.removeProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productDetails = await productRepository.removeProduct(id);
    res.status(200).json({
      status: true,
      data: productDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};
