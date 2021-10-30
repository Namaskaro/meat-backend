const genericCrud = require('./generic.controller');
const { Order } = require('../model');

module.exports = {
  ...genericCrud(Order),
};

exports.createOrder = async (
  { body: { fullname, address, phone, email, products } },
  req,
  res,
) => {
  try {
    const products = req.body.products;
    const order = await new Order({
      body: { fullname, address, phone, email, products },
    });
    const newOrder = await order.save();

    createAdminConfirmationOrderEmail(newOrder);

    return res.status(200).send({
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      type: 'Invalid',
      msg: 'Something Went Wrong',
      error,
    });
  }
};
