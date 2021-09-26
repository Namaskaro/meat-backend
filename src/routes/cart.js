const router = require('express-promise-router')();

const cart = require('../controllers/cart.controller');

router.post('/:id', cart.addItemToCart);
router.get('/:id', cart.getCart);
router.delete('/empty-cart', cart.emptyCart);
router.delete('/:id', cart.deleteItem);
router.put('/:userId', cart.removeItem);

module.exports = router;
