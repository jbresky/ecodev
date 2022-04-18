const express = require('express');
const router = express.Router();

const products = require('./products')
const users = require('./users')

router.use('/product', products);
router.use('/user', users);

module.exports = router;