const express = require('express');
const controller = require('../controllers/ajax.controller');

const router = express.Router();

router.get('/getcategory', controller.getcategory);

module.exports = router;
