const mongoose = require('mongoose');

const billShema = new mongoose.Schema({
  authId: String,
  createAt: String,
  totalPrice: Number,
  status: String,
  details: {
    proId: [String],
    proPrice: [Number],
    proQuantity: [Number],
  },
});
const Bills = mongoose.model('Bills', billShema, 'Bills');
module.exports = Bills;
