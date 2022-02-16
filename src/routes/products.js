let express = require('express');
let {check} = require('express-validator');
let router = express.Router();

const productsController = require('../controllers/productsControllers');

router.get('/', productsController.list)
router.get('/cart', productsController.shoppingCart)

router.get('/create', productsController.createForm)
router.post('/', productsController.storeProduct)

router.get('/:id', productsController.detail)
router.get('/:id/edit', productsController.edit)

router.put('/:id', productsController.change)
router.delete('/:id', productsController.delete)

module.exports = router;