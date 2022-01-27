let express = require('express');
let router = express.Router();

const usersController = require('../controllers/usersControllers');

router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.get('/my-products', usersController.administracion);


module.exports = router;