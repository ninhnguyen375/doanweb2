const express = require('express');
const controller = require('../controllers/product.api.controller');

const router = express.Router();

router.get('/', controller.index);

module.exports = router;
