const express = require('express');
const controller = require('../controllers/admin.controller');

const router = express.Router();

router.get('/dashboard', controller.index);
router.get('/bill', controller.bill);
router.get('/category', controller.category);
router.get('/product', controller.product);
router.get('/user', controller.user);

router.post('/product/delete', controller.deleteProduct);
router.post('/product/deleteManyProduct', controller.deleteManyProduct);
router.post('/product/edit', controller.editProduct);
router.post('/product/add', controller.addProduct);

router.post('/user/delete', controller.deleteUser);
router.post('/user/deleteManyUser', controller.deleteManyUser);
router.post('/user/edit', controller.editUser);
router.post('/user/add', controller.addUser);

router.post('/category/delete', controller.deleteProducer);
router.post('/category/deleteManyCategory', controller.deleteManyCategory);
router.post('/category/edit', controller.editProducer);
router.post('/category/add', controller.addProducer);

router.post('/bill/delete', controller.deleteBill);
router.post('/bill/deleteManyBill', controller.deleteManyBill);
router.post('/bill/edit', controller.editBill);
router.post('/bill/add', controller.addBill);
module.exports = router;
