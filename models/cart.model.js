const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  quantity: Number,
  proId: String,
  proPrice: Number,
});
const Cart = mongoose.model('Cart', cartSchema, 'Cart');
module.exports = Cart;
