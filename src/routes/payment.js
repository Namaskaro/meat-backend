const router = require('express-promise-router')();

const { payment } = require('../controllers');

router.route('/').post(payment.createPayment);

module.exports = router;
