let express = require('express');
let router = express.Router();

const productsController = require('../controllers/productsControllers');

router.get('/cart', productsController.carrito)
router.get('/detail', productsController.detail)

router.get('/create', productsController.create)
router.post('/', productsController.store)

router.get('/:id', productsController.detail)
router.get('/:id/edit', productsController.edit)

router.put('/:id', productsController.change)
router.delete('/:id', productsController.delete)

module.exports = router;