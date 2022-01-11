let express = require('express');
let router = express.Router();

const productsController = require('../controllers/productsControllers');

router.get('/cart', productsController.carrito)

module.exports = router;