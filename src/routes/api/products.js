const express = require('express');
const router = express.Router();
const products = require('../../controllers/api/products.js');
const authMiddleware = require('../../middlewares/authMiddleware.js');

// router.get('/', products.list)
router.get('/', authMiddleware, products.shoppingCart)

router.get('/cart/:id', authMiddleware, products.cart)
router.get('/cartDelete/:productId', products.cartDelete);



module.exports = router;