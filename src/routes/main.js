let express = require('express');
let router = express.Router();

const mainController = require('../controllers/mainControllers');

router.get('/', mainController.index)
router.get('/about', mainController.about)
router.get('/environment', mainController.eco)

module.exports = router;