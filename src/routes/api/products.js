const express = require('express');
const router = express.Router();
const products = require('../../controllers/api/products.js')

router.get('/', products.list)


module.exports = router;