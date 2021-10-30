const { Order } = require('../model');
const {
  createUserConfirmationOrderEmail,
  createAdminConfirmationOrderEmail,
} = require('./mail.controller');

const createPayment = async (
  {
    body: { fullname, address, phone, amount, products, paymentType, comment },
  },
  res,
) => {
  try {
    const prepareOrder = {
      fullname,
      address,
      phone,
      paymentType,
      comment,
      products,
      amount,
    };

    const newOrder = await new Order(prepareOrder);
    const saveOrder = await newOrder.save();
    createAdminConfirmationOrderEmail(saveOrder);

    return res.status(200).send({
      saveOrder,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const payWithCard = async ({ body: { data } }, res) => {
  try {
    const {
      metadata: { orderId },
    } = data.object;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    await Order.findByIdAndUpdate(orderId, { status: 'Paid' });
    createUserConfirmationOrderEmail(order);
    createAdminConfirmationOrderEmail(order);
    return res.status(200).send('success');
  } catch (err) {
    console.log(err, 'ERROR');
    res.status(500).send(err);
  }
};

module.exports = {
  createPayment,
  payWithCard,
};
