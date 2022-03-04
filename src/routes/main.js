let express = require('express');
let router = express.Router();

const mainController = require('../controllers/mainControllers');

router.get('/', mainController.index)


module.exports = router;