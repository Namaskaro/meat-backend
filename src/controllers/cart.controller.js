const cartRepository = require('./cart.repository');
const productRepository = require('./product.repository');
const Cart = require('../model/Cart');
// const Item = require('../model/Item');

module.exports.addItemToCart = async (req, res) => {
  const { userId } = req.body;
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
    let cart = await Cart.findOne({ userId });
    // let item = await Item.findOne({ _id: productId });

    const productDetails = await productRepository.productById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: 'Not Found',
        msg: 'Invalid request',
      });
    }
    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex(p => p.productId == productId);

      // Check if product exists or not
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity =
          cart.items[itemIndex].quantity + quantity;
        cart.items[itemIndex].total =
          cart.items[itemIndex].quantity * productDetails.price;
        cart.items[itemIndex].price = productDetails.price;
        cart.subTotal = cart.items
          .map(item => item.total)
          .reduce((acc, next) => acc + next);
      } else {
        cart.items.push({
          productId,
          title: productDetails.title,
          quantity,
          price: productDetails.price,
          image: productDetails.imageUrl,
          total: parseInt(productDetails.price * quantity),
        });
        cart.subTotal = cart.items
          .map(item => item.total)
          .reduce((acc, next) => acc + next);
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        items: [
          {
            productId,
            quantity,
            total: parseInt(productDetails.price * quantity),
            price: productDetails.price,
            title: productDetails.title,
            image: productDetails.imageUrl,
          },
        ],
        subTotal: parseInt(productDetails.price * quantity),
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.query;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: 'Invalid',
      msg: 'Something Went Wrong',
      err,
    });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const cart = await cartRepository.cart();
    cart.items = [];
    cart.subTotal = 0;
    const data = await cart.save();
    res.status(200).json({
      type: 'success',
      mgs: 'Cart Has been emptied',
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: 'Invalid',
      msg: 'Something Went Wrong',
      err,
    });
  }
};

module.exports.updateQuantity = async (req, res) => {
  const { userId } = req.body;
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
    let cart = await Cart.findOne({ userId });
    // let item = await Item.findOne({ _id: productId });

    const productDetails = await productRepository.productById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: 'Not Found',
        msg: 'Invalid request',
      });
    }
    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex(p => p.productId == productId);

      // Check if product exists or not
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].total =
          cart.items[itemIndex].quantity * productDetails.price;
        cart.items[itemIndex].price = productDetails.price;
        cart.subTotal = cart.items
          .map(item => item.total)
          .reduce((acc, next) => acc + next);
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

module.exports.minusQuantity = async (req, res) => {
  const { userId } = req.body;
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
    let cart = await Cart.findOne({ userId });
    // let item = await Item.findOne({ _id: productId });

    const productDetails = await productRepository.productById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: 'Not Found',
        msg: 'Invalid request',
      });
    }
    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex(p => p.productId == productId);

      // Check if product exists or not
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity =
          cart.items[itemIndex].quantity - quantity;
        cart.items[itemIndex].total =
          cart.items[itemIndex].quantity * productDetails.price;
        cart.items[itemIndex].price = productDetails.price;
        cart.subTotal = cart.items
          .map(item => item.total)
          .reduce((acc, next) => acc + next);
      }
      cart = await cart.save();
      return res.status(200).send(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

module.exports.deleteItem = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  console.log(userId, productId);
  try {
    let cart = await Cart.findOneAndUpdate({ userId });
    let itemIndex = cart.items.findIndex(p => p.productId === productId);
    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      console.log(productItem);
      cart.subTotal -= productItem.quantity * productItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(200).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};
