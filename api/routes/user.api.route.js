const express = require('express');
const controller = require('../controllers/user.api.controller');

const router = express.Router();

router.get('/', controller.index);
router.post('/signin', controller.postSignIn);
router.get('/email', controller.getEmail);

router.get('/checkAdmin/:id', controller.checkAdmin);

router.delete('/:id', controller.deleteUser);
// router.post('/', controller.addUser);
router.put('/:id', controller.editUser);

module.exports = router;
