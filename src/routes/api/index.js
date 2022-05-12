const express = require('express');
const router = express.Router();

const products = require('./products')
const users = require('./users')
const totals = require('./totals')

router.use('/product', products);
router.use('/user', users);
router.use('/total', totals)

module.exports = router;