const router = require('express-promise-router')();

const { product } = require('../controllers');

router.route('/:id').get(product.getProductById);
router.route('/').post(product.createProduct);
router.route('/').get(product.getProducts);
router.route('/:id').delete(product.removeProduct);

module.exports = router;
