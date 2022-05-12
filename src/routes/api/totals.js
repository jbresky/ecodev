const express = require('express');
const router = express.Router();
const totals = require('../../controllers/api/totals')

router.get('/', totals.list)

module.exports = router