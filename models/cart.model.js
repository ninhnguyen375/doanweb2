const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
  quantity: Number,
  proId: String
})
const Cart = mongoose.model("Cart", cartSchema, "Cart")
module.exports = Cart
