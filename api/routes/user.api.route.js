const express = require('express');
const controller = require('../controllers/user.api.controller');

const router = express.Router();

router.get('/', controller.index);
router.get('/email', controller.getEmail);

module.exports = router;
