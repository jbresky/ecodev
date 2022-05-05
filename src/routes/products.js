const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const path = require('path'); 

const productsController = require('../controllers/productsController');
// const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

//router.get('/', productsController.list)
router.get('/', productsController.products)
router.get('/personal-care', productsController.personalCare)
router.get('/health-&-beauty', productsController.healthBeauty)
router.get('/natural-medicine', productsController.naturalMedicine)
router.get('/eco-products', productsController.ecoProducts)
router.get('/deco', productsController.deco)
router.get('/cart', authMiddleware, productsController.shoppingCart)

router.get('/create', authMiddleware, productsController.createForm)
// router.post('/create', productsController.storeProduct)

router.get('/detail/:id', productsController.detail)
router.get('/edit/:id', productsController.edit)
// router.post('/edit/:id', productsController.saveEdit)

// router.put('/:id', productsController.change)
router.delete('/:id', productsController.delete)
router.get('/search', productsController.search)

router.get('/addToCart/:productId', authMiddleware, productsController.addProductToCart);
router.delete('/cartDeleteProduct/:productId', authMiddleware, productsController.cartDeleteProduct);


module.exports = router;