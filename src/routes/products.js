let express = require('express');
let router = express.Router();

const productsController = require('../controllers/productsControllers');

router.get('/cart', productsController.carrito)

router.get('/create', productsController.create)
router.post('/', productsController.store)


module.exports = router;