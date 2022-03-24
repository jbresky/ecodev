const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const path = require('path'); 

const productsController = require('../controllers/productsControllers');
// const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

//router.get('/', productsController.list)
router.get('/', productsController.products)
router.get('/cart', productsController.shoppingCart)

router.get('/create', authMiddleware, productsController.createForm)
// router.post('/create', productsController.storeProduct)

router.get('/detail/:id', productsController.detail)
router.get('/edit/:id', productsController.edit)
// router.post('/edit/:id', productsController.saveEdit)

// router.put('/:id', productsController.change)
router.delete('/:id', productsController.delete)

module.exports = router;