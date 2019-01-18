const express = require('express');
const controller = require('../controllers/cart.controller');

const router = express.Router();

router.get('/:id', controller.index);
router.get('/removeCart/:id', controller.removeCart);
router.post('/addBill', controller.addBill);

module.exports = router;
