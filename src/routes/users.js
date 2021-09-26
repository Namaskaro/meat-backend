const router = require('express-promise-router')();

const user = require('../controllers/user.controller');

router.route('/:id').get(user.getUser);
router.route('/').post(user.createUser);

module.exports = router;
