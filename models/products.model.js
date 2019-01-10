const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
  product_name: String,
  product_id: String,
  product_price: String,
  producer: String,
  quantity: Number
})
const Products = mongoose.model("Products", productSchema, "Products")
module.exports = Products
