let express = require('express');
let router = express.Router();

const usersController = require('../controllers/usersControllers');

router.get('/login', usersController.login)
router.get('/my-products', usersController.administracion)
router.get('/creation', usersController.creation)

module.exports = router;