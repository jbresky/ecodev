const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');

const fav = require('../../controllers/api/fav')

router.get('/product/:id/fav', authMiddleware, fav.addUserFav)


module.exports = router;