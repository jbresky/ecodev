const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const path = require('path'); 

const productsController = require('../controllers/productsControllers');
const guestMiddleware = require('../middlewares/guestMiddleware')

//router.get('/', productsController.list)
router.get('/', productsController.products)
router.get('/cart', productsController.shoppingCart)

router.get('/create', guestMiddleware, productsController.createForm)
router.post('/', productsController.storeProduct)

router.get('/detail/:id', productsController.detail)
router.get('/:id/edit', productsController.edit)

router.put('/:id', productsController.change)
router.delete('/:id', productsController.delete)

module.exports = router;