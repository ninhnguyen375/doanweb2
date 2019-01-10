const express = require('express')
const controller = require('../controllers/cart.controller')
const router = express.Router()

router.get('/', controller.index)
router.get('/removeCart/:id', controller.removeCart)

module.exports = router