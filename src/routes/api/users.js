const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');

const users = require('../../controllers/api/users')

router.get('/', users.list )
router.get('/product/:id/fav', authMiddleware, users.addUserFav)


module.exports = router;