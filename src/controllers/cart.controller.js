const cartRepository = require('./cart.repository');
const productRepository = require('./product.repository');
const Cart = require('../model/Cart');

exports.addItemToCart = async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  console.log(userId);
  try {
    // let cart = await cartRepository.cart();
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
    });
    const productDetails = await productRepository.productById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: 'Not Found',
        msg: 'Invalid request',
      });
    }
    // --If Cart Exists ----
    if (cart) {
      // ---- check if index exists ----
      const indexFound = cart.items.findIndex(
        item => item.productId.id === productId,
      );
      // ------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
      if (indexFound !== -1 && quantity <= 0) {
        cart.items.splice(indexFound, 1);
        if (cart.items.length === 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal = cart.items
            .map(item => item.total)
            .reduce((acc, next) => acc + next);
        }
      }
      // ----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
      else if (indexFound !== -1) {
        cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price;
        cart.subTotal = cart.items
          .map(item => item.total)
          .reduce((acc, next) => acc + next);
      }
      // ----Check if Quantity is Greater than 0 then add item to items Array ----
      else if (quantity > 0) {
        cart.items.push({
          productId,
          quantity,
          price: productDetails.price,
          image: productDetails.imageUrl,
          title: productDetails.title,
          total: parseInt(productDetails.price * quantity),
        });
        cart.subTotal = cart.items
          .map(item => item.total)
          .reduce((acc, next) => acc + next);
      }
      // ----if quantity of price is 0 throw the error -------
      else {
        return res.status(400).json({
          type: 'Invalid',
          msg: 'Invalid request',
        });
      }
      const data = await cart.save();
      res.status(200).json({
        type: 'success',
        mgs: 'Process Successful',
        data,
      });
    }
    // ------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
    else {
      const cart = await Cart.create({
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
      const data = await cart.save();
      return res.status(201).send(data);
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

module.exports.removeItem = async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
    });
    const productDetails = await productRepository.productById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: 'Not Found',
        msg: 'Invalid request',
      });
    }
    // --If Cart Exists ----
    if (cart) {
      // ---- check if index exists ----
      const indexFound = cart.items.findIndex(
        item => item.productId.id == productId,
      );
      // ------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
      if (indexFound !== -1 && quantity <= 0) {
        cart.items.splice(indexFound, 1);
        if (cart.items.length == 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal = cart.items
            .map(item => item.total)
            .reduce((acc, next) => acc + next);
        }
      }
      // ----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
      else if (indexFound !== -1) {
        cart.items[indexFound].quantity = cart.items[indexFound].quantity - quantity;
        cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price;
        cart.subTotal = cart.items
          .map(item => item.total)
          .reduce((acc, next) => acc + next);
      }
      // ----if quantity of price is 0 throw the error -------
      else {
        return res.status(400).json({
          type: 'Invalid',
          msg: 'Invalid request',
        });
      }
      const data = await cart.save();
      res.status(200).json({
        type: 'success',
        mgs: 'Process Successful',
        data,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

module.exports.deleteItem = async (req, res) => {
  const userId = req.body;
  const productId = req.body;
  try {
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
    });
    console.log(cart);
    const itemIndex = cart.items.findIndex(p => p.productId == productId);
    if (itemIndex > -1) {
      const productItem = cart.items[itemIndex];
      cart.subTotal -= productItem.quantity * productItem.price;
      cart.items.splice(itemIndex, 1);
    }
    const newCart = await cart.save();
    return res.status(201).send(newCart);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};
