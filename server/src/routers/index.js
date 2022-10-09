const router = require('express').Router();
const produk = require('./produk');
const user = require('./user');
const auth = require('./auth');

router.use('/produk', produk);
router.use('/user', user);
router.use('/auth', auth);

module.exports = router;
